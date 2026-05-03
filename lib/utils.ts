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
