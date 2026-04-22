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

      {/* ─── NAVBAR PILL ─── */}
      <div
        ref={navPillRef}
        className={[
          "relative flex items-center justify-start md:justify-center gap-1 md:gap-1 lg:gap-2 px-3 md:px-3 lg:px-4 py-2.5 md:py-2.5 lg:py-3 rounded-full border",
          "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "transition-all duration-500",
          scrolled
            ? "bg-white/[0.07] backdrop-blur-3xl backdrop-saturate-150 border-white/12 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
            : "bg-white/5 backdrop-blur-3xl backdrop-saturate-150 border-white/12 shadow-[0_12px_60px_rgba(0,0,0,0.55)]",
        ].join(" ")}
      >
        {/* Glass overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-70 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_55%,transparent_100%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_25%,transparent_55%)]" />

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
                "relative shrink-0 px-3 md:px-3 lg:px-4 py-2 md:py-2 rounded-full whitespace-nowrap",
                "text-[10px] md:text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.12em] md:tracking-[0.18em] lg:tracking-[0.22em]",
                "transition-colors duration-300",
                active ? "text-white" : "text-white/55 hover:text-white",
                isSecondary && idx === 5 ? "ml-2 md:ml-2" : "", // Add spacing before Lab
              ].join(" ")}
            >
              {pillOn ? (
                <motion.span
                  layoutId={active ? "ay-nav-active" : "ay-nav-hover"}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: active
                      ? "linear-gradient(180deg, rgb(var(--ay-accent-rgb) / 0.22), rgb(var(--ay-glow-rgb) / 0.10))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                    boxShadow: active
                      ? "0 0 26px rgb(var(--ay-glow-rgb) / 0.22)"
                      : "0 0 14px rgba(255,255,255,0.08)",
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}

              <span className="relative z-10">{item.name}</span>

              {active ? (
                <motion.span
                  layoutId="ay-nav-underline"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                  style={{
                    background: "rgb(var(--ay-accent-rgb) / 0.95)",
                    boxShadow: "0 0 12px rgb(var(--ay-glow-rgb) / 0.55)",
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
