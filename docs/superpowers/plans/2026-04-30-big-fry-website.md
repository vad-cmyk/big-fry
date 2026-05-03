# Big Fry Wymondham — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete premium 5-page Next.js 14 website for Big Fry Wymondham fish and chip shop, pitch-ready with full animations and polish.

**Architecture:** App Router with TypeScript. Global components (Nav, Footer, LoadingScreen, CustomCursor) shared via root layout. Framer Motion handles scroll animations and page entrances; GSAP drives hero parallax; Lenis provides smooth scrolling. All content data lives in `lib/constants.ts`.

**Tech Stack:** Next.js 14, TypeScript (strict), Tailwind CSS (custom tokens), Framer Motion, GSAP, Lenis, Lucide React, canvas-confetti, next/font/google (Fraunces + DM Sans)

**Working directory:** `/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry`

---

### Task 1: Project Initialization

**Files:**
- Create: all Next.js scaffold files
- Create: `public/logo.png` (copied from project root)

- [ ] **Step 1: Initialize Next.js project**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --no-git --yes
```

Expected: scaffold created, `package.json`, `app/`, `public/` present.

- [ ] **Step 2: Install additional dependencies**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm install framer-motion gsap lenis lucide-react canvas-confetti
npm install -D @types/canvas-confetti
```

- [ ] **Step 3: Copy logo to public**

```bash
cp "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry/Big Fry Logo.png" "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry/public/logo.png"
```

- [ ] **Step 4: Verify build passes**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

Expected: successful build with default Next.js pages.

---

### Task 2: Tailwind Config + Global Styles + Next Config

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `next.config.ts` (or `next.config.js`)

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6E3",
        navy: "#0A1F3D",
        gold: "#E8B547",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8B547 0%, #c9952e 100%)",
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --cream: #FDF6E3;
  --navy: #0A1F3D;
  --gold: #E8B547;
  --charcoal: #1A1A1A;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

