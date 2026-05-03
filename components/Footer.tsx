import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"
import { PHONE, PHONE_HREF, ADDRESS, NAV_LINKS } from "@/lib/constants"
import { HOURS } from "@/lib/utils"

const DAY_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

export default function Footer() {
  return (
    <footer className="bg-navy text-cream relative overflow-hidden">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12rem] font-fraunces text-white/[0.02] font-bold tracking-tighter leading-none">
          2005
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image src="/logo.png" alt="Big Fry" width={160} height={55} className="h-12 w-auto rounded" />
            <p className="text-gold/60 text-xs tracking-[0.25em] uppercase font-dm-sans">
              EST. 2005 · Wymondham, Norfolk
            </p>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Two decades of fryer mastery. Still cooking fresh. Still the area's most loved chippy.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {/* TODO: Owner to add real social media links */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-dm-sans mb-5">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/60 hover:text-gold transition-colors text-sm focus-visible:text-gold focus-visible:outline-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-dm-sans mb-5">Find Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-cream/60">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a href={PHONE_HREF} className="hover:text-gold transition-colors focus-visible:text-gold focus-visible:outline-none">{PHONE}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-xs">
                  {DAY_ORDER.map((day) => {
                    const s = HOURS[day]
                    return (
                      <div key={day} className="flex gap-2">
                        <span className="w-10 shrink-0">{day.slice(0,3)}</span>
                        <span>{"closed" in s ? "Closed" : s.periods.map(p => `${p.open}–${p.close}`).join(", ")}</span>
                      </div>
                    )
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/30 font-dm-sans">
          <span>© {new Date().getFullYear()} Big Fry Wymondham. All rights reserved.</span>
          <span>All food fried in beef dripping. Prices subject to change.</span>
        </div>
      </div>
    </footer>
  )
}
