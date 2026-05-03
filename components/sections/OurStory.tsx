"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import CounterAnimation from "@/components/ui/CounterAnimation"
import AnimatedHeading from "@/components/ui/AnimatedHeading"
import { UNSPLASH_IMAGES } from "@/lib/constants"

const GALLERY = [
  { src: UNSPLASH_IMAGES.chips1, alt: "Big Fry chips fresh from the fryer",  aspect: "aspect-[3/4]" },
  { src: UNSPLASH_IMAGES.fish1,  alt: "Real Big Fry meal — fish, chips, pie", aspect: "aspect-square mt-8" },
  { src: UNSPLASH_IMAGES.shop1,  alt: "Big Fry shop counter, Wymondham",      aspect: "aspect-square" },
  { src: UNSPLASH_IMAGES.team1,  alt: "Fish and chips on parchment paper",    aspect: "aspect-[3/4] mt-8" },
]

const STATS = [
  { value: 20, suffix: "+", label: "Years of mastery" },
  { value: 6,  suffix: "",  label: "Days a week, fresh" },
  { value: 1,  suffix: "",  label: "Bakery next door" },
]

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl ${img.aspect}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Sticky text */}
          <motion.div style={{ y }} className="md:sticky md:top-28 flex flex-col gap-8">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Our Story</p>

            <AnimatedHeading
              text="Two Decades of Fryer Mastery"
              tag="h2"
              className="font-fraunces text-4xl md:text-5xl text-navy leading-[1.1] tracking-tight"
            />

            <p className="text-charcoal/70 leading-[1.8] text-base md:text-lg font-dm-sans">
              Big Fry opened its doors in 2005 in the heart of the historic market town of Wymondham.
              Twenty years on, we're still cooking fresh six days a week — still getting our bread rolls
              from the bakery right next door, still drawing in customers from miles around. Some things
              are worth keeping the same.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-navy/10">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-fraunces text-3xl md:text-4xl text-navy font-bold">
                    <CounterAnimation target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-charcoal/50 text-xs mt-1 font-dm-sans">{s.label}</div>
                </div>
              ))}
            </div>

            {/* EST badge */}
            <div className="inline-flex items-center gap-3 bg-navy/5 rounded-full px-5 py-3 w-fit">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy text-xs font-bold">★</span>
              </div>
              <span className="text-navy/70 text-sm font-dm-sans">
                Serving Wymondham since <strong className="text-navy">2005</strong>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
