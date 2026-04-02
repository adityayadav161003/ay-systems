"use client"

import { motion } from "framer-motion"

interface RopePathProps {
  /** Start point (character hand) */
  x1: number
  y1: number
  /** End point (ship attachment) */
  x2: number
  y2: number
  /** "taut" = rope is being pulled tight, "slack" = rope hangs slightly */
  tension: "taut" | "slack"
}

/**
 * SVG quadratic Bézier rope connecting pirate character to ship.
 * Changes curve depth to communicate tension visually.
 */
export default function RopePath({ x1, y1, x2, y2, tension }: RopePathProps) {
  const midX = (x1 + x2) / 2
  const dx = x2 - x1

  // Control point — hangs down when slack, rises/straightens when taut
  const ctrlY = tension === "taut"
    ? Math.min(y1, y2) - 2           // Slightly above the line when taut
    : Math.max(y1, y2) + Math.abs(dx) * 0.18  // Sags downward when slack

  const d = `M ${x1} ${y1} Q ${midX} ${ctrlY} ${x2} ${y2}`

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <filter id="rope-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rope shadow / depth */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(20,20,40,0.6)"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ d }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />

      {/* Main rope strand */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(180,155,100,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray={tension === "taut" ? "none" : "4 3"}
        filter="url(#rope-glow)"
        animate={{ d }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />

      {/* Accent highlight strand */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(230,200,140,0.35)"
        strokeWidth="0.8"
        strokeLinecap="round"
        animate={{ d }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />
    </svg>
  )
}
