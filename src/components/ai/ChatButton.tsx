"use client";

import { MessageCircle, X } from "lucide-react";

type ChatButtonProps = {
  open: boolean;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
};

export default function ChatButton({ open, onClick, buttonRef }: ChatButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={open ? "Close DB Assistant" : "Open DB Assistant"}
      aria-expanded={open}
      aria-controls="db-assistant-panel"
      className="group inline-flex min-h-14 items-center gap-3 rounded-full border border-[#d9e2d9] bg-[#123b2a] px-5 text-white shadow-[0_12px_36px_rgba(18,59,42,.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d3021] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c9f36a] text-[#123b2a]">
        {open ? <X size={18} aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
      </span>
      <span className="pr-1 text-left">
        <span className="block text-sm font-semibold leading-4">DB Assistant</span>
        {!open && <span className="mt-1 block text-[10px] tracking-wide text-white/70">Ask us anything</span>}
      </span>
    </button>
  );
}
