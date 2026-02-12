import { getPostBySlug, getAllPosts } from "@/lib/blog"

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

  const post = await getPostBySlug(slug)

  return (
    <main className="min-h-screen px-10 py-32 text-white">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  )
}
