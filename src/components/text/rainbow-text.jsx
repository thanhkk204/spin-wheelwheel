import { motion } from "framer-motion"

export default function RainbowText() {
  return (
    <motion.p
      className="text-3xl mb-3 font-bold text-transparent bg-clip-text bg-[linear-gradient(90deg,red,orange,yellow,green,blue,indigo,violet,red)] bg-[length:200%_200%]"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        opacity: [0.8, 1, 0.8],
        scale: [1, 1.05, 1],
        textShadow: [
          "0 0 10px rgba(255,255,255,0.3)",
          "0 0 25px rgba(255,255,255,0.8)",
          "0 0 10px rgba(255,255,255,0.3)"
        ],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      🎉 Kết quả
    </motion.p>
  )
}
