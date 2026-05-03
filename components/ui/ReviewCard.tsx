import { Star } from "lucide-react"

interface Props {
  name: string
  rating: number
  text: string
  date: string
  className?: string
}

export default function ReviewCard({ name, rating, text, date, className = "" }: Props) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(10,31,61,0.08)] border border-navy/5 hover:shadow-[0_8px_40px_rgba(10,31,61,0.13)] transition-shadow duration-300 ${className}`}>
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="text-charcoal/80 text-sm leading-relaxed mb-4">"{text}"</p>
      <div className="flex items-center justify-between">
        <span className="text-navy font-semibold text-sm font-dm-sans">{name}</span>
        <span className="text-charcoal/40 text-xs">{date}</span>
      </div>
    </div>
  )
}
