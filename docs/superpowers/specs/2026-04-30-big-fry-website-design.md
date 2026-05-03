# Big Fry Wymondham — Website Redesign Spec
**Date:** 2026-04-30  
**Status:** Approved  
**Project directory:** `/Users/vadimharbuz/Downloads/Cloud Code Websites/Big Fry`

---

## 1. Overview

A complete premium redesign of bigfrywymondham.com — a traditional British fish and chip shop established in 2005 in Wymondham, Norfolk. The goal is a pitch-ready site that demonstrates what a heritage chippy can look like with serious design investment. Aesthetic direction: **"Premium Chippy"** — high-end restaurant brand meets traditional British heritage.

**Build strategy:** Option A — all 5 pages fully built and polished before delivery.

---

## 2. Tech Stack

| Tool | Version / Notes |
|------|----------------|
| Next.js | 14+ (App Router) |
| TypeScript | Strict mode |
| Tailwind CSS | Custom theme extension |
| Framer Motion | Scroll reveals, page transitions, staggered animations |
| GSAP | Hero headline word animation, parallax |
| Lenis | Smooth scroll (client provider in root layout) |
| Lucide React | Icons |
| next/font/google | Fraunces + DM Sans, zero layout shift |

---

## 3. Design Tokens

### Colors (CSS variables in `globals.css`)
```css
--cream:    #FDF6E3
--navy:     #0A1F3D
--gold:     #E8B547
--charcoal: #1A1A1A
--white:    #FFFFFF
```

### Typography
- **Display/Headlines:** Fraunces (variable optical-size serif) — tight tracking (`-0.03em`) on large sizes
- **Body:** DM Sans — `line-height: 1.7`, generous and readable
- Both loaded via `next/font/google`

### Texture
- Subtle SVG noise grain overlay (`opacity: 0.03–0.06`) on dark sections for chip-paper heritage feel
- Layered radial gradients on hero and parallax sections

### Motion
- Animate only `transform` and `opacity`
- Spring-style easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
- `whileInView` triggers with `once: true`, `margin: "-100px"`

---

## 4. Project Structure

```
/app
  layout.tsx                ← Root: LenisProvider + LoadingScreen + Nav + Footer
  page.tsx                  ← Home page
  menu/page.tsx
  childrens-menu/page.tsx
  opening-times/page.tsx
  reviews/page.tsx

/components
  Nav.tsx                   ← Transparent→solid on scroll, mobile overlay
  Footer.tsx                ← Logo + EST. 2005, phone, hours, socials
  LoadingScreen.tsx         ← "Frying things up…" + logo reveal, 1.8s
  CustomCursor.tsx          ← Desktop-only 12px dot → 40px on hover
  SmoothScrollProvider.tsx  ← Lenis wrapper (client component)
  ui/
    AnimatedHeading.tsx     ← Word-by-word GSAP reveal
    MenuSection.tsx         ← Category block with sticky anchor + fade-in items
    ReviewCard.tsx          ← Star rating + quote card
    CounterAnimation.tsx    ← Animated number counters
  sections/
    Hero.tsx                ← Full-viewport video bg, GSAP headline, two CTAs
    OurStory.tsx            ← Split scroll: gallery left, sticky text right
    WhyBigFry.tsx           ← 3 animated USP cards
    Parties.tsx             ← Cinematic parallax full-bleed section
    ReviewsMarquee.tsx      ← Auto-scrolling marquee of review cards
    OpeningPreview.tsx      ← Hours + map two-column

/lib
  constants.ts              ← Menu data, hours, reviews placeholder data
  utils.ts                  ← cn() helper, isOpenNow()

/public
  logo.png                  ← Big Fry logo (copied from project root)
```

---

## 5. Pages

