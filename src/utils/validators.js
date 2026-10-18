// Small checks used by the forms. They return true when the value is OK.
export const toLatin = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
// Egyptian mobile: 010 / 011 / 012 / 015 + 8 digits (optionally with +20)
export const isPhone = (v) => /^(?:\+?20|0)1[0125]\d{8}$/.test(toLatin(v).replace(/[\s-]/g, ""));
export const isStrongPassword = (v) => v.length >= 8 && /\p{L}/u.test(v) && /\d/.test(v);

// True when a text contains an email or a long run of digits (a phone number).
// Reviews must not contain contact details. The backend must check this again later.
export const hasContactInfo = (v) => {
  const text = toLatin(v);
  const digitsJoined = text.replace(/(?<=\d)[\s.-]+(?=\d)/g, ""); // "010 1234 5678" -> "01012345678"
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) || /\d{8,}/.test(digitsJoined);
};

// Reads a whole-number amount such as "3500", "3,500" or "٣٥٠٠". Returns NaN when it is not a number.
export const parseAmount = (v) => {
  const clean = toLatin(v).replace(/[\s,٬،]/g, "");
  return /^\d+$/.test(clean) ? Number(clean) : NaN;
};
