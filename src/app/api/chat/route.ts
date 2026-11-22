import { assistantSystemPrompt, retrieveKnowledge, type ChatAction } from "@/lib/ai/knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
type PageContext = { pathname: string; pageTitle: string; pageType: string };
const MAX_BODY_BYTES = 8_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1_200;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const navigationLabels: Record<string, string> = {
  "/programs": "Explore Programs", "/campus": "View Campus", "/student-life": "Explore Student Life",
  "/about": "About Dhanik Bharat", "/admissions": "Go to Admissions",
};
const requestCounts = new Map<string, { count: number; resetsAt: number }>();

type StreamDiagnostics = {
  status?: number;
  responseReceived?: boolean;
  choiceFrames?: number;
  contentChunks?: number;
  toolCallChunks?: number;
  malformedFrames?: number;
  unrecognizedFrames?: number;
  doneMarker?: boolean;
  actionParseErrors?: number;
  retryStatus?: number;
  retryResponseReceived?: boolean;
  retryChoiceFrames?: number;
  retryContentChunks?: number;
  retryMalformedFrames?: number;
  retryFinishReason?: string;
  retryProviderErrorCode?: string;
  reasoningChunks?: number;
  finishReason?: string;
  providerErrorFrames?: number;
  providerErrorCode?: string;
};

