import Link from "next/link";
import { SnackbarDemo } from "@/components/ui/Snackbar";

export const metadata = {
  title: "Snackbar — piakzakipika blog",
};

export default function SnackbarPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/components"
        className="text-sm text-blue-600 hover:underline mb-8 block"
      >
        ← コンポーネント一覧
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Snackbar</h1>
      <p className="text-gray-500 mb-10">
        一時的なフィードバックを画面下に表示するコンポーネント。
      </p>

      <section className="border border-gray-200 rounded-xl overflow-hidden mb-10">
        <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 border-b border-gray-200">
          デモ
        </div>
        <SnackbarDemo />
      </section>

      <section className="prose prose-gray max-w-none">
        <h2>疑問に思ったことをAIとすり合わせてみた</h2>

        <h3>そもそもスナックバーはいつ必要か</h3>
        <p>
          保存ボタンを押して画面が切り替わるなら、スナックバーは不要だと思う。画面遷移そのものが「処理された」というフィードバックになっているから。
        </p>
        <p>
          スナックバーが意味を持つのは、操作しても見た目がほとんど変わらないときになりそう。自動保存、いいね、設定のトグルなど。何も反応がないと「ちゃんと動いた？」と不安になる。その不安を消すのがスナックバーの役割。
        </p>

        <h3>フィードバックは言葉じゃなくていい</h3>
        <p>
          傾聴のうなずきに近いと思った。話し手は「わかります」と言われなくても、うなずきで伝わったとわかる。むしろ「わかります、聞こえています」と毎回言われたら過剰だもん。
        </p>
        <p>
          「保存しました」というテキストも同じで、小さいアニメーションや絵文字で十分なこともありそう。ただしフィードバックの受け取り方は人によって違うので、初めて使う人や業務システムでは言葉の方が確実に伝わるということで理解した。ユーザーをよく知っているほど、より自然なフィードバックに絞れるんだろうな。
        </p>

        <h3>なぜボタンの近くではなく画面下なのか</h3>
        <p>
          本来ならボタンを押した近くに出る方が「このボタンの結果だ」というつながりが明確。ただ保存ボタンの位置はページによってバラバラなので、画面下固定にすることで「どこにボタンがあっても同じ場所に出る」という割り切りがしやすい。ボタンの近くに出す方式はTooltipやPopoverと呼ばれる別のコンポーネントに近い。
        </p>
      </section>
    </main>
  );
}
