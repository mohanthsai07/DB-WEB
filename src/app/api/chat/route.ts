import { answerFromKnowledge, assistantSystemPrompt, retrieveKnowledge, type ChatAction } from "@/lib/ai/knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
type PageContext = { pathname: string; pageTitle: string; pageType: string };
const MAX_BODY_BYTES = 8_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1_200;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const allowedNavigationPaths = new Set([
  "/programs",
  "/campus",
  "/student-life",
  "/about",
  "/admissions",
]);
const canonicalNavigationLabels = new Map([
  ["/programs", "Explore Programs"],
  ["/campus", "View Campus"],
  ["/student-life", "Explore Student Life"],
  ["/about", "About Dhanik Bharat"],
  ["/admissions", "Go to Admissions"],
]);
const allowedPromptActions = new Map([
  ["Engineering|I’m interested in engineering.", true],
  ["Medicine|I’m interested in medicine.", true],
  ["Olympiads|Tell me about Olympiad preparation.", true],
  ["Not sure yet|I’m not sure which pathway yet.", true],
  ["Maths, Physics & Chemistry|I want to explore the MPC subjects.", true],
  ["Biology, Physics & Chemistry|I want to explore the BiPC subjects.", true],
  ["Compare both|Compare MPC and BiPC.", true],
  ["JEE Main|Tell me about JEE Main preparation in the MPC pathway.", true],
  ["JEE Advanced|Tell me about JEE Advanced preparation in the MPC pathway.", true],
  ["BITSAT|Tell me about BITSAT in the MPC pathway.", true],
  ["Olympiads|Tell me about Olympiads in the MPC pathway.", true],
  ["MPC · Engineering|I’m interested in MPC and engineering preparation.", true],
  ["BiPC · Medicine|I’m interested in BiPC and NEET preparation.", true],
  ["Not sure|I’m not sure which pathway yet.", true],
  ["Compare both pathways|Compare MPC and BiPC.", true],
]);
// Process-local abuse guard; multi-instance deployments should supply shared rate limiting at the edge.
const requestCounts = new Map<string, { count: number; resetsAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  if (requestCounts.size > 1_000) {
    for (const [storedKey, value] of requestCounts) if (value.resetsAt <= now) requestCounts.delete(storedKey);
  }
  const current = requestCounts.get(key);
  if (!current || current.resetsAt <= now) {
    if (requestCounts.size >= 2_000) {
      const oldestKey = requestCounts.keys().next().value;
      if (oldestKey) requestCounts.delete(oldestKey);
    }
    requestCounts.set(key, { count: 1, resetsAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validatePayload(value: unknown): { messages: ChatMessage[]; context: PageContext } | null {
  if (!record(value) || !Array.isArray(value.messages) || value.messages.length === 0 || value.messages.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const item of value.messages) {
    if (!record(item) || (item.role !== "user" && item.role !== "assistant") || typeof item.content !== "string" || item.content.length > MAX_MESSAGE_CHARS) return null;
    messages.push({ role: item.role, content: item.content.trim() });
  }
  if (!messages.some((message) => message.role === "user" && message.content)) return null;

  const candidate = record(value.context) ? value.context : {};
  const pages: Record<string, { pageTitle: string; pageType: string }> = {
    "/": { pageTitle: "Home", pageType: "home" },
    "/programs": { pageTitle: "Programs", pageType: "programs" },
    "/campus": { pageTitle: "Campus", pageType: "campus" },
    "/student-life": { pageTitle: "Student Life", pageType: "student-life" },
    "/about": { pageTitle: "About", pageType: "about" },
    "/admissions": { pageTitle: "Admissions", pageType: "admissions" },
  };
  const pathname = typeof candidate.pathname === "string" && pages[candidate.pathname] ? candidate.pathname : "/";
  return { messages, context: { pathname, ...pages[pathname] } };
}

const encode = (value: unknown) => new TextEncoder().encode(`${JSON.stringify(value)}\n`);

function chatCompletionsUrl(baseUrl: string) {
  const base = baseUrl.replace(/\/+$/, "");
  return base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
}

function validateActions(actions: unknown): ChatAction[] {
  if (!Array.isArray(actions)) return [];
  const valid: ChatAction[] = [];
  for (const candidate of actions) {
    if (!record(candidate) || typeof candidate.type !== "string" || typeof candidate.label !== "string") continue;
    if (candidate.type === "navigate" && typeof candidate.href === "string" && allowedNavigationPaths.has(candidate.href)) {
      valid.push({ type: "navigate", label: canonicalNavigationLabels.get(candidate.href)!, href: candidate.href });
      continue;
    }
    if (candidate.type === "enquiry_start" && candidate.href === "/admissions#enquiry") {
      valid.push({ type: "enquiry_start", label: "Start an enquiry", href: "/admissions#enquiry" });
      continue;
    }
    if (candidate.type === "prompt" && typeof candidate.value === "string" && allowedPromptActions.has(`${candidate.label}|${candidate.value}`)) {
      valid.push({ type: "prompt", label: candidate.label.slice(0, 60), value: candidate.value });
    }
  }
  return valid;
}

function validateModelActions(value: unknown): ChatAction[] {
  if (!record(value) || !Array.isArray(value.actions)) return [];
  const actions: ChatAction[] = [];
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
  };
  for (const candidate of value.actions) {
    if (!record(candidate) || typeof candidate.type !== "string" || typeof candidate.target !== "string") continue;
    const action = targets[candidate.target];
    if (!action || action.type !== candidate.type) continue;
    actions.push(action);
    if (actions.length === 3) break;
  }
  return actions;
}

async function* streamGroq(messages: ChatMessage[], context: PageContext, signal: AbortSignal, onActions: (actions: ChatAction[]) => void) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return;
  if (process.env.NODE_ENV === "development") console.info("[DB Assistant] Groq request started");
  const endpoint = chatCompletionsUrl(process.env.AI_BASE_URL || "https://api.groq.com/openai/v1");
  const knowledgeContext = retrieveKnowledge(messages, context.pathname).map((entry) => `${entry.title} (${entry.path}): ${entry.content}`).join("\n\n");
  const response = await fetch(endpoint, {
    method: "POST",
    signal,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "openai/gpt-oss-120b",
      stream: true,
      temperature: 0.2,
      max_completion_tokens: 280,
      tools: [{ type: "function", function: { name: "suggest_actions", description: "Suggest up to three relevant interface actions. Only suggest when useful.", parameters: { type: "object", properties: { actions: { type: "array", maxItems: 3, items: { type: "object", properties: { type: { type: "string", enum: ["navigate", "program_select", "comparison", "admission_start", "enquiry_start"] }, target: { type: "string", enum: ["programs", "campus", "student_life", "admissions", "mpc", "bipc", "comparison", "admission_start", "enquiry_start"] } }, required: ["type", "target"], additionalProperties: false } } }, required: ["actions"], additionalProperties: false } } }],
      tool_choice: "auto",
      messages: [
        { role: "system", content: `${assistantSystemPrompt}\n\nGrounding rules: Treat the retrieved text as the complete set of verified Dhanik Bharat facts. Do not infer or embellish institutional details. In particular, do not claim a timetable, teaching method, optional modules, program duration, college outcomes, eligibility, fee, rank, facility, or other specifics unless explicitly stated below. If absent, say that detail is not currently available. Do not use a table unless the user asks to compare. You may answer general education questions from general knowledge, clearly separated from Dhanik Bharat-specific facts. Keep replies concise.\n\nRetrieved verified website knowledge:\n${knowledgeContext || "No verified page information was found for this question."}\n\nCurrent page context:\nPage: ${context.pageTitle}\nPath: ${context.pathname}` },
        ...messages.slice(-8),
      ],
    }),
  });
  if (process.env.NODE_ENV === "development") console.info(`[DB Assistant] Groq HTTP status: ${response.status}`);
  if (!response.ok || !response.body) throw new Error("Provider unavailable");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const toolArguments = new Map<number, string>();
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const data = line.trim().replace(/^data:\s*/, "");
        if (!data || data === "[DONE]") continue;
        try {
          const parsed: unknown = JSON.parse(data);
          if (!record(parsed) || !Array.isArray(parsed.choices) || !record(parsed.choices[0]) || !record(parsed.choices[0].delta)) continue;
          const text = parsed.choices[0].delta.content;
          if (typeof text === "string" && text) yield text;
          const toolCalls = parsed.choices[0].delta.tool_calls;
          if (Array.isArray(toolCalls)) for (const call of toolCalls) {
            if (!record(call) || typeof call.index !== "number" || !record(call.function) || typeof call.function.arguments !== "string") continue;
            toolArguments.set(call.index, (toolArguments.get(call.index) || "") + call.function.arguments);
          }
        } catch {
          // Discard malformed provider frames.
        }
      }
      if (done) break;
    }
  } finally {
    reader.releaseLock();
  }
  const suggested: ChatAction[] = [];
  for (const args of toolArguments.values()) {
    try { suggested.push(...validateModelActions(JSON.parse(args))); } catch { /* Ignore malformed model action data. */ }
  }
  onActions(suggested.slice(0, 3));
  if (process.env.NODE_ENV === "development") console.info("[DB Assistant] Groq response received");
}

