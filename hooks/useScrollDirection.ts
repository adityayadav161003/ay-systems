"use client"

import { useEffect, useRef, useState } from "react"

export type ScrollDirection = "up" | "down" | "idle"

/**
 * Detects scroll direction with requestAnimationFrame throttling.
 * Returns "up", "down", or "idle".
 * Small hysteresis (>= 4px delta) prevents noise on micro-scrolls.
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("idle")
  const lastScrollY = useRef(0)
  const rafId = useRef<number>(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      if (rafId.current) return
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = 0
        const current = window.scrollY
        const delta = current - lastScrollY.current

        if (Math.abs(delta) >= 3) {
          setDirection(delta > 0 ? "down" : "up")
          lastScrollY.current = current
        }

        // Reset to idle after 800ms of no scrolling
        if (idleTimer.current) clearTimeout(idleTimer.current)
        idleTimer.current = setTimeout(() => setDirection("idle"), 800)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId.current) window.cancelAnimationFrame(rafId.current)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return direction
}
