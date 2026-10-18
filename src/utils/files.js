// Shared upload rules (used by the Register page and the Dashboard).
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Returns an error message (from translations) or "" when the file is fine.
export function validateFile(file, t) {
  if (!ALLOWED_TYPES.includes(file.type)) return t.errors.fileType;
  if (file.size > MAX_SIZE) return t.errors.fileSize;
  return "";
}

// Photos (for example listing photos) must be real images: JPG or PNG, no PDF.
export const IMAGE_TYPES = ["image/jpeg", "image/png"];

// Returns "type" or "size" when the photo has a problem, or "" when it is fine.
// The page turns that code into a message in the right language.
export function validateImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) return "type";
  if (file.size > MAX_SIZE) return "size";
  return "";
}
