// Reuses the exact email + WhatsApp channels already configured for Chassis.
// Email: formsubmit.co AJAX, the same no-backend service the original chassislb.com
// contact form used, targeting the same address (already activated with that provider).
// WhatsApp: same click-to-chat wa.me pattern used everywhere else on the site.

const CHASSIS_EMAIL = "chassis.lb@gmail.com";
const CHASSIS_WHATSAPP = "96171085824";
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${CHASSIS_EMAIL}`;

export async function submitDiagnosticEmail({
  meta,
  questionResults,
  resultTitle,
  resultBody,
  recommendationTitle,
  recommendationBody,
  recommendationPrice,
  recommendationDeliverables,
}) {
  const payload = {
    _subject: `NEW CHASSIS DIAGNOSTIC: ${meta.businessName || "Unnamed business"}`,
    _template: "table",
    _captcha: "false",
    _honey: "",
    "Business Name": meta.businessName || "N/A",
    Name: meta.name || "N/A",
    Email: meta.email || "N/A",
    "Phone / WhatsApp": meta.phone || "N/A",
    Language: meta.language,
    "Submission Date and Time": meta.timestamp,
    Result: `${resultTitle} ${resultBody}`,
    "Recommended Starting Point": `${recommendationTitle} (${recommendationPrice || "custom quote"})`,
    "Why This Recommendation": recommendationBody,
    "What's Included": (recommendationDeliverables || []).join(" | "),
  };

  questionResults.forEach(({ label, checked }) => {
    payload[label] = checked ? "Yes" : "No";
  });

  const response = await fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Diagnostic email submission failed");
  }

  return response;
}

export function buildWhatsAppUrl(
  {
    meta,
    questionResults,
    resultTitle,
    resultBody,
    recommendationTitle,
    recommendationBody,
    recommendationPrice,
    recommendationDeliverables,
  },
  headerLabel
) {
  const lines = [headerLabel, ""];
  lines.push(`Business: ${meta.businessName || "N/A"}`);
  lines.push(`Name: ${meta.name || "N/A"}`);
  lines.push(`Email: ${meta.email || "N/A"}`);
  lines.push(`Phone: ${meta.phone || "N/A"}`);
  lines.push("");
  lines.push(`Result: ${resultTitle}`);
  lines.push(resultBody);
  lines.push("");
  lines.push(`Recommended starting point: ${recommendationTitle} (${recommendationPrice || "custom quote"})`);
  lines.push(recommendationBody);
  if (recommendationDeliverables?.length) {
    lines.push("");
    lines.push("What's included:");
    recommendationDeliverables.forEach((d) => lines.push(`- ${d}`));
  }
  lines.push("");
  lines.push("Answers:");

  questionResults.forEach(({ label, checked }) => {
    lines.push(`${checked ? "Yes" : "No"}: ${label}`);
  });

  const text = lines.join("\n").trim();
  return `https://wa.me/${CHASSIS_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
