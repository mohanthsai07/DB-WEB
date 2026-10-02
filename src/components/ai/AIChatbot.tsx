"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import type { AssistantAction, ChatMessageData, PageContext } from "./assistant-types";

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

export default function AIChatbot() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const context = useMemo<PageContext>(() => ({ pathname, ...(PAGE_INFO[pathname] ?? { pageTitle: "Dhanik Bharat", pageType: "other" }) }), [pathname]);
  const prompts = PAGE_PROMPTS[pathname] ?? DEFAULT_PROMPTS;

  useEffect(() => {
    if (open && !minimized) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
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
    setBusy(false);
    setError("");
    setMinimized(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const text = content.trim();
    if (!text || busy) return;
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
  }, [busy, context, messages]);

  return <div className="fixed bottom-4 right-4 z-[130] isolate sm:bottom-6 sm:right-6" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
    {open && <ChatWindow messages={messages} prompts={prompts} busy={busy} error={error} minimized={minimized} onMinimize={() => setMinimized((value) => !value)} onClose={close} onNewConversation={startNewConversation} onSubmit={sendMessage} onAction={sendMessage} inputRef={inputRef} panelRef={panelRef} messagesRef={messagesRef} />}
    {!open && <ChatButton open={false} onClick={() => { setOpen(true); setMinimized(false); }} buttonRef={launcherRef} />}
  </div>;
}