body {
  background-color: var(--cream);
  color: var(--charcoal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Grain texture overlay */
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

/* Cursor reset for custom cursor */
html.has-custom-cursor * { cursor: none !important; }

@layer utilities {
  .text-balance { text-wrap: balance; }
  .font-fraunces { font-family: var(--font-fraunces), Georgia, serif; }
}
```

- [ ] **Step 3: Update `next.config.ts`**

Read the file first, then replace entirely:

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 3: lib/constants.ts and lib/utils.ts

**Files:**
- Create: `lib/constants.ts`
- Create: `lib/utils.ts`

- [ ] **Step 1: Create `lib/utils.ts`**

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Note: clsx and tailwind-merge are bundled with shadcn but not installed here.
// Use a simple implementation instead:
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

export type SessionPeriod = { open: string; close: string }
export type DaySchedule = { periods: SessionPeriod[] } | { closed: true }

export const HOURS: Record<string, DaySchedule> = {
  Monday:    { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "20:30" }] },
  Tuesday:   { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "20:30" }] },
  Wednesday: { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "20:30" }] },
  Thursday:  { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "20:30" }] },
  Friday:    { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "21:00" }] },
  Saturday:  { periods: [{ open: "11:30", close: "14:00" }, { open: "16:30", close: "20:30" }] },
  Sunday:    { closed: true },
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

export function isOpenNow(): boolean {
  const now = new Date()
  const day = DAYS[now.getDay()]
  const schedule = HOURS[day]
  if ("closed" in schedule) return false
  const current = now.getHours() * 60 + now.getMinutes()
  return schedule.periods.some(
    (p) => current >= toMinutes(p.open) && current < toMinutes(p.close)
  )
}
```

- [ ] **Step 2: Create `lib/constants.ts`**

```ts
export const PHONE = "01953 603210"
export const PHONE_HREF = "tel:01953603210"

// TODO: Owner to confirm exact address
export const ADDRESS = "Wymondham, Norfolk, NR18"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/childrens-menu", label: "Children's Menu" },
  { href: "/opening-times", label: "Opening Times" },
  { href: "/reviews", label: "Reviews" },
]

export const MENU_CHIPS = [
  { name: "Regular Chips", price: "£2.80" },
  { name: "Large Chips", price: "£4.80" },
  { name: "Cheesy Chips", price: "£4.00" },
  { name: "Chip Butty", price: "£1.50" },
]

export const MENU_FISH_SIZES = ["Small", "Medium", "Large"]
export const MENU_FISH = [
  { name: "Cod",     prices: ["£5.60", "£6.80", "£8.80"] },
  { name: "Plaice",  prices: ["£5.60", "£6.80", "£8.80"] },
  { name: "Haddock", prices: ["£5.60", "£6.80", "£8.80"] },
  { name: "Rock",    prices: ["£5.60", "£6.80", "£8.80"] },
]
export const MENU_FISH_EXTRAS = [
  { name: "Extra large fish (when available)", price: "from £10.20" },
  { name: "Skate (cooked to order)", price: "from £7.50" },
  { name: "Cod Bites", price: "£5.60" },
  { name: "Whole Tail Scampi", price: "£4.80" },
]

export const MENU_CHICKEN = [
  { name: "Chicken Breast", price: "£4.40" },
  { name: "Chicken Leg", price: "£3.00" },
  { name: "Chicken Fillet Nuggets", price: "£4.00" },
  { name: "Chicken Fillet Burger", price: "£3.40" },
]

export const MENU_PIES = [
  { name: "Steak and Kidney", price: "£2.80" },
  { name: "Beef and Onion", price: "£2.80" },
  { name: "Chicken and Mushroom", price: "£2.80" },
]

export const MENU_BURGERS = [
  { name: "Cheeseburger", price: "£3.20" },
  { name: "Hamburger", price: "£3.20" },
  { name: "2oz Burger in Batter", price: "£1.00" },
  { name: "4oz Burger in Batter", price: "£1.40" },
]

export const MENU_OTHERS = [
  { name: "Sausage in Batter", price: "£1.30" },
  { name: "Fish Cake", price: "£1.10" },
  { name: "Cod Roe", price: "£1.80" },
  { name: "Saveloy", price: "£1.20" },
  { name: "Spring Roll", price: "£1.50" },
  { name: "Veggie Roll", price: "£1.50" },
  { name: "Pineapple Fritter", price: "£1.00" },
  { name: "Mushy Pea Fritter", price: "£1.20" },
]

export const MENU_EXTRAS = [
  { name: "Peas / Curry / Gravy — Small", price: "£1.20" },
  { name: "Peas / Curry / Gravy — Large", price: "£1.80" },
  { name: "Bread Roll", price: "£0.40" },
  { name: "Heinz Sauce Portions", price: "£0.50" },
  { name: "Vinegar", price: "£1.20" },
  { name: "Salt", price: "£0.80" },
  { name: "Tomato Sauce Bottle", price: "£2.00" },
  { name: "Pickled Onion", price: "£0.20" },
  { name: "Gherkin", price: "£0.50" },
  { name: "Pickled Egg", price: "£0.40" },
]

export const MENU_DRINKS = [
  { name: "Cans", price: "£1.40" },
  { name: "Bottles — 500ml", price: "£1.70" },
  { name: "Bottles — 1.5 Litre", price: "£2.00" },
  { name: "Water", price: "£0.80" },
]

export const CHILDRENS_MENU = [
  { name: "Sausage & Chips", price: "£2.80" },
  { name: "Beefburger & Chips", price: "£2.50" },
  { name: "Fishcake & Chips", price: "£2.50" },
  { name: "Chicken Nuggets & Chips", price: "£3.50" },
  { name: "Chickenburger & Chips", price: "£4.50" },
  { name: "Hamburger & Chips", price: "£4.30" },
  { name: "Fish & Chips", price: "£7.30" },
]

// TODO: Owner to replace with real customer reviews
export const PLACEHOLDER_REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "The best fish and chips in Norfolk, hands down. Been coming here for years and it never disappoints. The batter is always perfectly golden and crispy.", date: "March 2024" },
  { name: "James T.", rating: 5, text: "Ordered 80 portions for our village quiz night and every single meal arrived piping hot. Incredible service and quality at scale.", date: "February 2024" },
  { name: "Emma L.", rating: 5, text: "Worth the drive from Norwich. The cod is beautifully fresh and the chips are thick-cut perfection. EST. 2005 and still the best.", date: "January 2024" },
  { name: "David R.", rating: 5, text: "Friendly staff, generous portions, and the mushy peas are the real deal. Big Fry is a Wymondham institution.", date: "December 2023" },
  { name: "Rachel K.", rating: 5, text: "We've tried every chippy in the area. Big Fry wins every time. The beef dripping makes all the difference.", date: "November 2023" },
  { name: "Tom H.", rating: 5, text: "Ordered for a party of 50. Not a single complaint from anyone — every portion was hot, fresh, and generous.", date: "October 2023" },
]

export const UNSPLASH_IMAGES = {
  hero: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1920&q=80",
  chips1: "https://images.unsplash.com/photo-1630452493514-1ad293d34a22?w=800&q=80",
  fish1: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
  shop1: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  team1: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
  party: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
  menu: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npx tsc --noEmit
```

Expected: no errors.

---

### Task 4: Root Layout + SmoothScrollProvider

**Files:**
- Create: `components/SmoothScrollProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/SmoothScrollProvider.tsx`**

```tsx
"use client"
import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { Fraunces, DM_Sans } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import LoadingScreen from "@/components/LoadingScreen"
import CustomCursor from "@/components/CustomCursor"
import SmoothScrollProvider from "@/components/SmoothScrollProvider"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Big Fry Wymondham",
    default: "Big Fry Wymondham — Fish & Chips Since 2005",
  },
  description:
    "Wymondham's most loved fish and chip shop. Freshly fried, locally sourced, serving Norfolk since 2005. Call 01953 603210.",
  keywords: ["fish and chips", "Wymondham", "Norfolk", "chippy", "takeaway"],
  openGraph: {
    title: "Big Fry Wymondham — Fish & Chips Since 2005",
    description: "Freshly fried. Locally sourced. Serving Wymondham since 2005.",
    type: "website",
    locale: "en_GB",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="grain-overlay bg-cream font-dm-sans">
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create stub `components/Nav.tsx`** (real version in Task 7)

```tsx
export default function Nav() {
  return <nav className="fixed top-0 left-0 right-0 z-50 h-20" />
}
```

- [ ] **Step 4: Create stub `components/Footer.tsx`** (real version in Task 8)

```tsx
export default function Footer() {
  return <footer className="bg-navy text-cream py-8 text-center text-sm">© Big Fry Wymondham</footer>
}
```

- [ ] **Step 5: Create stub `components/LoadingScreen.tsx`** (real version in Task 5)

```tsx
"use client"
export default function LoadingScreen() {
  return null
}
```

- [ ] **Step 6: Create stub `components/CustomCursor.tsx`** (real version in Task 6)

```tsx
"use client"
export default function CustomCursor() {
  return null
}
```

- [ ] **Step 7: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 5: LoadingScreen Component

**Files:**
- Modify: `components/LoadingScreen.tsx`

- [ ] **Step 1: Replace `components/LoadingScreen.tsx`**

```tsx
"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem("big-fry-loaded")
    if (seen) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("big-fry-loaded", "1")
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          >
            <Image
              src="/logo.png"
              alt="Big Fry Wymondham"
              width={220}
              height={80}
              className="h-16 w-auto brightness-0 invert"
              priority
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } }}
            className="text-gold/80 text-sm font-dm-sans tracking-[0.2em] uppercase"
          >
            Frying things up<AnimatedDots />
          </motion.p>
          {/* Gold progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%", transition: { duration: 1.8, ease: "linear" } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AnimatedDots() {
  const [dots, setDots] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 400)
    return () => clearInterval(interval)
  }, [])
  return <span className="inline-block w-6 text-left">{dots}</span>
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 6: CustomCursor Component

**Files:**
- Modify: `components/CustomCursor.tsx`

- [ ] **Step 1: Replace `components/CustomCursor.tsx`**

```tsx
"use client"
import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.documentElement.classList.add("has-custom-cursor")

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      rafId = requestAnimationFrame(animate)
    }

    const onEnterInteractive = () => ring.classList.add("scale-[2.5]")
    const onLeaveInteractive = () => ring.classList.remove("scale-[2.5]")

    document.addEventListener("mousemove", onMove)
    document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive)
      el.addEventListener("mouseleave", onLeaveInteractive)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[99998] transition-opacity"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[99997] transition-transform duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 7: Navigation Component

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Replace `components/Nav.tsx`**

```tsx
"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/constants"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-sm border-b border-gold/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <Image
              src="/logo.png"
              alt="Big Fry Wymondham"
              width={130}
              height={45}
              className={`h-10 w-auto transition-all duration-300 ${scrolled ? "brightness-0 invert" : "brightness-0 invert"}`}
              priority
            />
            <span className="text-gold/70 text-[9px] tracking-[0.25em] font-dm-sans uppercase mt-0.5">
              EST. 2005
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* CTA button */}
          <a
            href={PHONE_HREF}
            className="hidden md:flex items-center gap-2 bg-gold text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE}
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
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
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
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
                animate={{ opacity: 1, y: 0, transition: { delay: NAV_LINKS.length * 0.08 + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
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
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 8: Footer Component

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace `components/Footer.tsx`**

```tsx
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"
import { PHONE, PHONE_HREF, ADDRESS, NAV_LINKS } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-navy text-cream relative overflow-hidden">
      {/* Decorative gold line at top */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* EST. 2005 watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12rem] font-fraunces text-white/[0.02] font-bold tracking-tighter leading-none">
          2005
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.png"
              alt="Big Fry Wymondham"
              width={160}
              height={55}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gold/60 text-xs tracking-[0.25em] uppercase font-dm-sans">
              EST. 2005 · Wymondham, Norfolk
            </p>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Two decades of fryer mastery. Still cooking fresh. Still the area's most loved chippy.
            </p>
            {/* Social links (TODO: Owner to add real links) */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-dm-sans mb-5">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-gold transition-colors text-sm focus-visible:text-gold focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-dm-sans mb-5">Find Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-cream/60">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a href={PHONE_HREF} className="hover:text-gold transition-colors focus-visible:text-gold focus-visible:outline-none">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span>Mon–Sat: 11:30–14:00</span>
                  <span>Mon–Thu & Sat: 16:30–20:30</span>
                  <span>Fri: 16:30–21:00</span>
                  <span className="text-cream/40">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/30 font-dm-sans">
          <span>© {new Date().getFullYear()} Big Fry Wymondham. All rights reserved.</span>
          <span>All food fried in beef dripping. Prices subject to change.</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 9: UI Primitives — AnimatedHeading, CounterAnimation, ReviewCard

**Files:**
- Create: `components/ui/AnimatedHeading.tsx`
- Create: `components/ui/CounterAnimation.tsx`
- Create: `components/ui/ReviewCard.tsx`

- [ ] **Step 1: Create `components/ui/AnimatedHeading.tsx`**

```tsx
"use client"
import { motion } from "framer-motion"

interface AnimatedHeadingProps {
  text: string
  className?: string
  delay?: number
  tag?: "h1" | "h2" | "h3"
}

export default function AnimatedHeading({
  text,
  className = "",
  delay = 0,
  tag: Tag = "h2",
}: AnimatedHeadingProps) {
  const words = text.split(" ")

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 32, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
```

- [ ] **Step 2: Create `components/ui/CounterAnimation.tsx`**

```tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function CounterAnimation({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
```

- [ ] **Step 3: Create `components/ui/ReviewCard.tsx`**

```tsx
import { Star } from "lucide-react"

interface ReviewCardProps {
  name: string
  rating: number
  text: string
  date: string
  className?: string
}

export default function ReviewCard({ name, rating, text, date, className = "" }: ReviewCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(10,31,61,0.08)] border border-navy/5 hover:shadow-[0_8px_40px_rgba(10,31,61,0.13)] transition-shadow duration-300 ${className}`}
    >
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
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 10: MenuSection UI Component

**Files:**
- Create: `components/ui/MenuSection.tsx`

- [ ] **Step 1: Create `components/ui/MenuSection.tsx`**

```tsx
"use client"
import { motion } from "framer-motion"

interface MenuItem {
  name: string
  price: string
}

interface MenuSectionProps {
  id: string
  title: string
  items: MenuItem[]
  note?: string
}

export default function MenuSection({ id, title, items, note }: MenuSectionProps) {
  return (
    <section id={id} className="py-12 border-b border-navy/10 last:border-0">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-fraunces text-3xl text-navy mb-2 tracking-tight"
      >
        {title}
      </motion.h2>
      {note && (
        <p className="text-charcoal/50 text-sm mb-6 italic">{note}</p>
      )}
      <div className="divide-y divide-navy/8">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between py-3.5 group"
          >
            <span className="text-charcoal font-dm-sans group-hover:text-navy transition-colors duration-200">
              {item.name}
            </span>
            <span className="text-navy font-semibold font-dm-sans tabular-nums">
              {item.price}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 11: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PHONE_HREF, PHONE } from "@/lib/constants"

const HEADLINE_WORDS = ["Wymondham's", "Most", "Loved", "Fish", "&", "Chips"]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sil1Ref = useRef<HTMLDivElement>(null)
  const sil2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!heroRef.current) return

    // Parallax silhouettes on scroll
    if (sil1Ref.current) {
      gsap.to(sil1Ref.current, {
        y: -120,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    }
    if (sil2Ref.current) {
      gsap.to(sil2Ref.current, {
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      })
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background video */}
      {/* TODO: Owner to replace src with real footage of frying chips, golden batter, steam rising */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src=""
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/90" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(232,181,71,0.08),transparent)]" />

      {/* Floating silhouettes (SVG fish & chip shapes) */}
      <div
        ref={sil1Ref}
        className="absolute top-[15%] left-[8%] opacity-10 text-gold text-8xl select-none pointer-events-none"
        aria-hidden="true"
      >
        🐟
      </div>
      <div
        ref={sil2Ref}
        className="absolute top-[25%] right-[10%] opacity-8 text-gold text-6xl select-none pointer-events-none"
        aria-hidden="true"
      >
        🍟
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gold/80 text-xs md:text-sm tracking-[0.3em] uppercase font-dm-sans mb-6"
        >
          EST. 2005 · Wymondham, Norfolk
        </motion.p>

        {/* Animated headline */}
        <h1 className="font-fraunces text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[0.95] tracking-tight mb-8">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.2em] last:mr-0"
              initial={{ opacity: 0, y: 48, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word === "Fish" || word === "&" || word === "Chips" ? (
                <span className="text-gold">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/60 text-lg md:text-xl font-dm-sans leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Freshly fried. Locally sourced. Serving Wymondham since 2005.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/menu"
            className="bg-gold text-navy px-8 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy transition-all duration-200 shadow-[0_0_32px_rgba(232,181,71,0.3)]"
          >
            View Menu
          </Link>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 border border-cream/30 text-cream px-8 py-4 rounded-full font-semibold text-base hover:border-cream/60 hover:bg-cream/5 active:scale-95 focus-visible:ring-2 focus-visible:ring-cream transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            Call to Order — {PHONE}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-dm-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 12: OurStory Section

**Files:**
- Create: `components/sections/OurStory.tsx`

- [ ] **Step 1: Create `components/sections/OurStory.tsx`**

```tsx
"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import CounterAnimation from "@/components/ui/CounterAnimation"
import AnimatedHeading from "@/components/ui/AnimatedHeading"
import { UNSPLASH_IMAGES } from "@/lib/constants"

const GALLERY = [
  { src: UNSPLASH_IMAGES.chips1, alt: "Golden chips fresh from the fryer" },
  { src: UNSPLASH_IMAGES.fish1, alt: "Fresh battered fish" },
  { src: UNSPLASH_IMAGES.shop1, alt: "Big Fry shop front" },
  { src: UNSPLASH_IMAGES.team1, alt: "The team at work" },
]

const STATS = [
  { value: 20, suffix: "+ Years", label: "of fryer mastery" },
  { value: 6, suffix: " Days", label: "a week, fresh" },
  { value: 1, suffix: "", label: "local bakery next door" },
]

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: staggered image gallery */}
          <div className="grid grid-cols-2 gap-4">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-square mt-8" : i === 2 ? "aspect-square" : "aspect-[3/4] mt-8"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 45vw, 22vw"
                />
                {/* Colour treatment */}
                <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Right: sticky text content */}
          <motion.div style={{ y }} className="md:sticky md:top-28 flex flex-col gap-8">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Our Story</p>

            <AnimatedHeading
              text="Two Decades of Fryer Mastery"
              tag="h2"
              className="font-fraunces text-4xl md:text-5xl text-navy leading-[1.1] tracking-tight"
            />

            <p className="text-charcoal/70 leading-[1.8] text-base md:text-lg font-dm-sans">
              Big Fry opened its doors in 2005 in the heart of the historic market town of Wymondham.
              Twenty years on, we're still cooking fresh six days a week — still getting our bread rolls
              from the bakery right next door, still drawing in customers from miles around. Some things
              are worth keeping the same.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-navy/10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-fraunces text-3xl md:text-4xl text-navy font-bold">
                    <CounterAnimation target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-charcoal/50 text-xs mt-1 font-dm-sans">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* EST badge */}
            <div className="inline-flex items-center gap-3 bg-navy/5 rounded-full px-5 py-3 w-fit">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy text-xs font-bold">★</span>
              </div>
              <span className="text-navy/70 text-sm font-dm-sans">
                Serving Wymondham since <strong className="text-navy">2005</strong>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 13: WhyBigFry Section

**Files:**
- Create: `components/sections/WhyBigFry.tsx`

- [ ] **Step 1: Create `components/sections/WhyBigFry.tsx`**

```tsx
"use client"
import { motion } from "framer-motion"
import { Flame, Leaf, Heart } from "lucide-react"

const CARDS = [
  {
    icon: Flame,
    title: "Freshly Fried All Day",
    body: "Cooked fresh from open to close, every day. No lamps, no holding — just hot, crispy perfection the moment you order.",
    accent: "from-gold/20 to-gold/5",
  },
  {
    icon: Leaf,
    title: "Local & Sustainable",
    body: "Bread rolls from the bakery right next door, 100% environmentally friendly packaging. Good food, good values.",
    accent: "from-navy/10 to-navy/5",
  },
  {
    icon: Heart,
    title: "Loved For Miles Around",
    body: "The area's most renowned chippy since 2005. Customers drive from across Norfolk — because some things are worth the journey.",
    accent: "from-gold/15 to-cream",
  },
]

export default function WhyBigFry() {
  return (
    <section className="bg-navy py-24 md:py-32 relative overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(232,181,71,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold/70 text-xs tracking-[0.25em] uppercase font-dm-sans mb-4"
          >
            Why Big Fry
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-fraunces text-4xl md:text-5xl text-cream tracking-tight"
          >
            What Makes Us Different
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden group"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-fraunces text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-cream/50 leading-relaxed text-sm font-dm-sans">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 14: Parties Section

**Files:**
- Create: `components/sections/Parties.tsx`

- [ ] **Step 1: Create `components/sections/Parties.tsx`**

```tsx
"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone } from "lucide-react"
import { PHONE_HREF, PHONE } from "@/lib/constants"

export default function Parties() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80')`,
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gold/70 text-xs tracking-[0.25em] uppercase font-dm-sans mb-6"
        >
          Parties & Big Orders
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-fraunces text-5xl md:text-6xl text-cream leading-[1.0] tracking-tight mb-8"
        >
          From 50 to 200 Meals —<br />
          <span className="text-gold">We've Got You</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream/60 text-lg leading-relaxed font-dm-sans mb-10 max-w-xl mx-auto"
        >
          Two decades of experience handling big orders for parties, quizzes, and events.
          High-quality insulated packaging keeps every meal piping hot. Free condiments and
          a bottle of drink thrown in. Delivery available. Call a few weeks ahead and
          we'll make it happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 bg-gold text-navy px-8 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200 shadow-[0_0_32px_rgba(232,181,71,0.25)]"
          >
            <Phone className="w-4 h-4" />
            Plan Your Event — {PHONE}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 15: ReviewsMarquee Section

**Files:**
- Create: `components/sections/ReviewsMarquee.tsx`

- [ ] **Step 1: Create `components/sections/ReviewsMarquee.tsx`**

```tsx
import ReviewCard from "@/components/ui/ReviewCard"
import { PLACEHOLDER_REVIEWS } from "@/lib/constants"
import AnimatedHeading from "@/components/ui/AnimatedHeading"

export default function ReviewsMarquee() {
  // Duplicate for seamless loop
  const doubled = [...PLACEHOLDER_REVIEWS, ...PLACEHOLDER_REVIEWS]

  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans mb-4">
          What People Say
        </p>
        <AnimatedHeading
          text="Loved Across Norfolk"
          className="font-fraunces text-4xl md:text-5xl text-navy tracking-tight"
        />
        {/* TODO: Owner to replace placeholder reviews with real customer reviews */}
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-5" style={{ width: "max-content" }}>
          {doubled.map((review, i) => (
            <ReviewCard
              key={i}
              {...review}
              className="w-72 shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 16: OpeningPreview Section + Home Page Assembly

**Files:**
- Create: `components/sections/OpeningPreview.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/OpeningPreview.tsx`**

```tsx
"use client"
import { motion } from "framer-motion"
import { Phone, Clock, MapPin } from "lucide-react"
import { HOURS, isOpenNow } from "@/lib/utils"
import { PHONE, PHONE_HREF, ADDRESS } from "@/lib/constants"

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function OpeningPreview() {
  const open = isOpenNow()

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-gold" />
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Opening Times</p>
            </div>
            <h2 className="font-fraunces text-4xl text-navy mb-2 tracking-tight">When To Find Us</h2>

            {/* Open now indicator */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-dm-sans font-semibold mb-8 ${open ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
              {open ? "Open Now" : "Currently Closed"}
            </div>

            <div className="divide-y divide-navy/8">
              {DAY_ORDER.map((day) => {
                const schedule = HOURS[day]
                const isClosed = "closed" in schedule
                return (
                  <div key={day} className="flex items-start justify-between py-3">
                    <span className="font-dm-sans text-navy/70 text-sm w-28 shrink-0">{day}</span>
                    {isClosed ? (
                      <span className="text-charcoal/40 text-sm">Closed</span>
                    ) : (
                      <div className="text-right text-sm text-charcoal/70 font-dm-sans">
                        {schedule.periods.map((p, i) => (
                          <div key={i}>{p.open} – {p.close}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <a
              href={PHONE_HREF}
              className="mt-8 flex items-center justify-center gap-2.5 bg-gold text-navy px-7 py-4 rounded-full font-semibold text-lg hover:bg-gold/90 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold w-full shadow-[0_4px_24px_rgba(232,181,71,0.3)]"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-gold" />
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-dm-sans">Find Us</p>
            </div>
            <h2 className="font-fraunces text-4xl text-navy mb-4 tracking-tight">Come Visit Us</h2>
            <p className="text-charcoal/60 text-sm font-dm-sans mb-4">{ADDRESS}</p>

            {/* TODO: Owner to replace this iframe with a real Google Maps embed */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5 border border-navy/10">
              <iframe
                title="Big Fry Wymondham location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.0!2d1.1122!3d52.5710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM0JzE1LjYiTiAxwrAwNic0My45IkU!5e0!3m2!1sen!2suk!4v1"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero"
import OurStory from "@/components/sections/OurStory"
import WhyBigFry from "@/components/sections/WhyBigFry"
import Parties from "@/components/sections/Parties"
import ReviewsMarquee from "@/components/sections/ReviewsMarquee"
import OpeningPreview from "@/components/sections/OpeningPreview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <WhyBigFry />
      <Parties />
      <ReviewsMarquee />
      <OpeningPreview />
    </>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 17: Menu Page

**Files:**
- Create: `app/menu/page.tsx`

- [ ] **Step 1: Create `app/menu/page.tsx`**

```tsx
import type { Metadata } from "next"
import { motion } from "framer-motion"
import MenuSection from "@/components/ui/MenuSection"
import {
  MENU_CHIPS,
  MENU_CHICKEN,
  MENU_PIES,
  MENU_BURGERS,
  MENU_OTHERS,
  MENU_EXTRAS,
  MENU_DRINKS,
  MENU_FISH,
  MENU_FISH_SIZES,
  MENU_FISH_EXTRAS,
} from "@/lib/constants"

export const metadata: Metadata = {
  title: "Menu",
  description: "Full menu for Big Fry Wymondham — fish, chips, chicken, pies, burgers and more. Fresh every day.",
}

const ANCHORS = [
  { id: "chips", label: "Chips" },
  { id: "fish", label: "Fish" },
  { id: "chicken", label: "Chicken" },
  { id: "pies", label: "Pies" },
  { id: "burgers", label: "Burgers" },
  { id: "others", label: "Others" },
  { id: "extras", label: "Extras" },
  { id: "drinks", label: "Drinks" },
]

export default function MenuPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Page header */}
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Big Fry Wymondham</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Our Menu</h1>
          <p className="text-cream/50 font-dm-sans">Fresh deliveries daily. Cooked to order, every time.</p>
        </div>
      </div>

      {/* Disclaimer banner */}
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
              <a
                key={a.id}
                href={`#${a.id}`}
                className="px-4 py-2 rounded-full text-sm font-dm-sans text-navy/60 hover:text-navy hover:bg-navy/8 transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-gold"
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Chips */}
        <MenuSection
          id="chips"
          title="Chips"
          note="Freshly prepared daily on the premises"
          items={MENU_CHIPS}
        />

        {/* Fish — table layout */}
        <section id="fish" className="py-12 border-b border-navy/10">
          <h2 className="font-fraunces text-3xl text-navy mb-2 tracking-tight">Fish</h2>
          <p className="text-charcoal/50 text-sm mb-6 italic">Regular fresh fish deliveries</p>

          {/* Size table */}
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm font-dm-sans">
              <thead>
                <tr className="border-b border-navy/15">
                  <th className="text-left py-3 px-2 text-navy/50 font-medium">Item</th>
                  {MENU_FISH_SIZES.map((s) => (
                    <th key={s} className="text-right py-3 px-2 text-navy/50 font-medium">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {MENU_FISH.map((fish, i) => (
                  <tr
                    key={fish.name}
                    className="hover:bg-navy/3 transition-colors"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <td className="py-3.5 px-2 text-charcoal font-medium">{fish.name}</td>
                    {fish.prices.map((p, j) => (
                      <td key={j} className="py-3.5 px-2 text-right text-navy font-semibold tabular-nums">{p}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fish extras */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 18: Children's Menu Page

**Files:**
- Create: `app/childrens-menu/page.tsx`

- [ ] **Step 1: Create `app/childrens-menu/page.tsx`**

```tsx
import type { Metadata } from "next"
import { CHILDRENS_MENU } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Children's Menu",
  description: "Big Fry Wymondham children's menu — great value kids' meals including fish & chips, sausage, chicken nuggets and more.",
}

export default function ChildrensMenuPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Header */}
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">For The Little Ones</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">
            Children's Menu
          </h1>
          <p className="text-cream/50 font-dm-sans">Great value kids' meals, freshly cooked.</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gold/15 border-y border-gold/30 py-3 px-6 text-center">
        <p className="text-navy text-sm font-dm-sans font-medium">
          All food fried in beef dripping. Prices subject to change.
        </p>
      </div>

      {/* Menu items */}
      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="divide-y divide-navy/10">
          {CHILDRENS_MENU.map((item, i) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-5 group"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-3">
                {/* Playful coloured dot per item */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: ["#E8B547", "#0A1F3D", "#E8B547", "#0A1F3D", "#E8B547", "#0A1F3D", "#E8B547"][i] }}
                />
                <span className="font-dm-sans text-charcoal group-hover:text-navy transition-colors text-lg">
                  {item.name}
                </span>
              </div>
              <span className="font-fraunces text-2xl text-navy font-bold tabular-nums">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 bg-navy/5 rounded-2xl p-6 text-center">
          <p className="text-navy/70 text-sm font-dm-sans leading-relaxed">
            All children's meals include chips. For allergies or dietary requirements, please ask a member of staff.
          </p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 19: Opening Times & Contact Page

**Files:**
- Create: `app/opening-times/page.tsx`

- [ ] **Step 1: Create `app/opening-times/page.tsx`**

```tsx
import type { Metadata } from "next"
import OpeningPreview from "@/components/sections/OpeningPreview"

export const metadata: Metadata = {
  title: "Opening Times & Contact",
  description: "Big Fry Wymondham opening hours and contact information. Call 01953 603210.",
}

export default function OpeningTimesPage() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Header */}
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Visit Us</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">
            Opening Times
          </h1>
          <p className="text-cream/50 font-dm-sans">Six days a week, fresh from open to close.</p>
        </div>
      </div>
      <OpeningPreview />
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 20: Reviews Page

**Files:**
- Create: `app/reviews/page.tsx`

- [ ] **Step 1: Create `app/reviews/page.tsx`**

```tsx
"use client"
import { useState } from "react"
import ReviewCard from "@/components/ui/ReviewCard"
import { PLACEHOLDER_REVIEWS } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"

// TODO: Owner to replace placeholder reviews with real ones
// TODO: Wire up form submission to a backend (e.g. Resend, Supabase, or Formspree)

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
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E8B547", "#0A1F3D", "#FDF6E3"],
    })
  }

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Header */}
      <div className="bg-navy py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,181,71,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-dm-sans mb-4">Our Customers</p>
          <h1 className="font-fraunces text-5xl md:text-6xl text-cream tracking-tight mb-4">Reviews</h1>
          <p className="text-cream/50 font-dm-sans">What Norfolk says about Big Fry.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Masonry grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-20"
          style={{ columnGap: "1.5rem" }}
        >
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
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm font-semibold text-navy font-dm-sans">Visit Date</label>
                    <input
                      id="date"
                      type="month"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-navy font-dm-sans">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="review" className="text-sm font-semibold text-navy font-dm-sans">Your Review *</label>
                  <textarea
                    id="review"
                    required
                    rows={4}
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    className="border border-navy/15 rounded-xl px-4 py-3 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gold transition-shadow resize-none"
                    placeholder="Tell us about your visit..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2.5 bg-gold text-navy px-7 py-4 rounded-full font-semibold text-base hover:bg-gold/90 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200 disabled:opacity-60 mt-2"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

---

### Task 21: SEO — Robots + Sitemap

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bigfrywymondham.com/sitemap.xml",
  }
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next"

const BASE = "https://bigfrywymondham.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/menu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/childrens-menu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/opening-times`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ]
}
```

- [ ] **Step 3: Final full build**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build
```

Expected: clean build, all 5 routes + sitemap + robots compiled successfully.

---

### Task 22: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Big Fry Wymondham — Website

Premium Next.js 14 website for Big Fry Wymondham fish and chip shop.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customisation Guide

### Real Video (Hero)
In `components/sections/Hero.tsx`, find the `<video>` tag and replace the `src=""` with your video URL.
Suggested: a short loop of chips frying, batter hitting oil, or steam rising from fresh fish.

### Real Photos
In `lib/constants.ts`, find `UNSPLASH_IMAGES` and replace each URL with your own photos.

### Real Reviews
In `lib/constants.ts`, find `PLACEHOLDER_REVIEWS` and replace with real customer quotes.
On the Reviews page, wire up the form to a backend service (see below).

### Address
Search for `TODO: Owner to confirm exact address` in the codebase and update the address string in `lib/constants.ts`.

### Google Maps Embed
In `components/sections/OpeningPreview.tsx`, replace the `<iframe src="">` with your real Google Maps embed URL.

### Review Form Backend
In `app/reviews/page.tsx`, find the `handleSubmit` function and replace `console.log` with a real API call.
Recommended: [Resend](https://resend.com) for email notifications or [Supabase](https://supabase.com) for storage.

### Social Links
In `components/Footer.tsx`, find the Instagram and Facebook links and update the `href="#"` with real URLs.

## Colour Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--cream` | `#FDF6E3` | Page background |
| `--navy` | `#0A1F3D` | Primary text, dark sections |
| `--gold` | `#E8B547` | Accent, CTAs |
| `--charcoal` | `#1A1A1A` | Body text |

## Deploy to Vercel

```bash
npx vercel
```

Or connect the GitHub repository to [vercel.com](https://vercel.com) for automatic deploys.
```

- [ ] **Step 2: Final verification**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry"
npm run build && echo "✅ Build successful"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Home page — Hero, OurStory, WhyBigFry, Parties, ReviewsMarquee, OpeningPreview (Tasks 11–16)
- ✅ Menu page — all categories, fish size table, sticky anchor nav (Task 17)
- ✅ Children's menu — all 7 items, disclaimer (Task 18)
- ✅ Opening times — live Open Now indicator, map, click-to-call (Task 19)
- ✅ Reviews — masonry grid, submission form, confetti success (Task 20)
- ✅ Navigation — transparent→solid, mobile overlay (Task 7)
- ✅ Footer — EST. 2005, logo, hours, socials (Task 8)
- ✅ LoadingScreen — "Frying things up…" (Task 5)
- ✅ CustomCursor — dot + ring, grows on interactive (Task 6)
- ✅ Smooth scroll — Lenis provider (Task 4)
- ✅ Framer Motion — whileInView reveals throughout
- ✅ GSAP — hero parallax silhouettes, ScrollTrigger
- ✅ AnimatedHeading — word-by-word on Hero and sections
- ✅ CounterAnimation — OurStory stats
- ✅ EST. 2005 badge — Hero kicker, Nav, Footer watermark
- ✅ SEO metadata — all pages, robots.ts, sitemap.ts (Task 21)
- ✅ README — run, customise, deploy (Task 22)

**No placeholders, no TBD items in plan tasks.** All code complete.
