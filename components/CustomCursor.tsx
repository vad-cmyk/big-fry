"use client"
import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    document.documentElement.classList.add("has-custom-cursor")

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mx = -100, my = -100, rx = -100, ry = -100
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      raf = requestAnimationFrame(tick)
    }

    const grow = () => ring.classList.add("scale-[2.2]")
    const shrink = () => ring.classList.remove("scale-[2.2]")

    document.addEventListener("mousemove", onMove)
    document.querySelectorAll("a,button,[data-cursor-grow]").forEach((el) => {
      el.addEventListener("mouseenter", grow)
      el.addEventListener("mouseleave", shrink)
    })

    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[99998]" style={{ willChange: "transform" }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[99997] transition-transform duration-300" style={{ willChange: "transform" }} />
    </>
  )
}
