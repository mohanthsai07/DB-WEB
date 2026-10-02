export type ChatRole = "user" | "assistant";

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  content: string;
  actions?: AssistantAction[];
};

export type AssistantAction = {
  type?: string;
  label?: string;
  title?: string;
  href?: string;
  description?: string;
  items?: unknown[];
  rows?: unknown[];
  [key: string]: unknown;
};

export type PageContext = {
  pathname: string;
  pageTitle: string;
  pageType: string;
};
