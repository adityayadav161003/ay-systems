"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, createRef } from "react"
import { motion } from "framer-motion"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { useActiveSection } from "@/hooks/useActiveSection"
import ShipNavigator from "./navigation/ShipNavigator"

type NavItem = {
  name: string
  href: string
  type: "primary" | "secondary"
  sectionId?: string
}

// PRIMARY: scroll-based navigation (ship moves across these)
// SECONDARY: route-based navigation (ship ignores these)
const NAV_ITEMS: NavItem[] = [
  { name: "About",      href: "/#about",         type: "primary", sectionId: "about" },
  { name: "Experience", href: "/#experience",    type: "primary", sectionId: "experience" },
  { name: "Projects",   href: "/#projects",      type: "primary", sectionId: "projects" },
  { name: "Skills",     href: "/#skills",        type: "primary", sectionId: "skills" },
  { name: "Contact",    href: "/#contact",       type: "primary", sectionId: "contact" },
  { name: "Lab",        href: "/lab",            type: "secondary" },
  { name: "Thoughts",   href: "/thoughts",       type: "secondary" },
]

// Only PRIMARY nav items for scroll tracking
const PRIMARY_ITEMS = NAV_ITEMS.filter((i) => i.type === "primary")
const PRIMARY_SECTION_IDS = PRIMARY_ITEMS.map((i) => i.sectionId!)

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navPillRef = useRef<HTMLDivElement>(null)

  // Create refs for ALL nav items
  const navItemRefs = useRef(NAV_ITEMS.map(() => createRef<HTMLAnchorElement>()))
  
  // Create refs for PRIMARY nav items only (for ship animation)
  const primaryNavRefs = useRef(PRIMARY_ITEMS.map(() => createRef<HTMLAnchorElement>()))

  // Custom hooks - only track PRIMARY sections
  const scrollDirection = useScrollDirection()
  const { activeSection } = useActiveSection(
    pathname === "/" ? PRIMARY_SECTION_IDS : []
  )

  // Map activeSection to PRIMARY nav index (for ship animation)
  const activePrimaryIndex = (() => {
    if (pathname !== "/" || !activeSection) return 0
    const idx = PRIMARY_ITEMS.findIndex((i) => i.sectionId === activeSection)
    return idx >= 0 ? idx : 0
  })()

  // Mount guard for SSR safety
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll detection for frosted glass intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Sync primary nav refs with actual nav item refs
  useEffect(() => {
    let primaryIdx = 0
    NAV_ITEMS.forEach((item, idx) => {
      if (item.type === "primary") {
        primaryNavRefs.current[primaryIdx] = navItemRefs.current[idx] as React.RefObject<HTMLAnchorElement>
        primaryIdx++
      }
    })
  }, [])

  const sceneHeight = isMobile ? 0 : 68

  const isActive = (item: NavItem) => {
    if (item.type === "secondary") {
      return pathname === item.href
    }
    if (item.type === "primary" && pathname === "/") {
      return activeSection === item.sectionId
    }
    return false
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96vw] md:w-[96vw] lg:w-[94vw] max-w-[1100px]"
    >
      {/* ─── SHIP SCENE — sits above the pill ─── */}
      <div
        className="relative w-full pointer-events-none select-none"
        style={{ height: sceneHeight, marginBottom: sceneHeight > 0 ? -8 : 0 }}
      >
        {mounted && pathname === "/" && !isMobile && (
          <ShipNavigator
            activeIndex={activePrimaryIndex}
            navItemRefs={primaryNavRefs.current as React.RefObject<HTMLElement | null>[]}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* ─── NAVBAR PILL — PREMIUM ─── */}
      <div
        ref={navPillRef}
        className={[
          "relative flex items-center justify-start sm:justify-center gap-0.5 sm:gap-1 lg:gap-1.5 px-2.5 sm:px-4 lg:px-5 py-2.5 sm:py-3 rounded-full border",
          "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "transition-all duration-500 group",
          scrolled
            ? "bg-white/[0.08] backdrop-blur-3xl backdrop-saturate-150 border-white/15 shadow-[0_24px_96px_rgba(0,0,0,0.7)]"
            : "bg-white/6 backdrop-blur-3xl backdrop-saturate-150 border-white/12 shadow-[0_16px_70px_rgba(0,0,0,0.6)]",
        ].join(" ")}
      >
        {/* Premium glass overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-75 bg-[radial-gradient(1000px_circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)] rounded-full" />
        <div className="absolute inset-0 pointer-events-none opacity-65 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_60%,transparent_100%)] rounded-full" />
        <div className="absolute inset-0 pointer-events-none opacity-35 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_25%,transparent_60%)] rounded-full" />

        {/* Nav links */}
        {NAV_ITEMS.map((item, idx) => {
          const active = isActive(item)
          const pillOn = hovered === item.name || active
          const isSecondary = item.type === "secondary"
          
          return (
            <Link
              key={item.name}
              href={item.href}
              ref={navItemRefs.current[idx] as React.RefObject<HTMLAnchorElement>}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "relative shrink-0 px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-full whitespace-nowrap",
                "text-[9px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em]",
                "transition-all duration-300",
                active ? "text-white" : "text-white/65 hover:text-white/90",
                isSecondary && idx === 5 ? "ml-1 sm:ml-2" : "", // Add spacing before Lab
              ].join(" ")}
            >
              {pillOn ? (
                <motion.span
                  layoutId={active ? "ay-nav-active" : "ay-nav-hover"}
                  className="absolute inset-0 rounded-lg sm:rounded-full"
                  style={{
                    background: active
                      ? "linear-gradient(180deg, rgb(var(--ay-accent-rgb) / 0.25), rgb(var(--ay-glow-rgb) / 0.12))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: active
                      ? "0 0 28px rgb(var(--ay-glow-rgb) / 0.28)"
                      : "0 0 16px rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}

              <span className="relative z-10">{item.name}</span>

              {active ? (
                <motion.span
                  layoutId="ay-nav-underline"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full"
                  style={{
                    background: "rgb(var(--ay-accent-rgb) / 1)",
                    boxShadow: "0 0 14px rgb(var(--ay-glow-rgb) / 0.6)",
                  }}
                />
              ) : null}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
