import ReviewCard from "@/components/ui/ReviewCard"
import AnimatedHeading from "@/components/ui/AnimatedHeading"
import { PLACEHOLDER_REVIEWS } from "@/lib/constants"

export default function ReviewsMarquee() {
  const doubled = [...PLACEHOLDER_REVIEWS, ...PLACEHOLDER_REVIEWS]

  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans mb-4">What People Say</p>
        <AnimatedHeading
          text="Loved Across Norfolk"
          className="font-fraunces text-4xl md:text-5xl text-navy tracking-tight"
        />
        {/* TODO: Owner to replace placeholder reviews with real customer reviews */}
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-5" style={{ width: "max-content" }}>
          {doubled.map((review, i) => (
            <ReviewCard key={i} {...review} className="w-72 shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}
