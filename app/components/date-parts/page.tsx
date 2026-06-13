import Link from "next/link";
import { DatePartsDemo } from "@/components/ui/DateParts";

export const metadata = {
  title: "Date Parts - piakzakipika blog",
};

export default function DatePartsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/components"
        className="mb-8 block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← コンポーネント一覧
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Date Parts</h1>
      <p className="mb-10 text-gray-500 dark:text-gray-400">
        記事、イベント、更新履歴で使う日付表示と、日付入力の操作感を試す小さなパーツ。
      </p>

      <section className="mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-800">
          デモ
        </div>
        <DatePartsDemo />
      </section>

      <section className="prose prose-gray max-w-none dark:prose-invert">
        <h2>日付は小さいけれど、役割が多い</h2>
        <p>
          日付はただの文字列ではなく、記事の鮮度、予定の近さ、記録の順番を伝える。
          だから見た目のバリエーションを作るときも、必ず <code>time</code> と <code>dateTime</code>
          をセットにして、機械が読める形を残しておく。
        </p>
        <p>
          一覧では控えめに、イベントでは目印として強く、更新履歴では相対表現で距離感を出す。
          同じ日付でも、場面によって前に出す情報を変える。
        </p>
        <p>
          入力フォームはネイティブの日付入力をそのまま使い、前日・今日・翌日のボタンだけを足した。
          キーボードで直接入れる操作と、少しずつ日付を動かす操作の両方を比べられるようにしている。
        </p>
      </section>
    </main>
  );
}
