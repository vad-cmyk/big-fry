import type { Metadata } from "next"
import MenuSection from "@/components/ui/MenuSection"
import {
  MENU_CHIPS, MENU_CHICKEN, MENU_PIES, MENU_BURGERS,
  MENU_OTHERS, MENU_EXTRAS, MENU_DRINKS,
  MENU_FISH, MENU_FISH_SIZES, MENU_FISH_EXTRAS,
} from "@/lib/constants"

export const metadata: Metadata = {
  title: "Menu",
  description: "Full menu for Big Fry Wymondham — fish, chips, chicken, pies, burgers and more. Fresh every day.",
}

const ANCHORS = [
  { id: "chips", label: "Chips" }, { id: "fish", label: "Fish" },
  { id: "chicken", label: "Chicken" }, { id: "pies", label: "Pies" },
  { id: "burgers", label: "Burgers" }, { id: "others", label: "Others" },
  { id: "extras", label: "Extras" }, { id: "drinks", label: "Drinks" },
]

export default function MenuPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Header */}
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Big Fry Wymondham</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Our Menu</h1>
          <p className="text-cream/50 font-dm-sans">Fresh deliveries daily. Cooked to order, every time.</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gold/15 border-y border-gold/30 py-3 px-6 text-center">
        <p className="text-navy text-sm font-dm-sans font-medium">
          All food fried in beef dripping. Prices subject to change.
        </p>
      </div>

      {/* Sticky anchor nav */}
      <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-sm border-b border-navy/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2 min-w-max">
            {ANCHORS.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="px-4 py-2 rounded-full text-sm font-dm-sans text-navy/60 hover:text-navy hover:bg-navy/8 transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-gold">
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <MenuSection id="chips" title="Chips" note="Freshly prepared daily on the premises" items={MENU_CHIPS} />

        {/* Fish — table layout */}
        <section id="fish" className="py-12 border-b border-navy/10">
          <h2 className="font-fraunces text-3xl text-navy mb-2 tracking-tight">Fish</h2>
          <p className="text-charcoal/50 text-sm mb-6 italic">Regular fresh fish deliveries</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-dm-sans">
              <thead>
                <tr className="border-b border-navy/15">
                  <th className="text-left py-3 text-navy/50 font-medium">Item</th>
                  {MENU_FISH_SIZES.map((s) => (
                    <th key={s} className="text-right py-3 px-2 text-navy/50 font-medium">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {MENU_FISH.map((fish) => (
                  <tr key={fish.name} className="hover:bg-navy/3 transition-colors">
                    <td className="py-3.5 text-charcoal font-medium">{fish.name}</td>
                    {fish.prices.map((p, j) => (
                      <td key={j} className="py-3.5 px-2 text-right text-navy font-semibold tabular-nums">{p}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 divide-y divide-navy/8">
            {MENU_FISH_EXTRAS.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-3.5">
                <span className="text-charcoal font-dm-sans">{item.name}</span>
                <span className="text-navy font-semibold font-dm-sans">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        <MenuSection id="chicken" title="Chicken" note="Freshly cooked to order" items={MENU_CHICKEN} />
        <MenuSection id="pies" title="Pies" note="Pukka pies baked on the premises throughout the day" items={MENU_PIES} />
        <MenuSection id="burgers" title="Burgers" items={MENU_BURGERS} />
        <MenuSection id="others" title="Others" items={MENU_OTHERS} />
        <MenuSection id="extras" title="Extras" items={MENU_EXTRAS} />
        <MenuSection id="drinks" title="Drinks" items={MENU_DRINKS} />
      </div>
    </div>
  )
}
