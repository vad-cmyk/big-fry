"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/constants"

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-navy/95 backdrop-blur-sm border-b border-gold/20 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <Image
              src="/logo.png"
              alt="Big Fry Wymondham"
              width={130}
              height={45}
              className="h-10 w-auto rounded"
              priority
            />
            <span className="text-gold/70 text-[9px] tracking-[0.25em] font-dm-sans uppercase mt-0.5">
              EST. 2005
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 hover:text-gold text-sm font-dm-sans tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href={PHONE_HREF}
            className="hidden md:flex items-center gap-2 bg-gold text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-gold/90 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE}
          </a>

          <button
            className="md:hidden text-cream p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 bg-navy z-[60] flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-cream/70 p-2 hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={link.href}
                    className="text-cream text-4xl font-fraunces hover:text-gold transition-colors duration-200 focus-visible:text-gold focus-visible:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={PHONE_HREF}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: NAV_LINKS.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center gap-2.5 bg-gold text-navy px-7 py-3.5 rounded-full font-semibold text-lg hover:bg-gold/90 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
