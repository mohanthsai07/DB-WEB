import type { ChatMessageData, PageContext } from "@/components/ai/assistant-types";

export type LeadDraft = {
  name?: string;
  phone?: string;
  interestedProgram?: string;
  className?: string;
  campus?: string;
  enquiry: string;
  page: string;
  conversationId: string;
};

export function isTinglishConversation(messages: ChatMessageData[]) {
  const text = messages.filter((message) => message.role === "user").slice(-6).map((message) => message.content).join(" ");
  return /[\u0c00-\u0c7f]/.test(text) || /\b(kavali|avvali|undha|enti|cheppu|cheppandi|maku|naku|mee|unna|em|lo|side|chesa|pampinchandi|avunu|sare|ledu|vaddhu)\b/i.test(text);
}

export function createLeadDraft(messages: ChatMessageData[], context: PageContext, conversationId: string): LeadDraft {
  const userMessages = messages.filter((message) => message.role === "user").slice(-8).map((message) => message.content);
  const source = userMessages.join(" ");
  const program = /\b(NEET|BiPC|medicine|medical|doctor)\b/i.test(source)
    ? "NEET / BiPC"
    : /\b(JEE|MPC|engineering|engineer|IIT)\b/i.test(source) ? "JEE / MPC" : undefined;
  const classMatch = source.match(/\bclass\s*(10|11|12)\b|\b(10|11|12)th\b/i);
  const className = classMatch ? classMatch[1] || classMatch[2] : undefined;
  const campusMatch = source.match(/\b(?:at|in|campus(?: in)?)\s+(Madhapur|Hyderabad|Bengaluru|Vijayawada)\b/i);
  const campus = campusMatch?.[1];
  const enquiry = (userMessages.at(-1) || "Interested in admission").replace(/(?<!\d)(?:\+?91[\s().-]?)?[6-9](?:[\s().-]?\d){9}(?!\d)/g, "[mobile number omitted]").slice(0, 500);
  return {
    enquiry,
    page: context.pathname,
    conversationId,
    ...(program ? { interestedProgram: program } : {}),
    ...(className ? { className } : {}),
    ...(campus ? { campus } : {}),
  };
}
