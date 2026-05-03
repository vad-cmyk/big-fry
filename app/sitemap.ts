import type { MetadataRoute } from "next"

const BASE = "https://bigfrywymondham.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                      lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/menu`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/childrens-menu`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/opening-times`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/reviews`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  ]
}
