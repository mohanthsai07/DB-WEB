export type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  interestedProgram?: string;
  className?: string;
  campus?: string;
  enquiry: string;
  source: "DB Assistant";
  page: string;
  conversationId: string;
  createdAt: string;
  consentAt: string;
};

/** Constructs a validated lead record for this request. No persistent database exists yet. */
export function createLead(input: Omit<LeadRecord, "id" | "source" | "createdAt">): LeadRecord {
  return { ...input, id: crypto.randomUUID(), source: "DB Assistant", createdAt: new Date().toISOString() };
}

export function isWhatsAppNumberConfigured(rawNumber: string | undefined): rawNumber is string {
  return Boolean(rawNumber?.trim() && /^[1-9]\d{7,14}$/.test(rawNumber.trim()));
}

/** Create a user-initiated WhatsApp draft. The user must press Send in WhatsApp. */
export function createWhatsAppEnquiryLink(lead: LeadRecord, rawNumber: string | undefined): string | null {
  const whatsappNumber = rawNumber?.trim();
  if (!isWhatsAppNumberConfigured(whatsappNumber)) return null;

  const lines = [
    "Hi Dhanik Bharat Admissions,",
    "",
    "I am interested in admission.",
    `Name: ${lead.name}`,
    `Mobile: ${lead.phone}`,
    ...(lead.interestedProgram ? [`Program: ${lead.interestedProgram}`] : []),
    ...(lead.className ? [`Class: ${lead.className}`] : []),
    ...(lead.campus ? [`Campus: ${lead.campus}`] : []),
    "",
    "Enquiry:",
    lead.enquiry,
    "",
    `Source: ${lead.source}`,
    `Page: ${lead.page}`,
  ];
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
