"use client";

import { ArrowUp, LoaderCircle } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

type ChatInputProps = {
  onSubmit: (value: string) => void;
  busy: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  inputTestId?: string;
};

export default function ChatInput({ onSubmit, busy, inputRef, inputTestId = "chat-input" }: ChatInputProps) {
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
    <form onSubmit={submit} className="rounded-[18px] border border-[#eadfd2] bg-white p-2 shadow-[0_3px_14px_rgba(241,90,39,.06)]">
      <label className="sr-only" htmlFor="db-assistant-message">Message DHANIX AI</label>
      <textarea
        ref={inputRef}
        id="db-assistant-message"
        rows={1}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Reply to me..."
        aria-label="Message DHANIX AI"
        data-testid={inputTestId}
        className="max-h-28 min-h-10 w-full resize-none bg-transparent px-2.5 py-2 text-[13px] leading-5 text-[#171717] outline-none placeholder:text-[#777777]"
      />
      <div className="flex items-center justify-between pl-2.5">
        <span className="text-[10px] text-[#777777]">Enter to send · Shift + Enter for a new line</span>
        <button
          type="submit"
          disabled={!value.trim() || busy}
          aria-label="Send message"
          data-testid="chat-send"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#123b2a] text-white transition hover:bg-[#285c43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285c43] disabled:cursor-not-allowed disabled:bg-[#e7e7e7] disabled:text-[#777777] motion-reduce:transition-none"
        >
          {busy ? <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowUp size={17} aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
