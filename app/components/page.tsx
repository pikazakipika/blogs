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
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-8 block">
        ← ホームに戻る
      </Link>

      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Components</h1>
        <p className="text-gray-500">UIコンポーネントを1日1個作って、なぜそのデザインなのかを考える。</p>
      </header>

      <ul className="space-y-4">
        {components.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/components/${c.slug}`}
              className="group flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-400 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{c.description}</p>
              </div>
              <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
