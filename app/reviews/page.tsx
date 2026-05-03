"use client"
import { useState } from "react"
import ReviewCard from "@/components/ui/ReviewCard"
import { PLACEHOLDER_REVIEWS } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"

// TODO: Wire up form to a backend service (e.g. Resend, Supabase, or Formspree) before going live

export default function ReviewsPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", review: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // TODO: Replace with real API call
    console.log("Review submitted:", form)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#E8B547", "#0A1F3D", "#FDF6E3"] })
  }

  return (
    <div className="bg-cream min-h-screen pt-20">
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Our Customers</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Reviews</h1>
          <p className="text-cream/50 font-dm-sans">What Norfolk says about Big Fry.</p>
          {/* TODO: Owner to replace placeholder reviews with real customer reviews */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-20" style={{ columnGap: "1.5rem" }}>
          {PLACEHOLDER_REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 break-inside-avoid"
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>

        {/* Submission form */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-4xl text-navy tracking-tight mb-3">Share Your Experience</h2>
            <p className="text-charcoal/60 font-dm-sans">Had a great meal? We'd love to hear about it.</p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 text-center shadow-[0_4px_40px_rgba(10,31,61,0.08)] border border-navy/5"
              >
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-fraunces text-2xl text-navy mb-2">Thank You!</h3>
                <p className="text-charcoal/60 font-dm-sans">Your review means a lot to us. See you next time!</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-[0_4px_40px_rgba(10,31,61,0.08)] border border-navy/5 flex flex-col gap-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-navy font-dm-sans">Name *</label>
                    <input
                      id="name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm font-semibold text-navy font-dm-sans">Visit Date</label>
                    <input
                      id="date" type="month" value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-navy font-dm-sans">Email *</label>
                  <input
                    id="email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="review" className="text-sm font-semibold text-navy font-dm-sans">Your Review *</label>
                  <textarea
                    id="review" required rows={4} value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow resize-none"
                    placeholder="Tell us about your visit..."
                  />
                </div>
                <button
                  type="submit" disabled={submitting}
                  className="flex items-center justify-center gap-2.5 bg-gold text-navy px-7 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200 disabled:opacity-60 mt-2"
                >
                  {submitting
                    ? <span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    : <><Send className="w-4 h-4" /> Submit Review</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
