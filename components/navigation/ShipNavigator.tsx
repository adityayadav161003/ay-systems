"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"
import ShipSVG from "./ShipSVG"

interface ShipNavigatorProps {
  activeIndex: number
  navItemRefs: React.RefObject<HTMLElement | null>[]
  isMobile: boolean
}

const SHIP_WIDTH = 52

export default function ShipNavigator({
  activeIndex,
  navItemRefs,
  isMobile,
}: ShipNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<number[]>([])
  const [isReady, setIsReady] = useState(false)
  const [shipDirection, setShipDirection] = useState<1 | -1>(1)
  const prevIndexRef = useRef(activeIndex)
  const directionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ship position with spring physics - smoother, less bouncy
  const shipX = useSpring(0, {
    stiffness: 120,
    damping: 25,
    mass: 1,
    restDelta: 0.001,
    restSpeed: 0.001,
  })

  // Directional tilt - subtle and smooth
  const shipRotate = useSpring(0, {
    stiffness: 180,
    damping: 22,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.001,
  })

  // Measure nav item positions
  const measurePositions = () => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const measured: number[] = []

    for (const ref of navItemRefs) {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        // Calculate center position relative to container
        const centerX = rect.left - containerRect.left + rect.width / 2
        measured.push(centerX)
      } else {
        measured.push(0)
      }
    }

    // Only update if we have valid measurements
    if (measured.length === navItemRefs.length && measured.every(p => p > 0)) {
      setPositions(measured)
      setIsReady(true)
    }
  }

  // Initial measurement and resize handling
  useEffect(() => {
    // Measure after mount with multiple attempts
    const timer1 = setTimeout(measurePositions, 100)
    const timer2 = setTimeout(measurePositions, 300)
    const timer3 = setTimeout(measurePositions, 600)

    // Remeasure on resize
    const handleResize = () => {
      setIsReady(false)
      setTimeout(measurePositions, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener("resize", handleResize)
    }
  }, [navItemRefs])

  // Remeasure when refs change
  useEffect(() => {
    if (navItemRefs.length > 0) {
      measurePositions()
    }
  }, [navItemRefs])

  // Update ship position when active index changes
  useEffect(() => {
    if (!isReady || positions.length === 0) return

    const targetPosition = positions[activeIndex]
    if (targetPosition === undefined) return

    // Calculate ship x position (center ship on nav item)
    const shipTargetX = targetPosition - SHIP_WIDTH / 2

    // Clamp to container bounds
    const containerWidth = containerRef.current?.offsetWidth || 0
    const clampedX = Math.max(0, Math.min(shipTargetX, containerWidth - SHIP_WIDTH))

    // Set ship position
    shipX.set(clampedX)

    // Set directional tilt and flip
    const direction = activeIndex > prevIndexRef.current ? 1 : activeIndex < prevIndexRef.current ? -1 : 0
    if (direction !== 0) {
      // Clear any pending direction change
      if (directionTimeoutRef.current) {
        clearTimeout(directionTimeoutRef.current)
      }
      
      // Update ship direction (flip) - smooth transition
      setShipDirection(direction as 1 | -1)
      
      // Add subtle tilt (reduced from 2 to 1.5)
      shipRotate.set(direction * 1.5)
      
      // Reset tilt after movement with debounce
      directionTimeoutRef.current = setTimeout(() => {
        shipRotate.set(0)
      }, 600)
    }

    prevIndexRef.current = activeIndex
  }, [activeIndex, positions, isReady, shipX, shipRotate])
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (directionTimeoutRef.current) {
        clearTimeout(directionTimeoutRef.current)
      }
    }
  }, [])

  // Don't render on mobile
  if (isMobile) return null

  // Show ship even if not fully ready (will position once ready)
  if (navItemRefs.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ height: 68 }}
    >
      {/* Navigation track */}
      <div
        className="absolute left-4 right-4 h-px rounded-full"
        style={{
          bottom: 28,
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.12) 15%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.12) 85%, transparent)",
        }}
      />

      {/* Waypoint indicators */}
      {isReady && positions.map((x, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: x - 2.5,
            top: 48,
            width: 5,
            height: 5,
          }}
          animate={{
            backgroundColor: i === activeIndex ? "rgba(99,102,241,0.95)" : "rgba(99,102,241,0.2)",
            boxShadow: i === activeIndex ? "0 0 10px rgba(99,102,241,0.65)" : "none",
          }}
          transition={{ duration: 0.3 }}
        />
      ))}

      {/* Ship */}
      {isReady && positions.length > 0 && (
        <motion.div
          className="absolute"
          style={{
            x: shipX,
            y: 20,
            rotate: shipRotate,
            width: SHIP_WIDTH,
          }}
          animate={{
            y: [20, 18, 20],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 7px rgba(99,102,241,0.5))",
                "drop-shadow(0 0 12px rgba(99,102,241,0.6))",
                "drop-shadow(0 0 7px rgba(99,102,241,0.5))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShipSVG direction={shipDirection} active={false} width={SHIP_WIDTH} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