### Page 1 — Home (`/`)
1. **LoadingScreen** — logo animates in, "Frying things up…" text, fades out after 1.8s revealing hero
2. **Hero** — full-viewport `<video>` bg (placeholder src, TODO comment), dark overlay, kicker "EST. 2005 · WYMONDHAM, NORFOLK", GSAP word-by-word headline "Wymondham's Most Loved Fish & Chips", subheading, CTA pair (gold "View Menu" + ghost "Call to Order — 01953 603210"), scroll indicator, parallax fish/chip silhouettes
3. **OurStory** — split layout, scrolling image gallery left, sticky right panel ("Two Decades of Fryer Mastery"), animated counters (20+ Years / 6 Days a Week / 1 Local Bakery), steam-rise hover
4. **WhyBigFry** — 3 cards: Freshly Fried All Day / Local & Sustainable / Loved For Miles Around
5. **Parties** — parallax full-bleed, "From 50 to 200 Meals — We've Got You", CTA "Plan Your Event"
6. **ReviewsMarquee** — auto-scrolling star-rated cards (placeholder, TODO comment)
7. **OpeningPreview** — hours left, embedded map right, large phone CTA
8. **Footer**

### Page 2 — Menu (`/menu`)
- Sticky anchor nav (Chips / Fish / Chicken / Pies / Burgers / Others / Extras / Drinks)
- Each category: `MenuSection` component with fade-in items
- Fish section uses a size-column table (Small / Medium / Large)
- Prominent "All food fried in beef dripping. Prices subject to change." banner
- All pricing as specified in the brief

### Page 3 — Children's Menu (`/childrens-menu`)
- Same elegant style, slightly more playful colour accents
- 7 items as specified
- Same disclaimer banner

### Page 4 — Opening Times & Contact (`/opening-times`)
- Live "Open Now" / "Closed" indicator using client-side `Date` (based on user's local time)
- Weekly grid: Mon–Thu 11:30–14:00 / 16:30–20:30; Fri 11:30–14:00 / 16:30–21:00; Sat 11:30–14:00 / 16:30–20:30; Sun closed
- Click-to-call button: `tel:01953603210`
- Google Maps embed (placeholder iframe, TODO comment for real embed)
- Address: TODO comment for owner to confirm

### Page 5 — Reviews (`/reviews`)
- Masonry grid of placeholder `ReviewCard` components (TODO comment for real reviews)
- Review submission form: Name / Email / Date / Review textarea / Submit
- On submit: `console.log` + success state with subtle fade animation (TODO comment for backend)

---

## 6. Navigation

- Sticky, `position: fixed`, full width
- **Transparent** when hero is in view; transitions to solid navy/cream on scroll past 80px
- Desktop: Logo left, links centre, "Call: 01953 603210" gold button right
- Mobile: hamburger → full-screen overlay with staggered link entrance animations
- Logo: `logo.png` + "EST. 2005" small text beneath on desktop

---

## 7. Animations & Interactions

| Element | Technique |
|---------|-----------|
| Page transitions | Framer Motion `AnimatePresence` fade+slide |
| Hero headline | GSAP word-split stagger (0.1s per word) |
| Section reveals | Framer Motion `whileInView` fade+translateY |
| Loading screen | CSS keyframes + Framer Motion exit |
| Counter numbers | Custom `useEffect` + `requestAnimationFrame` |
| Reviews marquee | CSS `animation: scroll linear infinite` |
| Custom cursor | `mousemove` listener, CSS `transform` only |
| Parallax | GSAP `ScrollTrigger` on hero silhouettes + Parties bg |
| Image hover | `scale(1.04)` + subtle `rotateX` tilt via Framer Motion |
| Nav transparency | `IntersectionObserver` on hero section |

---

## 8. Images

Direct Unsplash URLs used for placeholders (no `next/image` domain config needed):
- Fish and chips: `https://images.unsplash.com/photo-1518779578993-ec3579fee39f` (and similar)
- British chippy interior, golden batter, Norfolk town
- Each image has a gradient overlay and `mix-blend-multiply` colour treatment layer
- TODO comments throughout for owner to replace with real photography

---

## 9. SEO & Performance

- `metadata` export on each page (title, description, Open Graph)
- `robots.txt` and `sitemap.xml` via Next.js route handlers
- Fonts preloaded via `next/font`
- No `transition-all` anywhere
- Custom cursor and Lenis disabled on touch devices
- Target: Lighthouse 95+

---

## 10. README

A `README.md` at the project root covering:
- How to run (`npm install` + `npm run dev`)
- How to swap in real video, photos, reviews, address
- How to deploy to Vercel
- Tailwind token reference

---

## 11. Out of Scope

- Backend for review form (console.log placeholder)
- Real Google Maps API key (iframe placeholder)
- Real video footage (video tag with placeholder src)
- Online ordering integration
- CMS / admin panel
