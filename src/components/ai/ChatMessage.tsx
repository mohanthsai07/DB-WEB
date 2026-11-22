"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCheck, GraduationCap } from "lucide-react";
import type { AssistantAction, ChatMessageData } from "./assistant-types";
import AssistantAvatar from "./AssistantAvatar";

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

  if (type === "lead_offer") {
    return <button type="button" data-testid="talk-to-admissions" onClick={() => onAction("__DB_ASSISTANT_START_LEAD__")} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#d5e2d6] bg-white px-3.5 text-[11px] font-semibold text-[#123b2a] transition hover:border-[#08783f] hover:text-[#08783f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]">Talk to Admissions<ArrowUpRight size={13} aria-hidden="true" /></button>;
  }
  if (type === "whatsapp_link" && typeof action.href === "string") {
    if (/^https:\/\/wa\.me\/\d{8,15}\?text=/.test(action.href)) {
      return <a href={action.href} target="_blank" rel="noopener noreferrer" data-testid="send-whatsapp" className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#08783f] px-3.5 text-[11px] font-semibold text-white transition hover:bg-[#075f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08783f]">Send on WhatsApp<ArrowUpRight size={13} aria-hidden="true" /></a>;
    }
  }

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
    return <section className="mt-3 w-full overflow-hidden rounded-[16px] border border-[#e7e7e7] bg-white" aria-label="Program comparison">
      <div className="grid grid-cols-2 gap-px bg-[#e7e7e7]">
        <Link href="/programs/jee" className="group bg-white" aria-label="Explore MPC and JEE">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/programs/mpc.png" alt="MPC and JEE programme" className="h-28 w-full object-cover" />
          <div className="flex items-center justify-between px-3 py-2.5"><span className="text-[11px] font-bold text-[#123b2a]">MPC · JEE</span><ArrowUpRight size={13} className="text-[#285c43]" aria-hidden="true" /></div>
        </Link>
        <Link href="/programs/neet" className="group bg-white" aria-label="Explore BiPC and NEET">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/programs/bipc.png" alt="BiPC and NEET programme" className="h-28 w-full object-cover" />
          <div className="flex items-center justify-between px-3 py-2.5"><span className="text-[11px] font-bold text-[#123b2a]">BiPC · NEET</span><ArrowUpRight size={13} className="text-[#285c43]" aria-hidden="true" /></div>
        </Link>
      </div>
      {rows.length ? <div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-left text-[10px] leading-4"><thead><tr className="bg-[#f8f4ef] text-[#777777]"><th scope="col" className="w-[28%] px-2.5 py-2 font-semibold">Focus</th><th scope="col" className="w-[36%] px-2 py-2 font-semibold">MPC · JEE</th><th scope="col" className="w-[36%] px-2 py-2 font-semibold">BiPC · NEET</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.label}-${index}`} className="border-t border-[#eeeeea] align-top"><th scope="row" className="px-2.5 py-2 font-semibold text-[#344b3a]">{row.label}</th><td className="px-2 py-2 text-[#777777]">{row.mpc}</td><td className="px-2 py-2 text-[#777777]">{row.bipc}</td></tr>)}</tbody></table></div> : <p className="px-3.5 py-3 text-xs leading-5 text-[#777777]">{description}</p>}
    </section>;
  }
  if (type.includes("finder") || type.includes("program")) {
    const isMpc = text.includes("mpc") || text.includes("jee");
    const isBipc = text.includes("bipc") || text.includes("neet");
    const card = isBipc
      ? { title: "BiPC · NEET", subtitle: "Medical entrance pathway", image: "/images/programs/bipc.png", href: "/programs/neet" }
      : isMpc
        ? { title: "MPC · JEE", subtitle: "Engineering entrance pathway", image: "/images/programs/mpc.png", href: "/programs/jee" }
        : { title: "Explore programmes", subtitle: "Compare MPC + JEE and BiPC + NEET", image: "", href: "/programs" };
    if (card.image) return <Link href={card.href} className="mt-3 block w-full overflow-hidden rounded-[16px] border border-[#e7e7e7] bg-white" aria-label={`Explore ${card.title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={`${card.title} programme`} className="h-36 w-full object-cover" />
      <div className="flex items-center justify-between px-3.5 py-3"><div><p className="text-[12px] font-bold text-[#123b2a]">{card.title}</p><p className="mt-0.5 text-[10px] text-[#777777]">{card.subtitle}</p></div><ArrowRight size={16} className="text-[#285c43]" aria-hidden="true" /></div>
    </Link>;
    return <Link href={card.href} className="mt-3 flex w-full items-center justify-between rounded-[16px] border border-[#e7e7e7] bg-[#f8f4ef] px-3.5 py-3"><div><p className="text-[12px] font-bold text-[#123b2a]">{card.title}</p><p className="mt-0.5 text-[10px] text-[#777777]">{card.subtitle}</p></div><ArrowRight size={16} className="text-[#285c43]" aria-hidden="true" /></Link>;
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
  return <article className={`flex gap-2.5 ${isAssistant ? "items-start" : "flex-row-reverse items-end"}`} aria-label={isAssistant ? "DHANIX AI message" : "Your message"}>
    {isAssistant && (
      <AssistantAvatar className="mt-1" />
    )}
    <div className={`min-w-0 ${isAssistant ? "max-w-[88%]" : "max-w-[78%]"}`}>
      {isAssistant && <p className="mb-1 px-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#285c43]">DHANIX AI</p>}
      {message.content && <div className={isAssistant ? "rounded-[16px] rounded-tl-[4px] bg-[#f8f4ef] px-3.5 py-3" : "rounded-[16px] rounded-tr-[4px] bg-[#123b2a] px-3.5 py-2.5 text-white"}>
        <p className={`whitespace-pre-wrap break-words text-[13px] leading-[1.65] ${isAssistant ? "text-[#4b4b48]" : "text-white"}`}>{message.content}</p>
      </div>}
      {message.actions?.length ? <div className="mt-2.5 flex flex-wrap gap-2">{message.actions.map((action, index) => <SafeAction key={`${action.type ?? action.label ?? "action"}-${index}`} action={action} onAction={onAction} />)}</div> : null}
      <div className={`mt-1 flex items-center gap-1 text-[9px] text-[#777777] ${isAssistant ? "" : "justify-end"}`}>
        <span>Just now</span>
        {!isAssistant && <CheckCheck size={12} className="text-[#285c43]" aria-label="Delivered" />}
      </div>
    </div>
  </article>;
}
