"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone } from "lucide-react"
import { PHONE_HREF, PHONE } from "@/lib/constants"

export default function Parties() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{ backgroundImage: "url('/1777840433658-droxw2er2o6.jpg')", y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gold/70 text-xs tracking-[0.25em] uppercase font-dm-sans mb-6"
        >
          Parties & Big Orders
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-fraunces text-5xl md:text-6xl text-cream leading-[1.0] tracking-tight mb-8"
        >
          From 50 to 200 Meals —<br />
          <span className="text-gold">We've Got You</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/60 text-lg leading-relaxed font-dm-sans mb-10 max-w-xl mx-auto"
        >
          Two decades of experience handling big orders for parties, quizzes, and events.
          High-quality insulated packaging keeps every meal piping hot. Free condiments and
          a bottle of drink thrown in. Delivery available. Call a few weeks ahead and we'll
          make it happen.
        </motion.p>

        <motion.a
          href={PHONE_HREF}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="inline-flex items-center gap-2.5 bg-gold text-navy px-8 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200 shadow-[0_0_32px_rgba(232,181,71,0.25)]"
        >
          <Phone className="w-4 h-4" />
          Plan Your Event — {PHONE}
        </motion.a>
      </div>
    </section>
  )
}
