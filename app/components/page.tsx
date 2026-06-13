import Link from "next/link";

export const metadata = {
  title: "Components — piakzakipika blog",
};

const components = [
  {
    slug: "snackbar",
    name: "Snackbar",
    description: "一時的なフィードバックを画面下に表示する",
  },
  {
    slug: "alert",
    name: "Alert",
    description: "操作の結果やシステムの状態をページ内に表示する",
  },
  {
    slug: "date-parts",
    name: "Date Parts",
    description: "記事、イベント、更新履歴で使う日付表示の小さなパーツ",
  },
];

export default function ComponentsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 block">
        ← ホームに戻る
      </Link>

      <header className="mb-12">
        <h1 className="components-page-strong text-3xl font-bold mb-2">Components</h1>
        <p className="components-page-muted">UIコンポーネントを1日1個作って、なぜそのデザインなのかを考える。</p>
      </header>

      <ul className="space-y-4">
        {components.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/components/${c.slug}`}
              className="components-page-card group flex items-center justify-between border rounded-xl px-5 py-4 transition-colors"
            >
              <div>
                <p className="components-page-strong font-semibold">
                  {c.name}
                </p>
                <p className="components-page-muted text-sm mt-0.5">{c.description}</p>
              </div>
              <span className="components-page-arrow transition-colors">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
