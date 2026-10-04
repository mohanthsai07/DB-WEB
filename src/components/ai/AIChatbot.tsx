"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import type { AssistantAction, ChatMessageData, PageContext } from "./assistant-types";
import { createLeadDraft, isTinglishConversation } from "@/lib/leads/client";
import { normalizeIndianMobile } from "@/lib/leads/phone";

const START_LEAD_CAPTURE = "__DB_ASSISTANT_START_LEAD__";
const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

const PAGE_INFO: Record<string, Omit<PageContext, "pathname">> = {
  "/": { pageTitle: "Home", pageType: "home" },
  "/programs": { pageTitle: "Programs", pageType: "programs" },
  "/campus": { pageTitle: "Campus & learning environment", pageType: "campus" },
  "/student-life": { pageTitle: "Student Life", pageType: "student-life" },
  "/about": { pageTitle: "About Dhanik Bharat", pageType: "about" },
  "/admissions": { pageTitle: "Admissions", pageType: "admissions" },
};

const DEFAULT_PROMPTS = ["Compare MPC + JEE and BiPC + NEET", "How do admissions work?", "What is student life like?", "Tell me about the campus"];
const PAGE_PROMPTS: Record<string, string[]> = {
  "/programs": ["Compare MPC + JEE and BiPC + NEET", "Help me choose a pathway", "What does MPC include?", "What does BiPC include?"],
  "/campus": ["Tell me about the learning environment", "What is student life like?", "How do admissions work?", "Explore the programs"],
  "/student-life": ["What is a typical student experience like?", "Tell me about the campus", "Explore the programs", "How do admissions work?"],
  "/about": ["Tell me about Dhanik Bharat", "Explore the programs", "How do admissions work?", "Tell me about campus life"],
  "/admissions": ["What are the admissions steps?", "Compare the two pathways", "Go to the enquiry form", "Help me choose a program"],
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isAction(value: unknown): value is AssistantAction {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function errorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string") return payload.error;
  return fallback;
}

function affirmative(value: string) {
  return /^(yes|yeah|yep|sure|okay|ok|y|avunu|sare|haa|ha|cheyyandi|kavali)[!. ]*$/i.test(value.trim());
}

function negative(value: string) {
  return /^(no|nope|not now|cancel|n|ledu|vaddu|vaddhu)[!. ]*$/i.test(value.trim());
}

function validName(value: string) {
  return value.trim().length >= 2 && value.trim().length <= 80 && /^\p{L}[\p{L}\p{M} .'-]*$/u.test(value.trim());
}

export default function AIChatbot() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const hydrated = useSyncExternalStore(subscribeToHydration, getClientHydrationSnapshot, getServerHydrationSnapshot);
  const [minimized, setMinimized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [leadStep, setLeadStep] = useState<"idle" | "name" | "phone" | "consent">("idle");
  const [leadDraft, setLeadDraft] = useState<ReturnType<typeof createLeadDraft> | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const conversationIdRef = useRef("");
  const context = useMemo<PageContext>(() => ({ pathname, ...(PAGE_INFO[pathname] ?? { pageTitle: "Dhanik Bharat", pageType: "other" }) }), [pathname]);
  const prompts = PAGE_PROMPTS[pathname] ?? DEFAULT_PROMPTS;
  const inputTestId = leadStep === "name" ? "lead-name-input"
    : leadStep === "phone" ? "lead-phone-input"
      : leadStep === "consent" ? "lead-consent" : "chat-input";

  const appendAssistant = useCallback((content: string, actions?: AssistantAction[]) => {
    setMessages((current) => [...current, { id: makeId(), role: "assistant", content, ...(actions?.length ? { actions } : {}) }]);
  }, []);

  const startLeadCapture = useCallback(async () => {
    if (leadStep !== "idle") return;
    setBusy(true);
    try {
      const response = await fetch("/api/leads", { cache: "no-store" });
      const config: unknown = await response.json().catch(() => null);
      const configured = Boolean(config && typeof config === "object" && "whatsappConfigured" in config && config.whatsappConfigured === true);
      if (!response.ok || !configured) {
        appendAssistant(isTinglishConversation(messages)
          ? "WhatsApp enquiry link inka configure cheyyaledu. Admissions page lo next steps chudandi."
          : "The WhatsApp enquiry link isn’t configured yet. You can review the Admissions page for next steps.",
        [{ type: "navigate", label: "Go to Admissions", href: "/admissions" }]);
        return;
      }
      if (!conversationIdRef.current) conversationIdRef.current = makeId();
      const draft = createLeadDraft(messages, context, conversationIdRef.current);
      setLeadDraft(draft);
      setLeadStep("name");
      appendAssistant(isTinglishConversation(messages) ? "Sure! Mee name cheppandi?" : "Sure. What name should I use for the enquiry?");
    } catch {
      appendAssistant(isTinglishConversation(messages)
        ? "Ippudu enquiry flow open cheyyalekapoyanu. Konchem sepu tarvata try cheyyandi."
        : "I couldn’t open the enquiry flow just now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }, [appendAssistant, context, leadStep, messages]);

  const handleLeadReply = useCallback(async (value: string) => {
    const text = value.trim();
    const userMessage: ChatMessageData = { id: makeId(), role: "user", content: text };
    setMessages((current) => [...current, userMessage]);
    const tinglish = isTinglishConversation([...messages, userMessage]);

    if (negative(text)) {
      setLeadStep("idle");
      setLeadDraft(null);
      appendAssistant(tinglish ? "Parledhu! Inka edaina help kavali ante adugandi." : "No problem. Let me know if you need anything else.");
      return;
    }

    if (leadStep === "name") {
      if (!validName(text)) {
        appendAssistant(tinglish ? "Mee name konchem check chesi malli cheppandi." : "Please enter a name using letters, and I’ll continue.");
        return;
      }
      setLeadDraft((current) => current ? { ...current, name: text } : current);
      setLeadStep("phone");
      appendAssistant(tinglish ? `Thanks ${text}! Mee mobile number share cheyyandi.` : `Thanks, ${text}. Please share your Indian mobile number.`);
      return;
    }

    if (leadStep === "phone") {
      const phone = normalizeIndianMobile(text);
      if (!phone) {
        appendAssistant(tinglish ? "Number konchem check chesi malli send cheyyandi 👍" : "That number doesn’t look like a valid Indian mobile number. Please check it and try again.");
        return;
      }
      setLeadDraft((current) => current ? { ...current, phone } : current);
      setLeadStep("consent");
      appendAssistant(tinglish
        ? "Meeru WhatsApp lo send chesthe, ee number ni Dhanik Bharat admissions team mee enquiry kosam matrame use chestundi. Message ready cheyyala? (Yes/No)"
        : "If you choose to send it, the admissions team will use this number only to follow up about your enquiry. Shall I prepare the WhatsApp message? (Yes/No)");
      return;
    }

    if (leadStep === "consent") {
      if (!affirmative(text)) {
        appendAssistant(tinglish ? "WhatsApp message prepare cheyyala? Yes leda No ani cheppandi." : "Would you like me to prepare the WhatsApp message? Please reply yes or no.");
        return;
      }
      if (!leadDraft?.name || !leadDraft.phone) {
        setLeadStep("idle");
        setLeadDraft(null);
        appendAssistant(tinglish ? "Enquiry details malli start cheddam. Admissions ni contact cheyyandi." : "Let’s restart the enquiry details. You can also visit the Admissions page.", [{ type: "navigate", label: "Go to Admissions", href: "/admissions" }]);
        return;
      }

      setBusy(true);
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...leadDraft, name: leadDraft.name, phone: leadDraft.phone, consent: true }),
        });
        const result: unknown = await response.json().catch(() => null);
        if (!response.ok || !result || typeof result !== "object" || !("whatsappUrl" in result) || typeof result.whatsappUrl !== "string") {
          const notConfigured = Boolean(result && typeof result === "object" && "error" in result && result.error === "whatsapp_not_configured");
          setLeadStep("idle");
          setLeadDraft(null);
          appendAssistant(notConfigured
            ? (tinglish ? "WhatsApp enquiry link inka configure cheyyaledu. Admissions page lo next steps chudandi." : "The WhatsApp enquiry link isn’t configured yet. You can review the Admissions page for next steps.")
            : (tinglish ? "Enquiry message prepare cheyyalekapoyanu. Konchem sepu tarvata try cheyyandi." : "I couldn’t prepare the enquiry message just now. Please try again shortly."),
          [{ type: "navigate", label: "Go to Admissions", href: "/admissions" }]);
          return;
        }

        setLeadStep("idle");
        setLeadDraft(null);
        const action: AssistantAction = { type: "whatsapp_link", label: "Send on WhatsApp", href: result.whatsappUrl };
        appendAssistant(tinglish
          ? `Thanks ${leadDraft.name}! Mee enquiry details ready. WhatsApp lo message pre-filled ga open avuthundi; akkada Send press cheyyandi.`
          : `Thanks, ${leadDraft.name}. Your enquiry draft is ready. WhatsApp will open with the message filled in; press Send there.`, [action]);
      } catch {
        setLeadStep("idle");
        setLeadDraft(null);
        appendAssistant(tinglish ? "Enquiry message prepare cheyyalekapoyanu. Konchem sepu tarvata try cheyyandi." : "I couldn’t prepare the enquiry message just now. Please try again shortly.");
      } finally {
        setBusy(false);
      }
    }
  }, [appendAssistant, leadDraft, leadStep, messages]);

  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus();
    }
  }, [open, minimized]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        setMinimized(false);
        window.setTimeout(() => launcherRef.current?.focus(), 0);
        return;
      }
      if (event.key === "Tab" && open && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter((element) => element.offsetWidth > 0 || element.offsetHeight > 0);
        if (!focusable.length) {
          event.preventDefault();
          panelRef.current.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const close = useCallback(() => {
    setOpen(false);
    setMinimized(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  const startNewConversation = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setLeadDraft(null);
    setLeadStep("idle");
    conversationIdRef.current = makeId();
    setBusy(false);
    setError("");
    setMinimized(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const text = content.trim();
    if (!text || busy) return;
    if (text === START_LEAD_CAPTURE) {
      await startLeadCapture();
      return;
    }
    const lastMessage = messages[messages.length - 1];
    const admissionsOfferPending = lastMessage?.role === "assistant"
      && lastMessage.actions?.some((action) => action.type === "lead_offer");
    if (leadStep === "idle" && admissionsOfferPending && affirmative(text)) {
      setMessages((current) => [...current, { id: makeId(), role: "user", content: text }]);
      await startLeadCapture();
      return;
    }
    if (leadStep !== "idle") {
      await handleLeadReply(text);
      return;
    }
    if (!conversationIdRef.current) conversationIdRef.current = makeId();
    setError("");
    const userMessage: ChatMessageData = { id: makeId(), role: "user", content: text };
    const assistantMessage: ChatMessageData = { id: makeId(), role: "assistant", content: "" };
    const conversation = [...messages, userMessage];
    setMessages([...conversation, assistantMessage]);
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/x-ndjson" },
        body: JSON.stringify({
          messages: conversation.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
          context,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let payload: unknown;
        try { payload = await response.json(); } catch { payload = null; }
        throw new Error(errorMessage(payload, response.status === 429 ? "There are a lot of questions right now. Please try again shortly." : "I couldn’t answer just now. Please try again."));
      }
      if (!response.body) throw new Error("The assistant response stream was unavailable. Please try again.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      const applyLine = (line: string) => {
        const raw = line.trim();
        if (!raw) return;
        const record = JSON.parse(raw) as { type?: string; text?: string; actions?: unknown; rows?: unknown; description?: unknown };
        if (record.type === "text" && typeof record.text === "string") {
          setMessages((current) => current.map((item) => item.id === assistantMessage.id ? { ...item, content: item.content + record.text } : item));
        } else if (record.type === "actions" && Array.isArray(record.actions)) {
          const actions = record.actions.filter(isAction);
          setMessages((current) => current.map((item) => item.id === assistantMessage.id ? { ...item, actions: [...(item.actions ?? []), ...actions] } : item));
        } else if (record.type === "comparison" && Array.isArray(record.rows)) {
          const comparison: AssistantAction = {
            type: "comparison",
            rows: record.rows.filter((row) => row && typeof row === "object" && !Array.isArray(row)),
            ...(typeof record.description === "string" ? { description: record.description } : {}),
          };
          setMessages((current) => current.map((item) => item.id === assistantMessage.id ? { ...item, actions: [...(item.actions ?? []), comparison] } : item));
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        pending += decoder.decode(value, { stream: !done });
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        for (const line of lines) applyLine(line);
        if (done) break;
      }
      if (pending.trim()) applyLine(pending);
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      const message = caught instanceof Error ? caught.message : "Something went wrong. Please try again.";
      setMessages((current) => current.filter((item) => item.id !== assistantMessage.id));
      setError(message);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setBusy(false);
      }
    }
  }, [busy, context, handleLeadReply, leadStep, messages, startLeadCapture]);

  return <div className="fixed bottom-4 right-4 z-[130] isolate sm:bottom-6 sm:right-6" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
    {open && <ChatWindow messages={messages} prompts={prompts} busy={busy} error={error} minimized={minimized} onMinimize={() => setMinimized((value) => !value)} onClose={close} onNewConversation={startNewConversation} onSubmit={sendMessage} onAction={sendMessage} inputRef={inputRef} panelRef={panelRef} messagesRef={messagesRef} inputTestId={inputTestId} />}
    {!open && <ChatButton open={false} disabled={!hydrated} onClick={() => { setOpen(true); setMinimized(false); }} buttonRef={launcherRef} />}
  </div>;
}
