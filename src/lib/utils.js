export function sanitizeKey(key) {
  return key.replace(/\./g, "@");
}

export function unsanitizeKey(key) {
  return key.replace(/@/g, ".");
}
