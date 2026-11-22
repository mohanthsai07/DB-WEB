"use client";

import { useEffect, type RefObject } from "react";
import { ArrowUpRight, Menu, Minus, Plus, RotateCcw, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import AssistantAvatar from "./AssistantAvatar";
import type { ChatMessageData } from "./assistant-types";

type ChatWindowProps = {
  messages: ChatMessageData[];
  prompts: string[];
  busy: boolean;
  error: string;
  minimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onNewConversation: () => void;
  onSubmit: (message: string) => void;
  onAction: (value: string) => void;
  onRetry: () => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  messagesRef: RefObject<HTMLDivElement | null>;
  inputTestId: string;
};

export default function ChatWindow({ messages, busy, error, minimized, onMinimize, onClose, onNewConversation, onSubmit, onAction, onRetry, inputRef, panelRef, messagesRef, inputTestId }: ChatWindowProps) {
  const isFresh = messages.length === 0;

  useEffect(() => {
    const transcript = messagesRef.current;
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [messages, busy, messagesRef]);

  return <section id="db-assistant-panel" data-testid="chat-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="db-assistant-title" aria-describedby="db-assistant-subtitle" className={`absolute bottom-0 right-0 flex h-[660px] w-[430px] flex-col overflow-hidden rounded-[22px] border border-[#e7e7e7] bg-white shadow-[0_20px_60px_rgba(18,59,42,.18)] transition duration-200 origin-bottom-right motion-reduce:transition-none max-[640px]:fixed max-[640px]:inset-0 max-[640px]:h-[100dvh] max-[640px]:w-full max-[640px]:rounded-none ${minimized ? "h-[64px] max-[640px]:h-[64px]" : ""}`}>
    <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#ececec] bg-white px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <button type="button" aria-label="Open assistant menu" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#777777] hover:bg-[#f5f5f2] focus-visible:outline-2 focus-visible:outline-[#285c43]"><Menu size={17} aria-hidden="true" /></button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/logo1.png" alt="Dhanik Bharat" className="h-8 w-8 object-contain" />
        <div className="min-w-0"><h2 id="db-assistant-title" className="text-[14px] font-semibold tracking-[-.02em] text-[#171717]">DHANIX</h2><p id="db-assistant-subtitle" className="mt-0.5 text-[10px] text-[#777777]">by Dhanik Bharat</p></div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <button type="button" onClick={onNewConversation} aria-label="Start a new conversation" title="New conversation" className="grid h-8 w-8 place-items-center rounded-full text-[#777777] hover:bg-[#f5f5f2] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#285c43]"><RotateCcw size={14} aria-hidden="true" /></button>
        <button type="button" onClick={onMinimize} aria-label={minimized ? "Restore assistant" : "Minimize assistant"} title={minimized ? "Restore" : "Minimize"} className="grid h-8 w-8 place-items-center rounded-full text-[#777777] hover:bg-[#f5f5f2] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#285c43]">{minimized ? <Plus size={15} aria-hidden="true" /> : <Minus size={15} aria-hidden="true" />}</button>
        <button type="button" onClick={onClose} aria-label="Close assistant" title="Close" className="grid h-8 w-8 place-items-center rounded-full text-[#777777] hover:bg-[#f5f5f2] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#285c43]"><X size={15} aria-hidden="true" /></button>
      </div>
    </div>

    {!minimized && <>
      <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation">
        {isFresh ? <div className="flex min-h-full flex-col justify-center pb-3">
          <h3 className="text-[26px] font-semibold leading-[1.08] tracking-[-.035em] text-[#171717]">Hey! Welcome to <span className="text-[#123b2a]">DHANIX</span> 👋</h3>
          <p className="mt-2 text-[13px] font-semibold leading-5 text-[#285c43]">Your Smart Learning Companion.</p>
          <div className="mt-6 max-w-[300px] rounded-[16px] rounded-bl-[4px] bg-[#123b2a] px-4 py-3 text-[13px] font-medium leading-5 text-white">What would you like to know today?</div>
          <div className="mt-3 flex items-start gap-2.5">
            <AssistantAvatar className="mt-1" />
            <div className="max-w-[300px] rounded-[16px] rounded-tl-[4px] bg-[#f8f4ef] px-4 py-3 text-[13px] leading-[1.55] text-[#4b4b48]">I&apos;m here to help you explore courses, admissions, campuses and everything about Dhanik Bharat.</div>
          </div>
          <div className="mt-5 space-y-2.5">
            <button type="button" onClick={() => onSubmit("Explore MPC & JEE")} disabled={busy} className="flex min-h-12 w-full items-center justify-between rounded-[12px] border border-[#e7e7e7] bg-white px-4 text-[13px] font-semibold text-[#171717] transition hover:border-[#285c43] hover:bg-[#fafbf8] focus-visible:outline-2 focus-visible:outline-[#285c43] disabled:opacity-50">Explore MPC &amp; JEE<ArrowUpRight size={16} className="text-[#285c43]" aria-hidden="true" /></button>
            <button type="button" onClick={() => onSubmit("Explore BiPC & NEET")} disabled={busy} className="flex min-h-12 w-full items-center justify-between rounded-[12px] border border-[#e7e7e7] bg-white px-4 text-[13px] font-semibold text-[#171717] transition hover:border-[#285c43] hover:bg-[#fafbf8] focus-visible:outline-2 focus-visible:outline-[#285c43] disabled:opacity-50">Explore BiPC &amp; NEET<ArrowUpRight size={16} className="text-[#285c43]" aria-hidden="true" /></button>
          </div>
        </div> : <div className="space-y-4">{messages.map((message) => <ChatMessage key={message.id} message={message} onAction={onAction} />)}{busy && <div className="flex items-center gap-2 pl-9 text-[11px] text-[#647069]" role="status"><span className="flex gap-1" aria-hidden="true"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] motion-reduce:animate-none" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] [animation-delay:150ms] motion-reduce:animate-none" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] [animation-delay:300ms] motion-reduce:animate-none" /></span>Typing…</div>}</div>}
      </div>
      {error && <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#f0d7d7] bg-[#fff7f5] px-4 py-2.5 text-[11px] leading-5 text-[#8a3528]" role="alert"><span>{error}</span><button type="button" onClick={onRetry} className="shrink-0 rounded-full border border-[#e6bdb5] px-2.5 py-1 font-semibold text-[#8a3528] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#285c43]">Retry</button></div>}
      <div className="shrink-0 border-t border-[#eee5da] bg-[linear-gradient(180deg,#fffaf5_0%,#fff5eb_55%,#fff_100%)] p-3 max-[640px]:pb-[calc(.75rem+env(safe-area-inset-bottom))]"><ChatInput onSubmit={onSubmit} busy={busy} inputRef={inputRef} inputTestId={inputTestId} /></div>
    </>}
  </section>;
}
