import Link from "next/link";
import { AlertDemo } from "@/components/ui/Alert";

export const metadata = {
  title: "Alert — piakzakipika blog",
};

export default function AlertPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/components"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 block"
      >
        ← コンポーネント一覧
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Alert</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        ページ内に埋め込む通知バナー。操作の結果やシステムの状態をユーザーに伝える。
      </p>

      <section className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-10">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs text-gray-400 border-b border-gray-200 dark:border-gray-700">
          デモ
        </div>
        <AlertDemo />
      </section>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2>疑問に思ったことをAIとすり合わせてみた</h2>

        <h3>4種類も必要か</h3>
        <p>
          最初は error / info の2種類に絞ることを考えた。warningはerrorで代替できるし、successはinfoで代替できるのでは、と思ったから。ただ実際に当てはめてみると、「セッションの有効期限が近づいています」をerrorで出すのは過剰で、ユーザーが焦る。「設定を保存しました」をinfoで出すと、成功したのかどうかがぱっと読み取れない。
        </p>
        <p>
          4種類の差は見た目ではなく「ユーザーが取るべき行動の違い」だと整理した。errorは今すぐ対処が必要、warningは放置してもいいが意識しておく必要がある、infoは読むだけでいい、successは確認するだけでいい。この4段階を色とアイコンで即座に伝えるために、種類が必要になる。
        </p>

        <h3>dismissible（閉じられる）にすべきかどうか</h3>
        <p>
          × ボタンで閉じるのは「読んだ、もう見なくていい」という操作。successとinfoはそれが自然なので dismissible にした。
        </p>
        <p>
          errorは dismissible にしなかった。最初は「読んだあとに消したいこともある」と思って × ボタンをつけていたが、このデモのerrorは「再試行してください」という文言なので、消えるタイミングは再試行が成功したときであるべきだと気づいた。× ボタンで消してしまうと、問題がまだ残っているのにユーザーが忘れてしまう。
        </p>
        <p>
          warningも dismissible にしていないが、errorとは理由が少し違う。errorは「ユーザーの操作（再試行）が成功したら消える」という能動的なもの。warningは「時間や状態が変わったら消える」という受動的なもの。どちらも「× ボタンで消す」のではなく、「状態が解消されたら消える」という設計が誠実だという点では同じ。
        </p>

        <h3>Snackbarとの違い</h3>
        <p>
          Snackbarは画面の外に浮かせて、自動で消える。Alertはコンテンツの中に置いて、消えない。なぜこの差があるかというと、伝えたい情報の性質が違うから。
        </p>
        <p>
          Snackbarが伝えるのは「今起きたこと」で、数秒後には関係なくなる情報。画面の外に浮かせるのは、読んでいるコンテンツを邪魔しないため。Alertが伝えるのは「このページの今の状態」で、状態が続く限り見えていないといけない。コンテンツの一部として置くのは、「このフォームには今エラーがある」という文脈と切り離せないから。
        </p>

        <h3>アイコンは必須か</h3>
        <p>
          色だけでも4種類は区別できるが、色覚多様性のあるユーザーには伝わらないことがある。たとえば赤と緑は混同されやすく、errorとsuccessが同じに見えてしまう可能性がある。アイコンがあると色に依存せず意味が読み取れる。
        </p>
        <p>
          一方、アイコンが「見えない」状況もある。スクリーンリーダーを使っているユーザーは画面を目で見ない。このコンポーネントではアイコンを装飾として扱い、代わりに「エラー」「警告」「お知らせ」「成功」という種別をスクリーンリーダー向けのテキストで伝える。さらに <code>role=&quot;alert&quot;</code> や <code>role=&quot;status&quot;</code> と <code>aria-live</code> を使い、重要度に応じて読み上げられるようにした。
        </p>
      </section>
    </main>
  );
}
