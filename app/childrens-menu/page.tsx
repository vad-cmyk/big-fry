import type { Metadata } from "next"
import { CHILDRENS_MENU } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Children's Menu",
  description: "Big Fry Wymondham children's menu — great value kids' meals including fish & chips, sausage, chicken nuggets and more.",
}

const DOTS = ["#E8B547", "#0A1F3D", "#E8B547", "#0A1F3D", "#E8B547", "#0A1F3D", "#E8B547"]

export default function ChildrensMenuPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">For The Little Ones</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Children's Menu</h1>
          <p className="text-cream/50 font-dm-sans">Great value kids' meals, freshly cooked.</p>
        </div>
      </div>

      <div className="bg-gold/15 border-y border-gold/30 py-3 px-6 text-center">
        <p className="text-navy text-sm font-dm-sans font-medium">All food fried in beef dripping. Prices subject to change.</p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="divide-y divide-navy/10">
          {CHILDRENS_MENU.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between py-5 group">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: DOTS[i] }} />
                <span className="font-dm-sans text-charcoal group-hover:text-navy transition-colors text-lg">{item.name}</span>
              </div>
              <span className="font-fraunces text-2xl text-navy font-bold tabular-nums">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-navy/5 rounded-2xl p-6 text-center">
          <p className="text-navy/70 text-sm font-dm-sans leading-relaxed">
            All children's meals include chips. For allergies or dietary requirements, please ask a member of staff.
          </p>
        </div>
      </div>
    </div>
  )
}
