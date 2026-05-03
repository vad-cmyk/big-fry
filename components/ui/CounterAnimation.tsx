"use client"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface Props {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function CounterAnimation({ target, suffix = "", prefix = "", duration = 1800 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return
    let start: number
    const step = (ts: number) => {
      if (!start) start = ts
      const prog = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - prog, 3)
      setCount(Math.floor(eased * target))
      if (prog < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}
