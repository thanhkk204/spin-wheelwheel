export const speakChinese = (text) => {
    console.log({text})
    // Hủy mọi câu đang đọc
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "zh-CN"
  utterance.rate = 0.9 // chậm một chút cho tự nhiên
  utterance.pitch = 1.1 // cao hơn một chút
  utterance.volume = 1 // âm lượng tối đa

  // chọn giọng Google 普通话
  const voices = speechSynthesis.getVoices()
   utterance.voice = voices[23]

  speechSynthesis.speak(utterance)
}
