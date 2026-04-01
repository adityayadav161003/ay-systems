"use client"

import { Github, Linkedin, Mail, ArrowUp, ChevronRight } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-gray-400 py-24 md:py-32 px-8 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-24">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <h3 className="text-3xl font-black text-white tracking-tighter">ADITYA <span className="text-white/40 italic">YADAV.</span></h3>
          <p className="max-w-md text-gray-500 text-lg leading-relaxed font-medium">
            Building intelligent systems with machine learning, automation, and data. 
            Focused on creating scalable architectures and meaningful software experiences.
          </p>
          <div className="flex gap-5">
            {[
              { icon: Github, href: "https://github.com/adityayadav161003" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289" },
              { icon: Mail, href: "mailto:adity6946@gmail.com" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all duration-500 hover:scale-110"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Navigation</h4>
          <ul className="space-y-5">
            {[
              { name: "About Me", href: "#about" },
              { name: "Featured Projects", href: "#projects" },
              { name: "Technical Skills", href: "#skills" },
              { name: "Engineering Blog", href: "/blog" }
            ].map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors duration-300"
                >
                  <ChevronRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Contact</h4>
          <ul className="space-y-5">
            {[
              { value: "adity6946@gmail.com", href: "mailto:adity6946@gmail.com" },
              { value: "+91 8318570426", href: "tel:+918318570426" }
            ].map((item) => (
              <li key={item.value}>
                <a 
                  href={item.href} 
                  className="text-sm font-bold text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {item.value}
                </a>
              </li>
            ))}
            <li className="text-sm font-bold text-gray-600">Mathura, UP, India</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Aditya Yadav — Intelligent Systems v1.0
        </p>
        
        <button 
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:text-blue-400 transition-colors duration-300"
        >
          <span>Back to Top</span>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all">
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </footer>
  )
}
