import type { Metadata } from "next"
import OpeningPreview from "@/components/sections/OpeningPreview"

export const metadata: Metadata = {
  title: "Opening Times & Contact",
  description: "Big Fry Wymondham opening hours and contact information. Call 01953 603210.",
}

export default function OpeningTimesPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Visit Us</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Opening Times</h1>
          <p className="text-cream/50 font-dm-sans">Six days a week, fresh from open to close.</p>
        </div>
      </div>
      <OpeningPreview />
    </div>
  )
}
