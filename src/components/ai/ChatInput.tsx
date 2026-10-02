"use client";

import { ArrowUp, LoaderCircle } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

type ChatInputProps = {
  onSubmit: (value: string) => void;
  busy: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
};

export default function ChatInput({ onSubmit, busy, inputRef }: ChatInputProps) {
  const [value, setValue] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message || busy) return;
    setValue("");
    onSubmit(message);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[18px] border border-[#dce5dc] bg-white p-2 shadow-[0_3px_12px_rgba(18,59,42,.04)]">
      <label className="sr-only" htmlFor="db-assistant-message">Message DB Assistant</label>
      <textarea
        ref={inputRef}
        id="db-assistant-message"
        rows={1}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about programs or admissions…"
        aria-label="Message DB Assistant"
        className="max-h-28 min-h-10 w-full resize-none bg-transparent px-2.5 py-2 text-[13px] leading-5 text-[#123b2a] outline-none placeholder:text-[#87928a]"
      />
      <div className="flex items-center justify-between pl-2.5">
        <span className="text-[10px] text-[#647069]">Enter to send · Shift + Enter for a new line</span>
        <button
          type="submit"
          disabled={!value.trim() || busy}
          aria-label="Send message"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#08783f] text-white transition hover:bg-[#075f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f] disabled:cursor-not-allowed disabled:bg-[#dce5dc] disabled:text-[#77837a] motion-reduce:transition-none"
        >
          {busy ? <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowUp size={17} aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
