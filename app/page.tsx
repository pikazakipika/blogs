import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">piakzakipika blog</h1>
        <p className="text-gray-500">思ったことを書く場所</p>
      </header>

      <section>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <Link href={`/posts/${post.slug}`} className="group">
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">{post.description}</p>
                </Link>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
