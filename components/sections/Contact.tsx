"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, Send, MessageCircle } from "lucide-react"

export default function Contact() {
  return (
    <SectionWrapper id="contact" plain noPadding>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-5xl w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden group"
      >
        
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-1000" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] group-hover:bg-purple-500/20 transition-all duration-1000" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
                <MessageCircle size={16} />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                Let’s <span className="text-white/40 italic">Connect.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                I’m always open to discussing new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Me", value: "adity6946@gmail.com", href: "mailto:adity6946@gmail.com", color: "blue" },
                { icon: Phone, label: "Call Me", value: "+91 8318570426", href: "tel:+918318570426", color: "emerald" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-6 group/item"
                >
                  <div className={`p-5 rounded-[1.5rem] bg-white/5 border border-white/10 group-hover/item:bg-${item.color}-500/10 group-hover/item:border-${item.color}-500/20 transition-all duration-500`}>
                    <item.icon size={28} className={`text-gray-400 group-hover/item:text-${item.color}-400 transition-colors`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-1">{item.label}</p>
                    <p className="text-white text-lg font-bold group-hover/item:text-blue-400 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-5">
              {[
                { icon: Github, href: "https://github.com/adityayadav161003" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-yadav-570846289/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 hover:scale-110"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl rounded-full opacity-50" />
            <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 space-y-8 flex flex-col justify-center h-full">
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Quick Message</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Have a specific role or project in mind? Drop a quick email!</p>
              </div>
              
              <a 
                href="mailto:adity6946@gmail.com"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-blue-400 hover:text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group/btn"
              >
                <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                Send Inquiry
              </a>
              
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">
                  Avg. response: &lt; 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
