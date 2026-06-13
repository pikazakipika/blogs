import Link from "next/link";
import { AffordanceSignifierDemo } from "./AffordanceSignifierExperience";

export const metadata = {
  title: "Affordance / Signifierって何か模索中 - piakzakipika blog",
};

export default function AffordanceSignifierPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← ホームに戻る
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Affordance / Signifierって何か模索中
      </h1>
      <p className="mb-10 text-gray-500 dark:text-gray-400">
        「誰のためのデザイン？」を読んで知った言葉を、まだよくわからないまま手で確かめてみる。
      </p>

      <section className="mb-10 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-800">
          デモ
        </div>
        <AffordanceSignifierDemo />
      </section>

      <section className="prose prose-gray max-w-none dark:prose-invert">
        <h2>きっかけ</h2>
        <p>
          最近「誰のためのデザイン？」を読んで、Affordance と Signifier という言葉を知った。
          なんとなく「押せそう」「動かせそう」みたいな話だとは思ったけれど、読んだだけだとまだ自分の中で輪郭がぼんやりしている。
        </p>
        <p>
          そこで今日は、それがいったい何なのかを体感してみたくて、小さなUIを作ってみた。
          正しく説明するというより、触りながら「これはできることなのか」「それに気づくための合図なのか」を分けて考えるための実験。
        </p>

        <h2>疑問に思ったことをUIとすり合わせてみる</h2>

        <h3>アフォーダンスは「できること」</h3>
        <p>
          スライダーのつまみは横に動かせる。ボタンは押せる。そういう、対象が持っている行為の可能性がアフォーダンス。
          ただし、可能性があってもユーザーがそれに気づけるとは限らない。
        </p>

        <h3>シグニファイアは「気づくための手がかり」</h3>
        <p>
          影、枠、矢印、ラベル、ホバー時の変化、動詞のテキストは、操作できる場所を知らせる。
          これらはアフォーダンスそのものではなく、アフォーダンスを見つけやすくする合図として働く。
        </p>

        <h3>強すぎる手がかりは誤解も生む</h3>
        <p>
          影のついたカードは押せそうに見える。けれど、実際には状態表示だけかもしれない。
          見た目が操作を約束しているのに反応しないと、ユーザーは「壊れているのかな」と感じる。
          だから、押せるものは押せるように見せ、押せないものは押せないように見せる必要がある。
        </p>
      </section>
    </main>
  );
}
