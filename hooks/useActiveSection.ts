"use client"

import { useEffect, useRef, useState } from "react"

export interface ActiveSectionResult {
  /** The raw section id (e.g. "about") */
  activeSection: string
  /** Index into the NAV_ITEMS array (for waypoint lookup) */
  activeSectionIndex: number
}

/**
 * Maps the currently-visible page section to its corresponding nav index.
 * Uses IntersectionObserver with a 33% vertical rootMargin to stay snappy.
 *
 * @param sectionIds   Array of section element IDs in DOM order (matches nav order)
 */
export function useActiveSection(sectionIds: string[]): ActiveSectionResult {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const visible = new Map<string, number>() // id → intersectionRatio

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.intersectionRatio)
        })

        // Pick the section with the highest visibility ratio
        let bestId = ""
        let bestRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId && bestRatio > 0) {
          setActiveSection(bestId)
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    const elements: HTMLElement[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observerRef.current!.observe(el)
        elements.push(el)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [sectionIds.join(",")])

  const activeSectionIndex = Math.max(
    0,
    sectionIds.findIndex((id) => id === activeSection)
  )

  return { activeSection, activeSectionIndex }
}
