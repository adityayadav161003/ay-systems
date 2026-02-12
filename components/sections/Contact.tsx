"use client"

import { Github, Linkedin, Mail, Phone } from "lucide-react"

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-6 flex justify-center"
    >
      <div className="max-w-3xl w-full bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-3xl p-12 shadow-xl animate-card">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          Let’s Connect.
        </h2>

        <p className="text-zinc-400 mb-12">
          Open to engineering roles, collaborations, internships, and meaningful conversations.
        </p>

        {/* Social Buttons */}
        <div className="flex gap-6 mb-12">

          <a
            href="https://github.com/adityayadav161003"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-black border border-zinc-700 rounded-full hover:bg-zinc-800 transition-transform transform hover:-translate-y-1 hover:scale-105 animate-item"
            style={{ animationDelay: "120ms" }}
          >
            <Github size={20} />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/aditya-yadav-570846289/"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-black border border-zinc-700 rounded-full hover:bg-zinc-800 transition-transform transform hover:-translate-y-1 hover:scale-105 animate-item"
            style={{ animationDelay: "180ms" }}
          >
            <Linkedin size={20} />
            LinkedIn
          </a>

        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-10 text-zinc-300">

          <div className="animate-item" style={{ animationDelay: "240ms" }}>
            <p className="text-sm text-zinc-500 mb-1">Email</p>
            <a
              href="mailto:adity6946@gmail.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Mail size={16} />
              adity6946@gmail.com
            </a>
          </div>

          <div className="animate-item" style={{ animationDelay: "300ms" }}>
            <p className="text-sm text-zinc-500 mb-1">Phone</p>
            <a
              href="tel:+918318570426"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Phone size={16} />
              +91 8318570426
            </a>
          </div>

        </div>

      </div>

      {/* Scoped animations */}
      <style jsx>{`
        /* ...existing code... */
        .animate-card {
          opacity: 0;
          transform: translateY(14px) scale(.995);
          animation: cardIn 560ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        .animate-item {
          opacity: 0;
          transform: translateY(8px);
          animation: itemIn 480ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes itemIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* ...existing code... */
      `}</style>
    </section>
  )
}
