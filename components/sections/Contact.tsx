import SectionWrapper from "@/components/SectionWrapper"

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="text-center max-w-xl mx-auto">

        <h2 className="text-4xl font-bold mb-6">
          Let’s Connect.
        </h2>

        <p className="text-gray-400 mb-10">
          Open to internships, engineering roles,
          collaborations, and meaningful conversations.
        </p>

        <button className="
          px-8 py-3 rounded-full
          bg-white text-black font-medium
          hover:scale-105 transition
        ">
          Contact Me
        </button>

      </div>
    </SectionWrapper>
  )
}
