"use client"

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from "react"
import { motion, useSpring } from "framer-motion"
import ShipSVG from "./ShipSVG"
import type { ScrollDirection } from "@/hooks/useScrollDirection"

interface ShipNavigatorProps {
  navItemRefs: RefObject<HTMLElement | null>[]
  activeIndex: number
  scrollDirection: ScrollDirection
  containerHeight: number
  isMobile: boolean
}

const SHIP_WIDTH = 52

export default function ShipNavigator({
  navItemRefs,
  activeIndex,
  scrollDirection,
  containerHeight,
  isMobile,
}: ShipNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [waypoints, setWaypoints] = useState<number[]>([])
  const prevActiveIndex = useRef(activeIndex)
  const [shipDirection, setShipDirection] = useState<1 | -1>(1)

  // ─── Measure waypoint positions from nav item refs ─────────────
  const measureWaypoints = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const pts: number[] = []
    let validCount = 0

    for (let i = 0; i < navItemRefs.length; i++) {
      const el = navItemRefs[i]?.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left - containerRect.left + rect.width / 2
        pts.push(centerX)
        validCount++
      } else {
        pts.push(0)
      }
    }

    // Only set waypoints when ALL refs have resolved
    if (validCount === navItemRefs.length && validCount > 0) {
      setWaypoints(pts)
    }
  }, [navItemRefs])

  // Poll until refs are ready, then use ResizeObserver
  useEffect(() => {
    let cancelled = false
    let pollTimer: ReturnType<typeof setTimeout>

    const poll = () => {
      if (cancelled) return
      measureWaypoints()
      // Keep polling — waypoints state will only set when all refs resolve
      pollTimer = setTimeout(poll, 150)
    }

    // Start after a frame
    requestAnimationFrame(() => {
      if (!cancelled) poll()
    })

    return () => {
      cancelled = true
      clearTimeout(pollTimer)
    }
  }, [measureWaypoints])

  // Stop polling once waypoints are set, switch to ResizeObserver
  useEffect(() => {
    if (waypoints.length === 0) return
    // Re-measure on resize
    const handleResize = () => measureWaypoints()
    window.addEventListener("resize", handleResize)

    const observer = new ResizeObserver(handleResize)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [waypoints.length > 0, measureWaypoints])

  // ─── Spring-driven ship X ──────────────────────────────────────
  const shipX = useSpring(0, {
    stiffness: isMobile ? 120 : 80,
    damping: isMobile ? 20 : 18,
    mass: isMobile ? 0.8 : 1.2,
  })

  // Move ship when active section or waypoints change
  useEffect(() => {
    if (waypoints.length === 0) return
    const wp = waypoints[activeIndex]
    if (wp === undefined) return
    const targetX = wp - SHIP_WIDTH / 2
    shipX.set(targetX)
  }, [activeIndex, waypoints, shipX])

  // ─── Direction logic ───────────────────────────────────────────
  useEffect(() => {
    if (activeIndex > prevActiveIndex.current) {
      setShipDirection(1)
    } else if (activeIndex < prevActiveIndex.current) {
      setShipDirection(-1)
    }
    prevActiveIndex.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    if (scrollDirection === "up") setShipDirection(-1)
    else if (scrollDirection === "down") setShipDirection(1)
  }, [scrollDirection])

  const isMoving = scrollDirection !== "idle"
  const shipY = containerHeight / 2 - 14

  // ALWAYS render the container div so containerRef is available for measurement.
  // Only hide the ship contents when waypoints aren't ready.
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ height: containerHeight, overflow: "visible" }}
    >
      {waypoints.length > 0 && (
        <>
          {/* Travel path line */}
          <div
            className="absolute left-4 right-4 h-px rounded-full"
            style={{
              bottom: containerHeight / 2 - 6,
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.12) 15%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.12) 85%, transparent)",
            }}
          />

          {/* Waypoint dots */}
          {waypoints.map((x, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-500"
              style={{
                left: x - 2.5,
                top: shipY + 22,
                width: 5,
                height: 5,
                background:
                  i === activeIndex
                    ? "rgba(99,102,241,0.95)"
                    : "rgba(99,102,241,0.2)",
                boxShadow:
                  i === activeIndex
                    ? "0 0 10px rgba(99,102,241,0.65)"
                    : "none",
              }}
            />
          ))}

          {/* THE SHIP */}
          <motion.div
            className="absolute"
            style={{
              x: shipX,
              y: shipY,
              width: SHIP_WIDTH,
              filter: `drop-shadow(0 0 ${isMoving ? 14 : 7}px rgba(99,102,241,0.5))`,
            }}
          >
            <ShipSVG
              direction={shipDirection}
              active={isMoving}
              width={SHIP_WIDTH}
            />
          </motion.div>
        </>
      )}
    </div>
  )
}
