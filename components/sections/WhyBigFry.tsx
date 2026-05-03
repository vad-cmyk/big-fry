"use client"
import { motion } from "framer-motion"
import { Flame, Leaf, Heart } from "lucide-react"

const CARDS = [
  {
    icon: Flame,
    title: "Freshly Fried All Day",
    body: "Cooked fresh from open to close, every day. No lamps, no holding — just hot, crispy perfection the moment you order.",
    accent: "from-gold/20 to-gold/5",
  },
  {
    icon: Leaf,
    title: "Local & Sustainable",
    body: "Bread rolls from the bakery right next door, 100% environmentally friendly packaging. Good food, good values.",
    accent: "from-navy/10 to-navy/5",
  },
  {
    icon: Heart,
    title: "Loved For Miles Around",
    body: "The area's most renowned chippy since 2005. Customers drive from across Norfolk — because some things are worth the journey.",
    accent: "from-gold/15 to-cream",
  },
]

export default function WhyBigFry() {
  return (
    <section className="bg-navy py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(232,181,71,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold/70 text-xs tracking-[0.25em] uppercase font-dm-sans mb-4"
          >
            Why Big Fry
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-fraunces text-4xl md:text-5xl text-cream tracking-tight"
          >
            What Makes Us Different
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-fraunces text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-cream/50 leading-relaxed text-sm font-dm-sans">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
