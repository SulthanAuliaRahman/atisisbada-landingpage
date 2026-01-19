export function extractInstagramUsername(input: string): string {
  if (!input) return "";
  try {
    const url = new URL(input);
    if (url.hostname.includes("instagram.com")) {
      return url.pathname.replace(/\//g, "").split("?")[0];
    }
  } catch {
    return input.replace("@", "").trim();
  }
  return input;
}

export function extractWhatsAppNumber(input: string): string {
  if (!input) return "";
  const cleaned = input.replace(/[^0-9]/g, "");
  if (input.includes("wa.me")) {
    return cleaned;
  }
  if (input.includes("whatsapp")) {
    return cleaned;
  }
  return cleaned;
}
