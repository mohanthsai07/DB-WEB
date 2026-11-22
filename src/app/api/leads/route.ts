import { createLead, createWhatsAppEnquiryLink, isWhatsAppNumberConfigured } from "@/lib/leads/lead-service";
import { normalizeIndianMobile } from "@/lib/leads/phone";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const allowedPages = new Set(["/", "/programs", "/campus", "/student-life", "/about", "/admissions"]);
const requests = new Map<string, { count: number; resetsAt: number }>();

function leadResponse(body: Record<string, unknown>, status: number, reason: string) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[DHANIX Leads] API response status: ${status}; reason: ${reason}`);
  }
  return Response.json(body, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rateLimited(ip: string) {
  const now = Date.now();
  if (requests.size > 1_000) for (const [key, value] of requests) if (value.resetsAt <= now) requests.delete(key);
  const current = requests.get(ip);
  if (!current) {
    if (requests.size >= 2_000) {
      const oldestKey = requests.keys().next().value;
      if (oldestKey) requests.delete(oldestKey);
    }
    requests.set(ip, { count: 1, resetsAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function optionalString(body: Record<string, unknown>, key: string, maxLength: number): string | undefined | null {
  if (body[key] === undefined || body[key] === "") return undefined;
  if (typeof body[key] !== "string") return null;
  const value = body[key].trim();
  return value && value.length <= maxLength ? value : null;
}

export async function GET() {
  return Response.json(
    { whatsappConfigured: isWhatsAppNumberConfigured(process.env.NEXT_PUBLIC_DHANIK_WHATSAPP_NUMBER) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "development") console.info("[DHANIX Leads] lead request received");
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return leadResponse({ error: "Please wait a moment before trying again." }, 429, "rate_limited");
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return leadResponse({ error: "Enquiry details are too large." }, 413, "body_too_large");

  let raw: string;
  try { raw = await request.text(); } catch { return leadResponse({ error: "Invalid enquiry request." }, 400, "body_read_failed"); }
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return leadResponse({ error: "Enquiry details are too large." }, 413, "body_too_large");
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return leadResponse({ error: "Invalid enquiry request." }, 400, "invalid_json"); }
  if (!isRecord(parsed)) return leadResponse({ error: "Please check the enquiry details." }, 400, "invalid_payload");

  const allowedFields = new Set(["name", "phone", "interestedProgram", "className", "campus", "enquiry", "page", "conversationId", "consent"]);
  if (Object.keys(parsed).some((key) => !allowedFields.has(key))) return leadResponse({ error: "Please check the enquiry details." }, 400, "unexpected_payload_field");
  if (parsed.consent !== true) return leadResponse({ error: "Please confirm consent before preparing the enquiry." }, 422, "consent_missing");

  const name = typeof parsed.name === "string" ? parsed.name.trim() : "";
  if (name.length < 2 || name.length > 80 || !/^\p{L}[\p{L}\p{M} .'-]*$/u.test(name)) {
    return leadResponse({ error: "Please enter a valid name." }, 422, "invalid_name");
  }
  const phone = typeof parsed.phone === "string" ? normalizeIndianMobile(parsed.phone) : null;
  if (process.env.NODE_ENV === "development") {
    console.info(`[DHANIX Leads] phone validation: ${phone ? "valid" : "invalid"}; normalized phone: ${phone ? "yes" : "no"}`);
  }
  if (!phone) return leadResponse({ error: "Please enter a valid Indian mobile number." }, 422, "invalid_phone");

  const enquiry = typeof parsed.enquiry === "string"
    ? parsed.enquiry.trim().replace(/(?<!\d)(?:\+?91[\s().-]?)?[6-9](?:[\s().-]?\d){9}(?!\d)/g, "[mobile number omitted]")
    : "";
  if (!enquiry || enquiry.length > 500) return leadResponse({ error: "Please add a short note about your enquiry." }, 422, "invalid_enquiry");
  const page = typeof parsed.page === "string" && allowedPages.has(parsed.page) ? parsed.page : null;
  if (!page) return leadResponse({ error: "Please refresh the page and try again." }, 422, "invalid_page");
  const conversationId = typeof parsed.conversationId === "string" && /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(parsed.conversationId)
    ? parsed.conversationId
    : null;
  if (!conversationId) return leadResponse({ error: "Please restart the enquiry and try again." }, 422, "invalid_conversation_id");

  const interestedProgram = optionalString(parsed, "interestedProgram", 80);
  const className = optionalString(parsed, "className", 40);
  const campus = optionalString(parsed, "campus", 100);
  if (interestedProgram === null || className === null || campus === null) {
    return leadResponse({ error: "Please check the enquiry details." }, 422, "invalid_optional_fields");
  }

  const lead = createLead({ name, phone, enquiry, page, conversationId, consentAt: new Date().toISOString(), ...(interestedProgram ? { interestedProgram } : {}), ...(className ? { className } : {}), ...(campus ? { campus } : {}) });
  const whatsappUrl = createWhatsAppEnquiryLink(lead, process.env.NEXT_PUBLIC_DHANIK_WHATSAPP_NUMBER);
  if (process.env.NODE_ENV === "development") {
    const configured = isWhatsAppNumberConfigured(process.env.NEXT_PUBLIC_DHANIK_WHATSAPP_NUMBER);
    console.info(`[DHANIX Leads] WhatsApp number configured: ${configured ? "yes" : "no"}; message generation: ${whatsappUrl ? "success" : "failure"}`);
  }
  if (!whatsappUrl) {
    return leadResponse({ error: "whatsapp_not_configured" }, 503, "whatsapp_not_configured");
  }

  return leadResponse({ status: "ready", whatsappUrl }, 200, "ready");
}