async function* streamLocal(text: string) {
  const chunks = text.match(/.{1,24}(?:\s|$)/g) || [text];
  for (const textChunk of chunks) {
    yield textChunk;
    await new Promise((resolve) => setTimeout(resolve, 12));
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Too many messages. Please try again shortly." }, { status: 429 });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return Response.json({ error: "Message is too long." }, { status: 413 });

  let body = "";
  try { body = await request.text(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return Response.json({ error: "Message is too long." }, { status: 413 });
  let parsed: unknown;
  try { parsed = JSON.parse(body); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const payload = validatePayload(parsed);
  if (!payload) return Response.json({ error: "Please send a valid chat message." }, { status: 400 });

  const latestQuestion = [...payload.messages].reverse().find((message) => message.role === "user")!.content;
  const localAnswer = answerFromKnowledge(latestQuestion);
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let providerWorked = false;
      let providerText = "";
      let providerFailed = false;
      let providerActions: ChatAction[] = [];
      try {
        if (process.env.GROQ_API_KEY) {
          try {
            for await (const chunk of streamGroq(payload.messages, payload.context, AbortSignal.timeout(15_000), (actions) => { providerActions = actions; })) {
              providerWorked = true;
              providerText += chunk;
              controller.enqueue(encode({ type: "text", text: chunk }));
            }
          } catch {
            if (process.env.NODE_ENV === "development") console.info("[DB Assistant] Groq stream failed; using local fallback when possible");
            // Use local knowledge when the provider fails before returning content.
            providerFailed = true;
          }
        }
        if (!providerWorked || !providerText.trim()) {
          for await (const chunk of streamLocal(localAnswer.text)) controller.enqueue(encode({ type: "text", text: chunk }));
        } else if (providerFailed) {
          controller.enqueue(encode({ type: "text", text: "\n\nThat response was interrupted. Please try again if you need more detail." }));
        }
        if (localAnswer.comparison && !providerActions.some((action) => action.type === "comparison")) controller.enqueue(encode({ type: "comparison", ...localAnswer.comparison }));
        controller.enqueue(encode({ type: "actions", actions: providerWorked && providerActions.length ? providerActions : validateActions(localAnswer.actions) }));
        controller.close();
      } catch {
        try {
          controller.enqueue(encode({ type: "text", text: "I’m having trouble responding right now. Please try again, or use the links below to explore the site." }));
          controller.enqueue(encode({ type: "actions", actions: validateActions(localAnswer.actions) }));
          controller.close();
        } catch {
          controller.error(new Error("Chat stream closed"));
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
