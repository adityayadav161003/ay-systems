import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) return notFound()

  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <main className="min-h-screen px-6 md:px-20 py-24 text-white">
      <article className="prose prose-invert max-w-3xl">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  )
}
