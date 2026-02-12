import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen px-10 py-32 text-white">
      <h1 className="text-4xl font-bold mb-12">All Articles</h1>

      {posts.map((post) => (
        <div key={post.slug} className="mb-10">
          <Link
            href={`/blog/${post.slug}`}
            className="text-2xl font-semibold hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-gray-400">{post.description}</p>
        </div>
      ))}
    </main>
  )
}