function isRateLimited(key: string) {
  const now = Date.now();
  if (requestCounts.size > 1_000) for (const [storedKey, value] of requestCounts) if (value.resetsAt <= now) requestCounts.delete(storedKey);
  const current = requestCounts.get(key);
  if (!current || current.resetsAt <= now) {
    if (requestCounts.size >= 2_000) {
      const oldestKey = requestCounts.keys().next().value;
      if (oldestKey) requestCounts.delete(oldestKey);
    }
    requestCounts.set(key, { count: 1, resetsAt: now + RATE_WINDOW_MS });
    return false;
  }
  return ++current.count > RATE_LIMIT;
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validatePayload(value: unknown): { messages: ChatMessage[]; context: PageContext } | null {
  if (!record(value) || !Array.isArray(value.messages) || !value.messages.length || value.messages.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const item of value.messages) {
    if (!record(item) || (item.role !== "user" && item.role !== "assistant") || typeof item.content !== "string" || item.content.length > MAX_MESSAGE_CHARS) return null;
    // Never forward a valid Indian mobile number from chat history to Groq.
    const safeContent = item.content.trim().replace(/(?<!\d)(?:\+?91[\s().-]?)?[6-9](?:[\s().-]?\d){9}(?!\d)/g, "[mobile number withheld]");
    messages.push({ role: item.role, content: safeContent });
  }
  if (!messages.some((message) => message.role === "user" && message.content)) return null;
  const pages: Record<string, { pageTitle: string; pageType: string }> = {
    "/": { pageTitle: "Home", pageType: "home" }, "/programs": { pageTitle: "Programs", pageType: "programs" },
    "/campus": { pageTitle: "Campus", pageType: "campus" }, "/student-life": { pageTitle: "Student Life", pageType: "student-life" },
    "/about": { pageTitle: "About", pageType: "about" }, "/admissions": { pageTitle: "Admissions", pageType: "admissions" },
  };
  const requestedPath = record(value.context) ? value.context.pathname : null;
  const pathname = typeof requestedPath === "string" && pages[requestedPath] ? requestedPath : "/";
  return { messages, context: { pathname, ...pages[pathname] } };
}

const encode = (value: unknown) => new TextEncoder().encode(`${JSON.stringify(value)}\n`);

export async function GET() {
  return Response.json({
    provider: "groq",
    groqConfigured: Boolean(process.env.GROQ_API_KEY),
    modelConfigured: true,
  });
}

function chatCompletionsUrl(baseUrl: string) {
  const base = baseUrl.replace(/\/+$/, "");
  return base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
}

function validateModelActions(value: unknown): ChatAction[] {
  if (!record(value) || !Array.isArray(value.actions)) return [];
  const targets: Record<string, ChatAction> = {
    programs: { type: "navigate", label: "Explore Programs", href: "/programs" },
    campus: { type: "navigate", label: "View Campus", href: "/campus" },
    student_life: { type: "navigate", label: "Explore Student Life", href: "/student-life" },
    admissions: { type: "navigate", label: "Go to Admissions", href: "/admissions" },
    mpc: { type: "program_select", label: "Explore MPC", href: "/programs" },
    bipc: { type: "program_select", label: "Explore BiPC", href: "/programs" },
    comparison: { type: "comparison", label: "Compare pathways" },
    admission_start: { type: "admission_start", label: "Review admissions steps", href: "/admissions" },
    enquiry_start: { type: "enquiry_start", label: "Start an enquiry", href: "/admissions#enquiry" },
    lead_offer: { type: "lead_offer", label: "Talk to Admissions" },
  };
  const actions: ChatAction[] = [];
  for (const candidate of value.actions) {
    if (!record(candidate) || typeof candidate.type !== "string" || typeof candidate.target !== "string") continue;
    const action = targets[candidate.target];
    if (!action || action.type !== candidate.type) continue;
    actions.push(action);
    if (actions.length === 3) break;
  }
  return actions;
}

async function* streamGroq(messages: ChatMessage[], context: PageContext, signal: AbortSignal, onActions: (actions: ChatAction[]) => void, onDiagnostic: (diagnostic: StreamDiagnostics) => void, allowActions = true) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Groq API key is not configured");
  const model = process.env.AI_MODEL?.trim() || "openai/gpt-oss-120b";
  if (process.env.NODE_ENV === "development") {
    console.info("[DHANIX] Provider: Groq");
    console.info(`[DHANIX] Model: ${model}`);
  }
  const endpoint = chatCompletionsUrl(process.env.AI_BASE_URL || "https://api.groq.com/openai/v1");
  const knowledgeContext = retrieveKnowledge(messages, context.pathname).map((entry) => `${entry.title} (${entry.path}): ${entry.content}`).join("\n\n");
  if (process.env.NODE_ENV === "development") console.info("[DHANIX] Request sent: yes");
  const response = await fetch(endpoint, {
    method: "POST",
    signal,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model, stream: true, temperature: 0.4, max_completion_tokens: allowActions ? 360 : 900,
      ...(allowActions ? {
        tools: [{ type: "function", function: { name: "suggest_actions", description: "Suggest at most three validated site actions, only when they would help the user take a relevant next step. Use lead_offer when the student has genuine admission or contact intent and has chosen to explore talking with admissions.", parameters: { type: "object", properties: { actions: { type: "array", maxItems: 3, items: { type: "object", properties: { type: { type: "string", enum: ["navigate", "program_select", "comparison", "admission_start", "enquiry_start", "lead_offer"] }, target: { type: "string", enum: ["programs", "campus", "student_life", "admissions", "mpc", "bipc", "comparison", "admission_start", "enquiry_start", "lead_offer"] } }, required: ["type", "target"], additionalProperties: false } } }, required: ["actions"], additionalProperties: false } } }],
        tool_choice: "auto",
      } : {}),
      messages: [
        { role: "system", content: `${assistantSystemPrompt}\n\nRetrieved verified Dhanik Bharat facts (context only; write a response to the user's actual question):\n${knowledgeContext || "No verified page information was found for this question."}\n\nCurrent page context (may clarify references, but is not evidence):\nPage: ${context.pageTitle}\nPath: ${context.pathname}` },
        ...messages.slice(-10),
      ],
    }),
  });
  onDiagnostic({ status: response.status, responseReceived: true });
  if (process.env.NODE_ENV === "development") {
    console.info(`[DHANIX] Status: ${response.status}`);
    console.info("[DHANIX] Response received: yes");
  }
  if (!response.ok || !response.body) throw new Error(`Groq HTTP ${response.status}`);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const toolArguments = new Map<number, string>();
  let choiceFrames = 0;
  let contentChunks = 0;
  let toolCallChunks = 0;
  let malformedFrames = 0;
  let unrecognizedFrames = 0;
  let reasoningChunks = 0;
  let finishReason = "none";
  let providerErrorFrames = 0;
  let providerErrorCode = "";
  let doneMarker = false;
  let actionParseErrors = 0;
  const parseLine = (line: string) => {
    const data = line.trim().replace(/^data:\s*/, "");
    if (!data) return null;
    if (data === "[DONE]") { doneMarker = true; return null; }
    let parsed: unknown;
    try { parsed = JSON.parse(data); } catch { malformedFrames += 1; return null; }
    if (!record(parsed)) { unrecognizedFrames += 1; return null; }
    if ("error" in parsed) {
      providerErrorFrames += 1;
      if (record(parsed.error)) {
        const code = typeof parsed.error.code === "string" ? parsed.error.code : typeof parsed.error.type === "string" ? parsed.error.type : "";
        if (/^[A-Za-z0-9_-]{1,48}$/.test(code)) providerErrorCode = code;
      }
      return null;
    }
    if (!Array.isArray(parsed.choices) || !record(parsed.choices[0])) { unrecognizedFrames += 1; return null; }
    const choice = parsed.choices[0];
    if (typeof choice.finish_reason === "string") {
      const allowedFinishReasons = ["stop", "length", "tool_calls", "content_filter", "function_call"];
      finishReason = allowedFinishReasons.includes(choice.finish_reason) ? choice.finish_reason : "other";
    }
    if (!record(choice.delta)) { unrecognizedFrames += 1; return null; }
    choiceFrames += 1;
    const delta = choice.delta;
    if (typeof delta.reasoning === "string" && delta.reasoning) reasoningChunks += 1;
    if (typeof delta.content === "string" && delta.content) { contentChunks += 1; return delta.content; }
    if (Array.isArray(delta.tool_calls)) for (const call of delta.tool_calls) {
      if (!record(call) || typeof call.index !== "number" || !record(call.function) || typeof call.function.arguments !== "string") continue;
      toolCallChunks += 1;
      toolArguments.set(call.index, (toolArguments.get(call.index) || "") + call.function.arguments);
    }
    return null;
  };
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const content = parseLine(line);
        if (content) yield content;
      }
      if (done) {
        if (buffer.trim()) {
          const content = parseLine(buffer);
          if (content) yield content;
          buffer = "";
        }
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }
  const suggested: ChatAction[] = [];
  for (const args of toolArguments.values()) {
    try { suggested.push(...validateModelActions(JSON.parse(args))); } catch { actionParseErrors += 1; }
  }
  onActions(suggested.slice(0, 3));
  onDiagnostic({ choiceFrames, contentChunks, toolCallChunks, malformedFrames, unrecognizedFrames, reasoningChunks, finishReason, providerErrorFrames, ...(providerErrorCode ? { providerErrorCode } : {}), doneMarker, actionParseErrors });
  if (process.env.NODE_ENV === "development") console.info(`[DHANIX] Stream parsed: choices=${choiceFrames}, content_chunks=${contentChunks}, reasoning_chunks=${reasoningChunks}, tool_call_chunks=${toolCallChunks}, finish=${finishReason}, provider_error_frames=${providerErrorFrames}, provider_error_code=${providerErrorCode || "none"}, malformed_frames=${malformedFrames}, unrecognized_frames=${unrecognizedFrames}, action_parse_errors=${actionParseErrors}, done=${doneMarker}`);
}

