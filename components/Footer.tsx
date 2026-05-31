"use client"

import { Github, Linkedin, Mail, ArrowUp, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-gray-400 py-28 md:py-40 px-4 sm:px-6 md:px-8 border-t border-white/8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 mb-24 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="col-span-1 sm:col-span-2 space-y-8"
        >
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-[-0.01em]">ADITYA <span className="text-white/35 italic font-light tracking-wide">YADAV</span></h3>
          <div className="space-y-3">
            <p className="max-w-md text-white text-lg md:text-xl leading-relaxed font-bold tracking-[-0.005em]">
              I build things that think.
            </p>
            <p className="max-w-md text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              Engineering intelligent systems — one pipeline at a time.
            </p>
          </div>
          <motion.div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/adityayadav161003", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289", label: "LinkedIn" },
              { icon: Mail, href: "mailto:adity6946@gmail.com", label: "Email" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href} 
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl bg-white/6 border border-white/12 hover:bg-white/15 hover:border-white/25 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Navigation</h4>
          <ul className="space-y-4">
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
                  <motion.span
                    className="text-cyan-400 opacity-0 group-hover:opacity-100"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={14} />
                  </motion.span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Contact</h4>
          <ul className="space-y-4">
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
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 md:pt-20 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase"
        >
          © {new Date().getFullYear()} Aditya Yadav — Systems v2.1
        </motion.p>
        
        <motion.button 
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors duration-300"
        >
          <span>Back to Top</span>
          <motion.div 
            className="p-2 rounded-lg bg-white/6 border border-white/12 group-hover:border-cyan-400/40 transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUp size={14} />
            </motion.div>
          </motion.div>
        </motion.button>
      </div>
    </footer>
  )
}
