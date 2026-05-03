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
