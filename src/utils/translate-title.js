function traslateKey(key) {
  switch (key) {
    case "option":
      return "Tiếng việt";
    case "pinyin":
      return "Pinyin";
    case "hanyu":
      return "Tiếng trung";
    case "hidden":
      return "Ẩn";
    
    default:
      return undefined;
  }
}

export default traslateKey;