"use client"
import { motion } from "framer-motion"

interface MenuItem { name: string; price: string }
interface Props { id: string; title: string; items: MenuItem[]; note?: string }

export default function MenuSection({ id, title, items, note }: Props) {
  return (
    <section id={id} className="py-12 border-b border-navy/10 last:border-0">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-fraunces text-3xl text-navy mb-2 tracking-tight"
      >
        {title}
      </motion.h2>
      {note && <p className="text-charcoal/50 text-sm mb-6 italic">{note}</p>}
      <div className="divide-y divide-navy/8">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between py-3.5 group"
          >
            <span className="text-charcoal font-dm-sans group-hover:text-navy transition-colors duration-200">{item.name}</span>
            <span className="text-navy font-semibold font-dm-sans tabular-nums">{item.price}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
