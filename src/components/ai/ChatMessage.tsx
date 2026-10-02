"use client";

import Link from "next/link";
import { ArrowUpRight, Bot, BookOpen, Compass, GraduationCap } from "lucide-react";
import type { AssistantAction, ChatMessageData } from "./assistant-types";

const navigation = [
  { name: "Programs", href: "/programs", aliases: ["programs", "explore programs", "program overview"] },
  { name: "Campus", href: "/campus", aliases: ["campus", "campus life", "learning environment"] },
  { name: "Student Life", href: "/student-life", aliases: ["student life", "student experience"] },
  { name: "About", href: "/about", aliases: ["about", "about us", "our story"] },
  { name: "Admissions", href: "/admissions", aliases: ["admissions", "admission", "apply"] },
  { name: "MPC · JEE", href: "/programs", aliases: ["mpc", "mpc jee", "jee", "engineering pathway"] },
  { name: "BiPC · NEET", href: "/programs", aliases: ["bipc", "bipc neet", "neet", "medical pathway"] },
  { name: "Enquiry form", href: "/admissions#enquiry", aliases: ["enquiry", "enquiry form", "admission enquiry", "contact admissions"] },
];

function actionLabel(action: AssistantAction) {
  return [action.label, action.title, action.href, action.type]
    .filter((value): value is string => typeof value === "string")
    .join(" ").toLowerCase().replace(/[^a-z0-9/#]+/g, " ").trim();
}

function SafeAction({ action, onAction }: { action: AssistantAction; onAction: (value: string) => void }) {
  const type = typeof action.type === "string" ? action.type.toLowerCase() : "";
  const text = actionLabel(action);
  const nav = navigation.find((entry) => entry.href === action.href)
    ?? navigation.find((entry) => entry.aliases.some((alias) => text.includes(alias)));

  if (type === "prompt" && typeof action.value === "string" && action.value.trim()) {
    return <button type="button" onClick={() => onAction(action.value as string)} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#d5e2d6] bg-white px-3.5 text-[11px] font-semibold text-[#123b2a] transition hover:border-[#08783f] hover:text-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f] motion-reduce:transition-none">{typeof action.label === "string" ? action.label : "Continue"}<ArrowUpRight size={13} aria-hidden="true" /></button>;
  }
  if (type.includes("comparison") || type.includes("compare")) {
    const description = typeof action.description === "string" ? action.description : "Compare the MPC + JEE and BiPC + NEET pathways.";
    const rows = (action.rows ?? []).filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object" && !Array.isArray(row))).map((row) => ({
      label: typeof row.label === "string" ? row.label.slice(0, 100) : "",
      mpc: typeof row.mpc === "string" || typeof row.mpc === "number" ? String(row.mpc).slice(0, 180) : "",
      bipc: typeof row.bipc === "string" || typeof row.bipc === "number" ? String(row.bipc).slice(0, 180) : "",
    })).filter((row) => row.label && (row.mpc || row.bipc));
    return <section className="mt-2 overflow-hidden rounded-2xl border border-[#dce5dc] bg-[#f7f8f4]" aria-label="Program comparison"><div className="flex items-center gap-2 px-3.5 pt-3.5 text-[11px] font-semibold text-[#123b2a]"><BookOpen size={14} className="text-[#08783f]" aria-hidden="true" /> Program comparison</div>{rows.length ? <div className="mt-2 overflow-x-auto"><table className="w-full min-w-[340px] table-fixed border-collapse text-left text-[10px] leading-4"><thead><tr className="bg-[#edf3ea] text-[#536458]"><th scope="col" className="w-[28%] px-2.5 py-2 font-semibold">Focus</th><th scope="col" className="w-[36%] px-2 py-2 font-semibold">MPC · JEE</th><th scope="col" className="w-[36%] px-2 py-2 font-semibold">BiPC · NEET</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.label}-${index}`} className="border-t border-[#e2e9e1] align-top"><th scope="row" className="px-2.5 py-2 font-semibold text-[#344b3a]">{row.label}</th><td className="px-2 py-2 text-[#647069]">{row.mpc}</td><td className="px-2 py-2 text-[#647069]">{row.bipc}</td></tr>)}</tbody></table></div> : <p className="px-3.5 pt-2 text-xs leading-5 text-[#647069]">{description}</p>}<div className="flex flex-wrap gap-2 p-3.5 pt-3">{navigation.slice(5, 7).map((item) => <Link key={item.name} href={item.href} className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#08783f] ring-1 ring-[#dce5dc]">{item.name}</Link>)}</div></section>;
  }
  if (type.includes("finder") || type.includes("program")) {
    return <section className="mt-2 rounded-2xl bg-[#edf4e9] p-3.5" aria-label="Program finder"><div className="flex items-center gap-2 text-[11px] font-semibold text-[#123b2a]"><Compass size={14} className="text-[#08783f]" aria-hidden="true" /> Find a pathway</div><p className="mt-1.5 text-xs leading-5 text-[#647069]">Explore the two available directions and choose the one that matches your interests.</p><Link href="/programs" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#08783f]">Explore programs <ArrowUpRight size={13} aria-hidden="true" /></Link></section>;
  }
  if (type.includes("admission") || type.includes("guidance")) {
    return <section className="mt-2 rounded-2xl bg-[#edf4e9] p-3.5" aria-label="Admissions guidance"><div className="flex items-center gap-2 text-[11px] font-semibold text-[#123b2a]"><GraduationCap size={15} className="text-[#08783f]" aria-hidden="true" /> Admissions guidance</div><p className="mt-1.5 text-xs leading-5 text-[#647069]">Review the admissions steps and use the enquiry form to prepare your questions.</p><Link href="/admissions#enquiry" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#08783f]">Go to enquiry form <ArrowUpRight size={13} aria-hidden="true" /></Link></section>;
  }
  if (nav) {
    return <Link href={nav.href} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#d5e2d6] bg-white px-3.5 text-[11px] font-semibold text-[#123b2a] transition hover:border-[#08783f] hover:text-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f] motion-reduce:transition-none">{nav.name}<ArrowUpRight size={13} aria-hidden="true" /></Link>;
  }
  return null;
}

export default function ChatMessage({ message, onAction }: { message: ChatMessageData; onAction: (value: string) => void }) {
  const isAssistant = message.role === "assistant";
  return <article className={`flex gap-2.5 ${isAssistant ? "items-start" : "flex-row-reverse items-start"}`} aria-label={isAssistant ? "Assistant message" : "Your message"}>
    {isAssistant && <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e8f1e5] text-[#08783f]"><Bot size={15} aria-hidden="true" /></span>}
    <div className={`max-w-[86%] min-w-0 ${isAssistant ? "" : "rounded-2xl rounded-tr-md bg-[#123b2a] px-3.5 py-2.5 text-white"}`}>
      {message.content && <p className={`whitespace-pre-wrap break-words text-[13px] leading-[1.65] ${isAssistant ? "text-[#263b30]" : ""}`}>{message.content}</p>}
      {message.actions?.length ? <div className="mt-2.5 flex flex-wrap gap-2">{message.actions.map((action, index) => <SafeAction key={`${action.type ?? action.label ?? "action"}-${index}`} action={action} onAction={onAction} />)}</div> : null}
    </div>
  </article>;
}