async function* streamLocal(text: string) {
  const chunks = text.match(/.{1,24}(?:\s|$)/g) || [text];
  for (const chunk of chunks) { yield chunk; await new Promise((resolve) => setTimeout(resolve, 12)); }
}

function isAdmissionIntent(value: string) {
  const latest = value.toLowerCase();
  return /\b(call me|call cheyyandi|contact me|contact us|i am interested|i'm interested|interested in admission|interested in joining|want to join|i want to join|how can i join|want admission|admission for my (son|daughter|child)|admission details|apply for admission|admission ki ela apply|counsel(?:ling|ing)|join avvali|admission kavali|details kavali|details pampinchandi|neet join avvali|jee ki admission|jee admission kavali|maku admission kavali|maku details kavali|naku details kavali|fees (?:details )?kavali|fees entha|medicine side interest|engineering side interest)\b/i.test(latest)
    || /\b(?:maku|naku)\b.{0,48}\b(?:admission|join)\b.{0,24}\b(?:kavali|avvali)\b/i.test(latest)
    || (/\binterested\b/i.test(latest) && /\b(mpc|bipc|jee|neet|program|admission|course|medicine|engineering)\b/i.test(latest));
}

function localGroundedFallback(messages: ChatMessage[]) {
  const latest = [...messages].reverse().find((message) => message.role === "user")?.content.toLowerCase() || "";
  const tinglish = /[\u0c00-\u0c7f]|\b(kavali|avvali|undha|undi|enti|cheppandi|cheyyandi|maku|naku|mee|em|lo|chesa|pampinchandi|avunu|sare|bro)\b/i.test(latest);
  const actions: ChatAction[] = isAdmissionIntent(latest) ? [{ type: "lead_offer", label: "Talk to Admissions" }] : [];

  if (/\b(hi|hello|hey|hii)\b/i.test(latest)) {
    return { text: tinglish ? "Hey! I'm DHANIX. MPC, BiPC, campus, leda admissions gurinchi adagochu." : "Hey! I'm DHANIX. Looking for information about MPC, BiPC or admissions? I've got you covered!", actions };
  }
  if (isAdmissionIntent(latest)) {
    return { text: tinglish ? "Sure! NEET preparation BiPC pathway lo untundi. Admissions team tho matladalante Talk to Admissions select cheyyandi." : "Sure. I can help with the admissions conversation. Select Talk to Admissions if you would like to continue.", actions };
  }
  if (/\b(course|courses|program|programs|stream|streams|subjects)\b/i.test(latest)) {
    return { text: tinglish
      ? "Mainly MPC and BiPC programs unnayi. MPC tho JEE preparation; BITSAT and Olympiads kuda mention chesaru. BiPC lo NEET preparation focus untundi."
      : "The main pathways are MPC with JEE preparation and BiPC with NEET preparation. The site also mentions BITSAT and Olympiads with MPC.", actions };
  }
  if (/\b(hostel|accommodation|dorm)\b/i.test(latest)) {
    return { text: tinglish ? "Hostel availability gurinchi verified information ledu. Dhanik Bharat admissions team daggara confirm cheskondi." : "Hostel availability is not confirmed in the information I have. Dhanik Bharat admissions can confirm it.", actions };
  }
  if (/\b(fee|fees|cost)\b/i.test(latest)) {
    return { text: tinglish ? "Current fees details naaku verified information lo levu; admissions team daggara confirm cheskondi." : "I do not have verified current fee details. Admissions can confirm the latest amount.", actions };
  }
  if (/\b(osmosis|photosynthesis|gravity|mitosis)\b/i.test(latest)) {
    return { text: "Osmosis is the movement of water through a selectively permeable membrane toward the side with more dissolved particles.", actions };
  }
  if (/\b(jee|bitsat)\b/i.test(latest)) {
    return { text: tinglish ? "JEE Main and BITSAT separate entrance exams. MPC pathway lo JEE preparation untundi; website BITSAT ni kuda mention chestundi. Exact ga edhi compare cheyyali?" : "JEE Main and BITSAT are separate entrance exams. Dhanik Bharat's verified MPC information mentions JEE preparation and BITSAT. What would you like to compare?", actions };
  }
  return { text: tinglish ? "Sorry, ippudu live assistant respond avvatledu. Konchem sepu tarvata malli try cheyyandi." : "Sorry, I am having trouble answering right now. Please try again in a moment.", actions };
}

function providerFailureReason(error: unknown, diagnostic: StreamDiagnostics) {
  if (typeof diagnostic.status === "number" && (diagnostic.status < 200 || diagnostic.status >= 300)) return `HTTP ${diagnostic.status}`;
  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) return "request timed out";
  if (error instanceof Error && record((error as Error & { cause?: unknown }).cause)) {
    const code = (error as Error & { cause: Record<string, unknown> }).cause.code;
    if (typeof code === "string" && /^[A-Z0-9_]{2,48}$/.test(code)) return `network error ${code}`;
  }
  return diagnostic.responseReceived ? "response stream failed" : "network request failed before response";
}
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Too many messages. Please try again shortly." }, { status: 429 });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return Response.json({ error: "Message is too long." }, { status: 413 });
  let body: string;
  try { body = await request.text(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return Response.json({ error: "Message is too long." }, { status: 413 });
  let parsed: unknown;
  try { parsed = JSON.parse(body); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const payload = validatePayload(parsed);
  if (!payload) return Response.json({ error: "Please send a valid chat message." }, { status: 400 });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let providerWorked = false;
      let providerText = "";
      let providerFailed = false;
      let providerActions: ChatAction[] = [];
      const diagnostic: StreamDiagnostics = {};
      let activeDiagnostic = diagnostic;
      let fallbackReason = "";
      try {
        if (process.env.GROQ_API_KEY) {
          try {
            for await (const chunk of streamGroq(
              payload.messages,
              payload.context,
              AbortSignal.timeout(20_000),
              (actions) => { if (actions.length) providerActions = actions; },
              (details) => Object.assign(diagnostic, details),
            )) {
              providerWorked = true;
              providerText += chunk;
              controller.enqueue(encode({ type: "text", text: chunk }));
            }
            if (!providerText.trim() && diagnostic.responseReceived && (diagnostic.toolCallChunks ?? 0) > 0) {
              if (process.env.NODE_ENV === "development") console.info("[DHANIX] Tool-only response: retrying once for conversational text");
              const retryDiagnostic: StreamDiagnostics = {};
              activeDiagnostic = retryDiagnostic;
              for await (const chunk of streamGroq(
                payload.messages,
                payload.context,
                AbortSignal.timeout(20_000),
                (actions) => { if (actions.length) providerActions = actions; },
                (details) => Object.assign(retryDiagnostic, details),
                false,
              )) {
                providerWorked = true;
                providerText += chunk;
                controller.enqueue(encode({ type: "text", text: chunk }));
              }
              Object.assign(diagnostic, {
                retryStatus: retryDiagnostic.status,
                retryResponseReceived: retryDiagnostic.responseReceived,
                retryChoiceFrames: retryDiagnostic.choiceFrames,
                retryContentChunks: retryDiagnostic.contentChunks,
                retryMalformedFrames: retryDiagnostic.malformedFrames,
                retryFinishReason: retryDiagnostic.finishReason,
                retryProviderErrorCode: retryDiagnostic.providerErrorCode,
              });
              activeDiagnostic = diagnostic;
            }
          } catch (error) {
            providerFailed = true;
            fallbackReason = providerFailureReason(error, activeDiagnostic);
            if (process.env.NODE_ENV === "development" && !activeDiagnostic.responseReceived) {
              console.info("[DHANIX] Status: unavailable");
              console.info("[DHANIX] Response received: no");
            }
          }
        } else {
          fallbackReason = "GROQ_API_KEY is not configured";
          if (process.env.NODE_ENV === "development") {
            console.info("[DHANIX] Provider: local");
            console.info("[DHANIX] Model: not requested");
            console.info("[DHANIX] Request sent: no");
            console.info("[DHANIX] Response received: no");
          }
        }
        if (!providerWorked || !providerText.trim() || providerFailed) {
          if (!fallbackReason) {
            const providerStreamError = diagnostic.retryProviderErrorCode || diagnostic.providerErrorCode;
            const finish = diagnostic.retryFinishReason || diagnostic.finishReason;
            fallbackReason = providerStreamError
              ? `provider stream error (${providerStreamError})`
              : finish === "length"
                ? "provider completion token limit reached without assistant text"
                : diagnostic.choiceFrames
                  ? `no assistant text (choice_frames=${diagnostic.choiceFrames}, tool_call_chunks=${diagnostic.toolCallChunks ?? 0}, retry_content_chunks=${diagnostic.retryContentChunks ?? 0}, retry_finish=${diagnostic.retryFinishReason ?? "not-run"})`
                  : `no assistant text (choice_frames=0, malformed_frames=${diagnostic.malformedFrames ?? 0}, unrecognized_frames=${diagnostic.unrecognizedFrames ?? 0})`;
          }
          const fallback = localGroundedFallback(payload.messages);
          const fallbackText = providerText.trim() ? `\n\n${fallback.text}` : fallback.text;
          for await (const chunk of streamLocal(fallbackText)) controller.enqueue(encode({ type: "text", text: chunk }));
          if (!providerActions.length) providerActions = fallback.actions;
          if (process.env.NODE_ENV === "development") console.info(`[DHANIX] Fallback reason: ${fallbackReason}`);
        }
        const recentContext = payload.messages.slice(-5).map((message) => message.content).join(" ").toLowerCase();
        const recentUserMessages = payload.messages.filter((message) => message.role === "user").slice(-5);
        const recentUserContext = recentUserMessages.map((message) => message.content).join(" ").toLowerCase();
        const latestUserMessage = recentUserMessages.at(-1)?.content.toLowerCase() || "";
        const declinedLeadOffer = /^(no|nope|not now|cancel|ledu|vaddu|vaddhu)[!. ]*$/i.test(latestUserMessage);
        const leadIntent = isAdmissionIntent(latestUserMessage);
        if (leadIntent && !declinedLeadOffer && !providerActions.some((action) => action.type === "lead_offer")) {
          providerActions = providerActions.filter((action) => action.href !== "/admissions");
          providerActions.push({ type: "lead_offer", label: "Talk to Admissions" });
        }
        const asksForCurrentInstitutionDetail = /fee|fees|cost|hostel|accommodation|result|ranking|rank|admission date|deadline/.test(recentUserContext);
        const isInstitutionalContext = payload.context.pathname !== "/" || /dhanik|mpc|bipc|jee|neet|program|pathway|admissions/.test(recentContext);
        if (!providerActions.length && asksForCurrentInstitutionDetail && isInstitutionalContext) {
          providerActions = [{ type: "navigate", label: navigationLabels["/admissions"], href: "/admissions" }];
        }
        controller.enqueue(encode({ type: "actions", actions: providerActions }));
        controller.close();
      } catch {
        try {
          controller.enqueue(encode({ type: "text", text: "I’m having trouble responding right now. Please try again in a moment." }));
          controller.enqueue(encode({ type: "actions", actions: [] }));
          controller.close();
        } catch { controller.error(new Error("Chat stream closed")); }
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Content-Type-Options": "nosniff" } });
}
