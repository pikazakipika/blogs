import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">piakzakipika blog</h1>
        <p className="text-gray-500 dark:text-gray-400">思ったことを書く場所</p>
        <Link
          href="/components"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:border-gray-300 dark:hover:bg-gray-900"
        >
          実験場
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <section>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <Link href={`/posts/${post.slug}`} className="group">
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{post.description}</p>
                </Link>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
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
