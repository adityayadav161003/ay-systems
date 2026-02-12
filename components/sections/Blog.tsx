import SectionWrapper from "@/components/SectionWrapper"

export default function Blog() {
  return (
    <SectionWrapper id="blog">
      <h2 className="text-4xl font-bold mb-10">
        Writing & Thoughts.
      </h2>

      <div className="space-y-8">

        <div className="border-b border-white/10 pb-6">
          <h3 className="text-xl font-semibold mb-2 hover:text-gray-300 transition">
            First Blog Title
          </h3>
          <p className="text-gray-400 text-sm">
            Placeholder description for engineering reflection.
          </p>
        </div>

        <div className="border-b border-white/10 pb-6">
          <h3 className="text-xl font-semibold mb-2 hover:text-gray-300 transition">
            Second Blog Title
          </h3>
          <p className="text-gray-400 text-sm">
            Placeholder for technical deep dive.
          </p>
        </div>

      </div>
    </SectionWrapper>
  )
}
