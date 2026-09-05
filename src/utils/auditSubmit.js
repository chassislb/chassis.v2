// Reuses the exact email + WhatsApp channels already configured for Chassis.
// Email: formsubmit.co AJAX, the same no-backend service the original chassislb.com
// contact form used, targeting the same address (already activated with that provider).
// WhatsApp: same click-to-chat wa.me pattern used everywhere else on the site.

const CHASSIS_EMAIL = "chassis.lb@gmail.com";
const CHASSIS_WHATSAPP = "96171085824";
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${CHASSIS_EMAIL}`;

// Conservative raw-text budget before we fall back to a concise WhatsApp
// message. Arabic expands roughly 3x once URL-encoded (multi-byte UTF-8),
// so this keeps the encoded URL comfortably under safe mobile/browser limits.
const WHATSAPP_FULL_TEXT_LIMIT = 1200;

export async function submitAuditEmail({ meta, sections }) {
  const payload = {
    _subject: `NEW CHASSIS BUSINESS AUDIT — ${meta.businessName || "Unnamed business"}`,
    _template: "table",
    _captcha: "false",
    _honey: "",
    "Business Name": meta.businessName,
    "Contact Name & Role": meta.contactName,
    Email: meta.email,
    "Phone / WhatsApp": meta.phone,
    "Number of Locations": meta.locationsLabel,
    "Team Size": meta.teamSize,
    "Audit Language": meta.language,
    "Submission Date and Time": meta.timestamp,
  };

  sections.forEach((section) => {
    section.items.forEach((item) => {
      payload[`${section.title} — ${item.label}`] = item.answer || "—";
    });
  });

  const response = await fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Audit email submission failed");
  }

  return response;
}

function buildFullWhatsAppText({ meta, sections }, headerLabel) {
  const lines = [headerLabel, ""];
  lines.push(`Business: ${meta.businessName}`);
  lines.push(`Contact: ${meta.contactName}`);
  lines.push(`Email: ${meta.email}`);
  lines.push(`Phone: ${meta.phone}`);
  lines.push(`Locations: ${meta.locationsLabel}`);
  lines.push(`Team Size: ${meta.teamSize}`);
  lines.push(`Language: ${meta.language}`);
  lines.push("");

  sections.forEach((section) => {
    lines.push(section.title.toUpperCase());
    section.items.forEach((item) => {
      lines.push(`Q: ${item.label}`);
      lines.push(`A: ${item.answer || "—"}`);
    });
    lines.push("");
  });

  return lines.join("\n").trim();
}

function buildConciseWhatsAppText({ meta }, headerLabel, emailedNoticeLabel) {
  const lines = [headerLabel, ""];
  lines.push(`Business: ${meta.businessName}`);
  lines.push(`Contact: ${meta.contactName}`);
  lines.push(`Email: ${meta.email}`);
  lines.push(`Phone: ${meta.phone}`);
  lines.push(`Locations: ${meta.locationsLabel}`);
  lines.push(`Team Size: ${meta.teamSize}`);
  lines.push(`Language: ${meta.language}`);

  if (meta.topChallengeLabel && meta.topChallenge) {
    lines.push("");
    lines.push(`${meta.topChallengeLabel}: ${meta.topChallenge}`);
  }

  lines.push("");
  lines.push(emailedNoticeLabel);

  return lines.join("\n").trim();
}

export function buildWhatsAppUrl(structured, copy) {
  const fullText = buildFullWhatsAppText(structured, copy.header);
  const text = fullText.length <= WHATSAPP_FULL_TEXT_LIMIT
    ? fullText
    : buildConciseWhatsAppText(structured, copy.header, copy.emailedNotice, copy.topAnswerLabel);

  return {
    url: `https://wa.me/${CHASSIS_WHATSAPP}?text=${encodeURIComponent(text)}`,
    isFull: fullText.length <= WHATSAPP_FULL_TEXT_LIMIT,
  };
}
