// Fills {placeholders} inside a translated sentence.
// Example: fill("Hello {name}", { name: "Salma" }) -> "Hello Salma"
export const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

// Today's date as "2026-10-17", the format a date input understands. Uses the user's own clock.
export const todayISO = () => {
  const d = new Date();
  const two = (v) => String(v).padStart(2, "0");
  return `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;
};

// "5 minutes ago", "yesterday", "منذ ٣ ساعات" ... in the current language. minutes = how long ago.
export const relativeTime = (lang, minutes) => {
  const rtf = new Intl.RelativeTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", { numeric: "auto" });
  if (minutes < 60) return rtf.format(-Math.max(1, Math.round(minutes)), "minute");
  if (minutes < 1440) return rtf.format(-Math.round(minutes / 60), "hour");
  return rtf.format(-Math.round(minutes / 1440), "day");
};
