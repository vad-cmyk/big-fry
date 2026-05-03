"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PHONE_HREF, PHONE } from "@/lib/constants"

const WORDS = ["Wymondham's", "Most", "Loved", "Fish", "&", "Chips"]
const GOLD_WORDS = new Set(["Fish", "&", "Chips"])

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sil1Ref = useRef<HTMLDivElement>(null)
  const sil2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!heroRef.current) return

    if (sil1Ref.current) {
      gsap.to(sil1Ref.current, {
        y: -120,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      })
    }
    if (sil2Ref.current) {
      gsap.to(sil2Ref.current, {
        y: -80,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 },
      })
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" aria-hidden="true">
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-navy/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(232,181,71,0.08),transparent)]" />

      {/* Parallax silhouettes — decorative SVG shapes */}
      <div ref={sil1Ref} className="absolute top-[12%] left-[6%] opacity-[0.07] pointer-events-none select-none" aria-hidden="true">
        <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40 C30 10, 80 5, 120 20 C150 30, 170 38, 170 40 C170 42, 150 50, 120 60 C80 75, 30 70, 10 40 Z" fill="#E8B547"/>
          <path d="M170 40 L160 28 L175 35 Z" fill="#E8B547"/>
          <circle cx="135" cy="35" r="4" fill="#0A1F3D"/>
        </svg>
      </div>
      <div ref={sil2Ref} className="absolute top-[20%] right-[8%] opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="40" height="65" rx="4" fill="#E8B547"/>
          <rect x="5" y="20" width="50" height="18" rx="6" fill="#E8B547"/>
          <rect x="18" y="5" width="6" height="22" rx="3" fill="#E8B547" transform="rotate(-10 18 5)"/>
          <rect x="27" y="2" width="6" height="22" rx="3" fill="#E8B547"/>
          <rect x="36" y="5" width="6" height="22" rx="3" fill="#E8B547" transform="rotate(10 36 5)"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gold/80 text-xs md:text-sm tracking-[0.3em] uppercase font-dm-sans mb-6"
        >
          EST. 2005 · Wymondham, Norfolk
        </motion.p>

        <h1 className="font-fraunces text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[0.95] tracking-tight mb-8 flex flex-wrap justify-center gap-x-[0.22em]">
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 48, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {GOLD_WORDS.has(word) ? <span className="text-gold">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/60 text-lg md:text-xl font-dm-sans leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Freshly fried. Locally sourced. Serving Wymondham since 2005.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/menu"
            className="bg-gold text-navy px-8 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy transition-all duration-200 shadow-[0_0_32px_rgba(232,181,71,0.3)]"
          >
            View Menu
          </Link>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 border border-cream/30 text-cream px-8 py-4 rounded-full font-semibold text-base hover:border-cream/60 hover:bg-cream/5 active:scale-95 focus-visible:ring-2 focus-visible:ring-cream transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            Call to Order — {PHONE}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-dm-sans">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
