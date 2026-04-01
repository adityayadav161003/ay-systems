"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    handleScroll()
    handleHashChange()
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const navItems = [
    { name: "About", href: "/#about", type: "hash" },
    { name: "Experience", href: "/#experience", type: "hash" },
    { name: "Projects", href: "/#projects", type: "hash" },
    { name: "Skills", href: "/#skills", type: "hash" },
    { name: "Blog", href: "/blog", type: "route" },
    { name: "Contact", href: "/#contact", type: "hash" },
  ]

  const isActive = (item: any) => {
    if (item.type === "route") {
      return pathname === item.href
    }
    if (item.type === "hash" && pathname === "/") {
      return activeHash === item.href.replace("/", "")
    }
    return false
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-fit"
    >
      <div className={`flex items-center gap-2 md:gap-8 px-6 md:px-8 py-3 rounded-full transition-all duration-500 border ${
        scrolled 
          ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]" 
          : "bg-white/[0.03] backdrop-blur-md border-white/5 shadow-none"
      }`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`relative text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              isActive(item)
                ? "text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            {item.name}

            {isActive(item) && (
              <motion.span 
                layoutId="nav-active"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
