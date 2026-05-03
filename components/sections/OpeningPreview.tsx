"use client"
import { motion } from "framer-motion"
import { Phone, Clock, MapPin } from "lucide-react"
import { HOURS, isOpenNow } from "@/lib/utils"
import { PHONE, PHONE_HREF, ADDRESS } from "@/lib/constants"

const DAY_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

export default function OpeningPreview() {
  const open = isOpenNow()

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-gold" />
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Opening Times</p>
            </div>
            <h2 className="font-fraunces text-4xl text-navy mb-4 tracking-tight">When To Find Us</h2>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-dm-sans font-semibold mb-8 ${open ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
              {open ? "Open Now" : "Currently Closed"}
            </div>

            <div className="divide-y divide-navy/8">
              {DAY_ORDER.map((day) => {
                const s = HOURS[day]
                const closed = "closed" in s
                return (
                  <div key={day} className="flex items-start justify-between py-3">
                    <span className="font-dm-sans text-navy/70 text-sm w-28 shrink-0">{day}</span>
                    {closed
                      ? <span className="text-charcoal/40 text-sm">Closed</span>
                      : <div className="text-right text-sm text-charcoal/70 font-dm-sans">
                          {s.periods.map((p, i) => <div key={i}>{p.open} – {p.close}</div>)}
                        </div>
                    }
                  </div>
                )
              })}
            </div>

            <a
              href={PHONE_HREF}
              className="mt-8 flex items-center justify-center gap-2.5 bg-gold text-navy px-7 py-4 rounded-full font-semibold text-lg hover:bg-gold/90 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold w-full shadow-[0_4px_24px_rgba(232,181,71,0.3)]"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-gold" />
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Find Us</p>
            </div>
            <h2 className="font-fraunces text-4xl text-navy mb-2 tracking-tight">Come Visit Us</h2>
            <p className="text-charcoal/60 text-sm font-dm-sans mb-4">{ADDRESS}</p>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5 border border-navy/10">
              <iframe
                title="Big Fry location map"
                src="https://maps.google.com/maps?q=Wymondham,+Norfolk,+NR18&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
