"use client";

import { X } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";

type ChatButtonProps = {
  open: boolean;
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  disabled?: boolean;
};

export default function ChatButton({ open, onClick, buttonRef, disabled = false }: ChatButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="chat-launcher"
      aria-label={open ? "Close DHANIX" : "Open DHANIX, your smart learning companion"}
      aria-expanded={open}
      aria-controls="db-assistant-panel"
      className="group inline-flex min-h-14 items-center gap-3 rounded-full border border-[#d9e2d9] bg-[#123b2a] px-4 text-white shadow-[0_12px_36px_rgba(18,59,42,.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d3021] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285c43] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full">
        {open ? <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#123b2a]"><X size={18} aria-hidden="true" /></span> : <AssistantAvatar className="h-9 w-9" />}
      </span>
      <span className="pr-1 text-left">
        <span className="block text-sm font-semibold leading-4">DHANIX</span>
        {!open && <span className="mt-1 block text-[10px] tracking-wide text-white/70">Ask us anything</span>}
      </span>
    </button>
  );
}
