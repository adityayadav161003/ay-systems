"use client"

import { motion } from "framer-motion"

interface ShipSVGProps {
  /** 1 = facing right (moving forward/down), -1 = facing left (reversing) */
  direction: 1 | -1
  /** Whether this is currently the "active" ship (glows more) */
  active?: boolean
  width?: number
}

/**
 * Original anime-inspired sailing ship SVG.
 * Dark silhouette with accent glow — elegant and premium.
 * Flips horizontally via scaleX to communicate direction of travel.
 */
export default function ShipSVG({ direction, active = false, width = 52 }: ShipSVGProps) {
  const height = Math.round(width * 0.72)
  const glowColor = active ? "rgba(99,102,241,0.9)" : "rgba(99,102,241,0.45)"
  const glowBlur = active ? 8 : 4

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 52 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ scaleX: direction }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      style={{ transformOrigin: "center center", overflow: "visible" }}
    >
      <defs>
        <filter id="ship-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={glowBlur} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="hull-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(140,148,184,0.95)" />
          <stop offset="100%" stopColor="rgba(60,65,100,0.9)" />
        </linearGradient>
        <linearGradient id="sail-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(220,225,255,0.88)" />
          <stop offset="100%" stopColor="rgba(120,128,200,0.70)" />
        </linearGradient>
      </defs>

      {/* Hull */}
      <path
        d="M4 28 Q6 34 10 35 L42 35 Q46 34 48 28 L44 24 L8 24 Z"
        fill="url(#hull-grad)"
        filter="url(#ship-glow)"
        stroke={glowColor}
        strokeWidth="0.5"
      />

      {/* Hull highlight stripe */}
      <path
        d="M9 25.5 L43 25.5"
        stroke="rgba(200,210,255,0.35)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Keel / bottom */}
      <path
        d="M10 35 Q26 37.5 42 35"
        fill="none"
        stroke="rgba(80,85,140,0.8)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Mast */}
      <rect x="24.5" y="4" width="2" height="21" rx="1" fill="rgba(160,168,210,0.9)" />

      {/* Main sail */}
      <motion.path
        d="M26.5 5 Q36 10 36 20 L26.5 21 Z"
        fill="url(#sail-grad)"
        filter="url(#ship-glow)"
        animate={{
          d: [
            "M26.5 5 Q36 10 36 20 L26.5 21 Z",
            "M26.5 5 Q37 11 35.5 20.5 L26.5 21 Z",
            "M26.5 5 Q36 10 36 20 L26.5 21 Z",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Back sail (smaller) */}
      <motion.path
        d="M26.5 7 Q18 11 18 20 L26.5 21 Z"
        fill="rgba(160,168,220,0.55)"
        animate={{
          d: [
            "M26.5 7 Q18 11 18 20 L26.5 21 Z",
            "M26.5 7 Q17 12 18.5 20.5 L26.5 21 Z",
            "M26.5 7 Q18 11 18 20 L26.5 21 Z",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Flag */}
      <motion.path
        d="M26.5 4 L33 6.5 L26.5 9 Z"
        fill={glowColor}
        animate={{ scaleY: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "26.5px 6.5px" }}
      />

      {/* Rope attachment point — right side of hull */}
      <circle cx="5" cy="29" r="1.5" fill={glowColor} opacity={0.8} />

      {/* Bow wave (glowing water edge) */}
      {active && (
        <motion.path
          d="M48 30 Q50 31 52 30"
          fill="none"
          stroke="rgba(140,160,255,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5], x: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </motion.svg>
  )
}
