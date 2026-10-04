/** Accept common Indian mobile input forms and return a normalized +91 number. */
export function normalizeIndianMobile(value: string): string | null {
  const input = value.trim();
  if (!/^\+?[\d\s()-]+$/.test(input)) return null;
  const digits = input.replace(/\D/g, "");
  const mobile = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(mobile)) return null;
  return `+91${mobile}`;
}

