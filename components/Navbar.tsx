"use client"

export default function Navbar() {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="
        flex gap-8 px-8 py-3 rounded-full
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        shadow-[0_0_30px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:bg-white/10
      ">
        <a href="#about" className="text-sm text-gray-300 hover:text-white transition">
          About
        </a>
        <a href="#projects" className="text-sm text-gray-300 hover:text-white transition">
          Projects
        </a>
        <a href="#blog" className="text-sm text-gray-300 hover:text-white transition">
          Blog
        </a>
        <a href="#contact" className="text-sm text-gray-300 hover:text-white transition">
          Contact
        </a>
      </div>
    </div>
  )
}
