"use client";

import { useEffect, type RefObject } from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
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
  inputRef: RefObject<HTMLTextAreaElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  messagesRef: RefObject<HTMLDivElement | null>;
};

export default function ChatWindow({ messages, prompts, busy, error, minimized, onMinimize, onClose, onNewConversation, onSubmit, onAction, inputRef, panelRef, messagesRef }: ChatWindowProps) {
  const isFresh = messages.length === 0;

  useEffect(() => {
    const transcript = messagesRef.current;
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [messages, busy, messagesRef]);

  return <section id="db-assistant-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="db-assistant-title" aria-describedby="db-assistant-subtitle" className={`absolute bottom-0 right-0 flex w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border border-[#dce5dc] bg-[#f7f8f4] shadow-[0_22px_70px_rgba(18,59,42,.2)] transition duration-200 origin-bottom-right motion-reduce:transition-none max-[640px]:fixed max-[640px]:inset-x-2 max-[640px]:bottom-[calc(.5rem+env(safe-area-inset-bottom))] max-[640px]:right-auto max-[640px]:w-auto max-[640px]:rounded-[22px] ${minimized ? "h-[68px]" : "h-[min(620px,calc(100dvh-7rem))] max-[640px]:h-[calc(100dvh-1rem-env(safe-area-inset-bottom))]"}`}>
    <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#e2e9e1] bg-white px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[#123b2a] text-xs font-bold tracking-tight text-[#c9f36a]">DB</span><div className="min-w-0"><h2 id="db-assistant-title" className="text-[14px] font-semibold tracking-[-.02em] text-[#123b2a]">DB Assistant</h2><p id="db-assistant-subtitle" className="mt-0.5 text-[10px] text-[#647069]">Your guide to Dhanik Bharat</p></div></div>
      <div className="flex shrink-0 items-center gap-1"><span className="mr-1 inline-flex items-center gap-1.5 text-[10px] text-[#647069]"><span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />Online</span>
        <button type="button" onClick={onNewConversation} aria-label="Start a new conversation" title="New conversation" className="grid h-8 w-8 place-items-center rounded-lg text-[#647069] hover:bg-[#f1f4ef] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#08783f]"><RotateCcw size={14} aria-hidden="true" /></button>
        <button type="button" onClick={onMinimize} aria-label={minimized ? "Restore assistant" : "Minimize assistant"} title={minimized ? "Restore" : "Minimize"} className="grid h-8 w-8 place-items-center rounded-lg text-[#647069] hover:bg-[#f1f4ef] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#08783f]">{minimized ? <Plus size={15} aria-hidden="true" /> : <Minus size={15} aria-hidden="true" />}</button>
        <button type="button" onClick={onClose} aria-label="Close assistant" title="Close" className="grid h-8 w-8 place-items-center rounded-lg text-[#647069] hover:bg-[#f1f4ef] hover:text-[#123b2a] focus-visible:outline-2 focus-visible:outline-[#08783f]"><X size={15} aria-hidden="true" /></button>
      </div>
    </div>

    {!minimized && <>
      <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation">
        {isFresh ? <div className="flex min-h-full flex-col justify-center pb-2">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f1e5] text-sm font-bold text-[#08783f]">DB</div>
          <p className="text-[10px] font-semibold uppercase tracking-[.17em] text-[#08783f]">A good place to start</p>
          <h3 className="mt-2 max-w-[300px] text-[23px] font-semibold leading-[1.12] tracking-[-.045em] text-[#123b2a]">Hello. What would you like to explore?</h3>
          <p className="mt-2 max-w-[310px] text-[12px] leading-5 text-[#647069]">Ask about study pathways, campus life, or how admissions works.</p>
          <div className="mt-5 flex flex-wrap gap-2">{prompts.slice(0, 4).map((prompt) => <button key={prompt} type="button" onClick={() => onSubmit(prompt)} disabled={busy} className="rounded-full border border-[#dce5dc] bg-white px-3 py-2 text-left text-[11px] font-medium text-[#3d5144] transition hover:border-[#08783f] hover:text-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#08783f] disabled:opacity-50 motion-reduce:transition-none">{prompt}</button>)}</div>
        </div> : <div className="space-y-4">{messages.map((message) => <ChatMessage key={message.id} message={message} onAction={onAction} />)}{busy && <div className="flex items-center gap-2 pl-9 text-[11px] text-[#647069]" role="status"><span className="flex gap-1" aria-hidden="true"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] motion-reduce:animate-none" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] [animation-delay:150ms] motion-reduce:animate-none" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#08783f] [animation-delay:300ms] motion-reduce:animate-none" /></span>Thinking…</div>}</div>}
      </div>
      {error && <div className="shrink-0 border-t border-[#f0d7d7] bg-[#fff7f5] px-4 py-2.5 text-[11px] leading-5 text-[#8a3528]" role="alert">{error}</div>}
      <div className="shrink-0 border-t border-[#e2e9e1] bg-[#f7f8f4] p-3.5"><ChatInput onSubmit={onSubmit} busy={busy} inputRef={inputRef} /><p className="mt-2 text-center text-[9px] text-[#647069]">For the latest admissions details, please confirm with the institute.</p></div>
    </>}
  </section>;
}
