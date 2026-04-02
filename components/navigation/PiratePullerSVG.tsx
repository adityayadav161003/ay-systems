"use client"

import { motion } from "framer-motion"

export type CharacterState = "pulling" | "resisting" | "idle"

interface PiratePullerSVGProps {
  state: CharacterState
  /** 1 = facing right (pulling forward), -1 = facing left (resisting) */
  direction: 1 | -1
  width?: number
}

/**
 * Original anime-inspired pirate boy SVG character.
 * 3 animated expression states: pulling / resisting / idle.
 * Inspired by the energetic stretchy sailor vibe — fully original design.
 *
 * Character design:
 *  - Wide brim straw-hat style silhouette (original shape, not copyrighted)
 *  - Short vest, shorts, boots
 *  - Expressive body language communicates state
 */
export default function PiratePullerSVG({ state, direction, width = 36 }: PiratePullerSVGProps) {
  const height = Math.round(width * 1.5)

  // Body language variants
  const bodyVariants = {
    pulling: {
      rotate: -18,         // Leans forward aggressively
      x: 2,
      y: 2,
    },
    resisting: {
      rotate: 14,          // Leans backward, heels planted
      x: -3,
      y: 1,
    },
    idle: {
      rotate: 0,
      x: 0,
      y: 0,
    },
  }

  const armVariants = {
    pulling: {
      rotate: [-35, -55, -35],   // Rhythmic pull cycle
      x: [0, 4, 0],
    },
    resisting: {
      rotate: [20, 30, 20],       // Arms stretched back resisting
      x: [0, -3, 0],
    },
    idle: {
      rotate: [-5, 5, -5],        // Gentle sway
      x: [0, 0, 0],
    },
  }

  const hatVariants = {
    pulling: { rotate: -10, y: 0 },
    resisting: { rotate: 8, y: -1 },
    idle: { rotate: 0, y: [0, -1, 0] },
  }

  const legLVariants = {
    pulling: { rotate: -20 },    // Stride forward
    resisting: { rotate: 15 },  // Heels dug in
    idle: { rotate: 0 },
  }

  const legRVariants = {
    pulling: { rotate: 10 },
    resisting: { rotate: -10 },
    idle: { rotate: 0 },
  }

  // Idle breathing loop for body
  const idleBodyAnim =
    state === "idle"
      ? { rotate: [-1, 1, -1], y: [0, -1, 0], x: 0 }
      : undefined

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 36 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // Mirror character when moving left
      animate={{ scaleX: direction }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      style={{ transformOrigin: "center center", overflow: "visible" }}
    >
      <defs>
        <filter id="char-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="skin-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(240,200,160,1)" />
          <stop offset="100%" stopColor="rgba(210,165,120,1)" />
        </linearGradient>
        <linearGradient id="vest-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(60,65,100,0.95)" />
          <stop offset="100%" stopColor="rgba(30,32,60,0.95)" />
        </linearGradient>
      </defs>

      {/* ─── WHOLE CHARACTER GROUP (body lean) ─── */}
      <motion.g
        style={{ transformOrigin: "18px 38px" }} // pivot at feet
        animate={
          state === "idle"
            ? { rotate: [-1, 1, -1], y: [0, -0.5, 0], x: 0 }
            : { rotate: bodyVariants[state].rotate, x: bodyVariants[state].x, y: bodyVariants[state].y }
        }
        transition={
          state === "idle"
            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
            : { type: "spring", stiffness: 160, damping: 22 }
        }
      >
        {/* ─── LEGS ─── */}
        {/* Left leg */}
        <motion.g
          style={{ transformOrigin: "15px 38px" }}
          animate={state === "idle" ? { rotate: 0 } : legLVariants[state]}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* Upper leg */}
          <rect x="12" y="37" width="6" height="9" rx="2.5" fill="rgba(30,35,80,0.95)" />
          {/* Boot */}
          <path d="M11 46 Q11 53 13 53 L18 53 L18 50 L14 50 L14 46 Z" fill="rgba(20,22,45,0.98)" />
          <path d="M13 53 L18 53" stroke="rgba(100,110,180,0.6)" strokeWidth="1" />
        </motion.g>

        {/* Right leg */}
        <motion.g
          style={{ transformOrigin: "21px 38px" }}
          animate={
            state === "pulling"
              ? { rotate: [10, -5, 10], transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" } }
              : state === "idle"
              ? { rotate: 0 }
              : legRVariants[state]
          }
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* Upper leg */}
          <rect x="18" y="37" width="6" height="9" rx="2.5" fill="rgba(35,40,90,0.95)" />
          {/* Boot */}
          <path d="M18 46 L18 50 L23 50 L23 53 L26 53 Q28 53 28 50 Q28 46 24 46 Z" fill="rgba(20,22,45,0.98)" />
          <path d="M23 53 L26 53" stroke="rgba(100,110,180,0.6)" strokeWidth="1" />
        </motion.g>

        {/* ─── TORSO / VEST ─── */}
        <path
          d="M12 22 Q10 28 11 37 L25 37 Q26 28 24 22 Z"
          fill="url(#vest-grad)"
          stroke="rgba(80,90,160,0.4)"
          strokeWidth="0.5"
        />
        {/* Vest open collar */}
        <path
          d="M18 22 L16 27 M18 22 L20 27"
          stroke="rgba(200,210,255,0.4)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Belt */}
        <rect x="11.5" y="33" width="13" height="2.5" rx="1" fill="rgba(50,55,100,0.85)" />
        <rect x="17" y="33" width="2" height="2.5" rx="0.5" fill="rgba(180,190,255,0.5)" />

        {/* ─── ARMS ─── */}
        {/* Left arm (rope-pulling arm) */}
        <motion.g
          style={{ transformOrigin: "13px 24px" }}
          animate={
            state === "pulling"
              ? {
                  rotate: armVariants.pulling.rotate,
                  x: armVariants.pulling.x,
                  transition: { duration: 0.65, repeat: Infinity, ease: "easeInOut" },
                }
              : state === "resisting"
              ? {
                  rotate: armVariants.resisting.rotate,
                  x: armVariants.resisting.x,
                  transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
                }
              : {
                  rotate: armVariants.idle.rotate,
                  x: armVariants.idle.x,
                  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          {/* Upper arm */}
          <rect x="7" y="22" width="5" height="10" rx="2.5" fill="url(#skin-grad)" />
          {/* Forearm */}
          <rect x="5" y="30" width="5" height="8" rx="2" fill="url(#skin-grad)" />
          {/* Hand / fist (gripping rope) */}
          <circle cx="7.5" cy="39" r="3" fill="url(#skin-grad)" />
          {/* Knuckle detail */}
          <path d="M5.5 38.5 Q7.5 37 9.5 38.5" stroke="rgba(180,140,100,0.5)" strokeWidth="0.7" />
        </motion.g>

        {/* Right arm — secondary arm for balance */}
        <motion.g
          style={{ transformOrigin: "23px 24px" }}
          animate={
            state === "pulling"
              ? {
                  rotate: [10, 25, 10],
                  transition: { duration: 0.65, repeat: Infinity, ease: "easeInOut", delay: 0.32 },
                }
              : state === "resisting"
              ? {
                  rotate: [-15, -5, -15],
                  transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
                }
              : {
                  rotate: [5, -5, 5],
                  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                }
          }
        >
          <rect x="24" y="22" width="5" height="10" rx="2.5" fill="url(#skin-grad)" />
          <rect x="25" y="30" width="5" height="7" rx="2" fill="url(#skin-grad)" />
          <circle cx="28" cy="38" r="2.8" fill="url(#skin-grad)" />
        </motion.g>

        {/* ─── HEAD ─── */}
        {/* Neck */}
        <rect x="16" y="14" width="4" height="5" rx="2" fill="url(#skin-grad)" />
        {/* Head */}
        <ellipse cx="18" cy="13" rx="7" ry="7.5" fill="url(#skin-grad)" />
        {/* Face shading */}
        <ellipse cx="18" cy="14" rx="5" ry="5" fill="rgba(215,175,130,0.3)" />

        {/* ─── FACE EXPRESSIONS ─── */}
        {/* Eyes — always determined */}
        <motion.g
          animate={
            state === "pulling"
              ? { y: 0.5 }           // Eyes slightly squinted with effort
              : state === "resisting"
              ? { y: -0.5 }          // Eyes open wide with resistance surprise
              : { y: 0 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Left eye */}
          <ellipse
            cx="15"
            cy="13"
            rx={state === "pulling" ? 1.8 : 2.2}
            ry={state === "pulling" ? 1.2 : state === "resisting" ? 2.2 : 1.8}
            fill="rgba(20,20,40,0.95)"
          />
          <circle cx="15.6" cy="12.5" r="0.6" fill="rgba(255,255,255,0.85)" />

          {/* Right eye */}
          <ellipse
            cx="21"
            cy="13"
            rx={state === "pulling" ? 1.8 : 2.2}
            ry={state === "pulling" ? 1.2 : state === "resisting" ? 2.2 : 1.8}
            fill="rgba(20,20,40,0.95)"
          />
          <circle cx="21.6" cy="12.5" r="0.6" fill="rgba(255,255,255,0.85)" />
        </motion.g>

        {/* Eyebrows — communicate effort */}
        <motion.g
          animate={
            state === "pulling"
              ? { rotate: -8, y: -0.5 }   // Furrowed in determination
              : state === "resisting"
              ? { rotate: 6, y: 0.5 }     // Raised in effort/strain
              : { rotate: 0, y: 0 }
          }
          style={{ transformOrigin: "18px 11px" }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <path d="M13 10.5 Q15 9.5 17 10.5" stroke="rgba(30,30,50,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M19 10.5 Q21 9.5 23 10.5" stroke="rgba(30,30,50,0.9)" strokeWidth="1.4" strokeLinecap="round" />
        </motion.g>

        {/* Mouth — determined (pulling) / strained O (resisting) / neutral (idle) */}
        {state === "pulling" && (
          <path d="M16 16.5 Q18 18 20 16.5" stroke="rgba(30,30,50,0.85)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        )}
        {state === "resisting" && (
          <ellipse cx="18" cy="17" rx="2" ry="1.5" fill="rgba(30,30,50,0.8)" />
        )}
        {state === "idle" && (
          <path d="M16 16.5 Q18 17.5 20 16.5" stroke="rgba(30,30,50,0.75)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        )}

        {/* Effort marks (only when pulling hard) */}
        {state === "pulling" && (
          <motion.g
            animate={{ opacity: [0.6, 1, 0.6], x: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <path d="M24 8 L26 5" stroke="rgba(255,200,80,0.7)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M25 10 L28 9" stroke="rgba(255,200,80,0.7)" strokeWidth="1" strokeLinecap="round" />
          </motion.g>
        )}

        {/* Sweat drop (resisting) */}
        {state === "resisting" && (
          <motion.g
            animate={{ y: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <path d="M25 8 Q26 11 24.5 11.5" stroke="rgba(120,200,255,0.65)" strokeWidth="1" strokeLinecap="round" />
          </motion.g>
        )}

        {/* ─── HAT ─── */}
        <motion.g
          animate={
            state === "idle"
              ? { rotate: [0, 2, 0], y: [0, -0.5, 0] }
              : hatVariants[state]
          }
          style={{ transformOrigin: "18px 7px" }}
          transition={
            state === "idle"
              ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 180, damping: 20 }
          }
        >
          {/* Hat brim — wide straw-hat style */}
          <ellipse cx="18" cy="7.5" rx="11" ry="2.8" fill="rgba(160,130,60,0.9)" />
          {/* Hat crown */}
          <path d="M10 7.5 Q11 0 18 0 Q25 0 26 7.5 Z" fill="rgba(130,100,40,0.95)" />
          {/* Hat band */}
          <path d="M10.5 7 Q18 5.5 25.5 7" stroke="rgba(80,200,120,0.55)" strokeWidth="1.5" fill="none" />
          {/* Hat highlight */}
          <path d="M13 4 Q18 2.5 23 4" stroke="rgba(220,190,100,0.3)" strokeWidth="0.8" fill="none" />
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}
