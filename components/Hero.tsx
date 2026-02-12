"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-8 lg:px-24">

      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT SIDE — ICONIC IDENTITY */}
        <div className="space-y-10">

          <div className="leading-none">
            <h1 className="text-[80px] md:text-[120px] font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              ADITYA
            </h1>
            <h1 className="text-[80px] md:text-[120px] font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              YADAV
            </h1>
          </div>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Engineering v1.0 — Building scalable systems,
            thoughtful interfaces, and meaningful digital experiences.
          </p>

          <p className="text-sm text-gray-600 tracking-widest uppercase">
            Scroll ↓
          </p>

        </div>

        {/* RIGHT SIDE — CIRCULAR AVATAR */}
        <div className="flex justify-center lg:justify-end">

          <div className="relative w-[360px] h-[360px] rounded-full overflow-hidden border border-gray-800 shadow-2xl animate-float hover:scale-105 transition duration-500">



            <Image
              src="/meta-avatar.png"
              alt="Aditya Yadav"
              fill
              priority
              className="object-cover object-top"
            />

          </div>

        </div>

      </div>

    </section>
  )
}
