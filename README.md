# Big Fry Wymondham — Website

Premium Next.js 14 website for Big Fry Wymondham fish and chip shop, built for a business pitch.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, story, USPs, parties, reviews, hours |
| `/menu` | Full adult menu with sticky category nav |
| `/childrens-menu` | Children's menu |
| `/opening-times` | Hours, live open/closed indicator, map |
| `/reviews` | Masonry reviews + submission form |

## Customisation Guide

### Real Video (Hero)
In `components/sections/Hero.tsx`, find `<video src="">` and replace with your video URL.
Suggested footage: chips frying, batter hitting hot oil, steam rising from fresh fish.

### Real Photos
In `lib/constants.ts`, find `UNSPLASH_IMAGES` and replace each URL with your own photography.

### Real Reviews
In `lib/constants.ts`, find `PLACEHOLDER_REVIEWS` and replace the array with real customer quotes.

### Address
In `lib/constants.ts`, update `ADDRESS` to the confirmed street address.

### Google Maps Embed
In `components/sections/OpeningPreview.tsx`, replace the `<iframe src="...">` with your real Google Maps embed code (Maps → Share → Embed a map → copy iframe src).

### Review Form Backend
In `app/reviews/page.tsx`, find `handleSubmit` and replace `console.log` with a real API call.
Recommended services: [Resend](https://resend.com) (email), [Supabase](https://supabase.com) (database), or [Formspree](https://formspree.io) (no-code).

### Social Links
In `components/Footer.tsx`, update the Instagram and Facebook `href="#"` with real profile URLs.

## Colour Tokens

| Token | Hex | Used for |
|-------|-----|----------|
| `cream` | `#FDF6E3` | Page background |
| `navy` | `#0A1F3D` | Primary dark, section backgrounds |
| `gold` | `#E8B547` | Accent colour, CTAs |
| `charcoal` | `#1A1A1A` | Body text |

All tokens are defined as CSS variables in `app/globals.css` and as Tailwind colours in `tailwind.config.ts`.

## Deploying to Vercel

```bash
npx vercel
```

Or connect this folder to a GitHub repository and link it to [vercel.com](https://vercel.com) for automatic deploys on every push.

> **Note:** The site was built on Next.js 14. Consider upgrading to the latest Next.js before going live for security patches.
