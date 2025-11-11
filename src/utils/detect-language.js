export function detectLanguage(text) {
  for (let char of text) {
    const code = char.charCodeAt(0);
    // Kiểm tra tiếng Trung
    if ((code >= 0x4e00 && code <= 0x9fff) || (code >= 0x3400 && code <= 0x4dbf)) {
      return "chinese";
    }
  }

  // Nếu không phải tiếng Trung, coi là tiếng Việt
  return "vietnamese";
}
