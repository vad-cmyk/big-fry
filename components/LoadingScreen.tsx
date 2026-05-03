"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

function AnimatedDots() {
  const [dots, setDots] = useState("")
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400)
    return () => clearInterval(id)
  }, [])
  return <span className="inline-block w-6 text-left">{dots}</span>
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem("big-fry-loaded")) { setVisible(false); return }
    const t = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("big-fry-loaded", "1")
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          >
            <Image
              src="/logo.png"
              alt="Big Fry Wymondham"
              width={220}
              height={80}
              className="h-16 w-auto rounded"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } }}
            className="text-gold/80 text-sm font-dm-sans tracking-[0.2em] uppercase"
          >
            Frying things up<AnimatedDots />
          </motion.p>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%", transition: { duration: 1.8, ease: "linear" } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
