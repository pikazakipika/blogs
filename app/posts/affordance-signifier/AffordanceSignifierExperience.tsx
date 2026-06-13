"use client";

import { useMemo, useState } from "react";

type Mode = "bare" | "signed";
type Event = {
  label: string;
  kind: "hit" | "miss" | "blocked";
};

const feedbackStyle: Record<Event["kind"], string> = {
  hit: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  miss: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
  blocked: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
};

function Meter({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700" aria-hidden="true">
      <div
        className="h-full rounded-full bg-emerald-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function AffordanceSignifierDemo() {
  const [mode, setMode] = useState<Mode>("bare");
  const [events, setEvents] = useState<Event[]>([]);
  const [slider, setSlider] = useState(18);
  const [pressed, setPressed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const score = useMemo(() => {
    const hits = events.filter((event) => event.kind === "hit").length;
    return Math.min(100, hits * 25 + (slider > 70 ? 25 : 0) + (drawerOpen ? 25 : 0));
  }, [drawerOpen, events, slider]);

  function addEvent(event: Event) {
    setEvents((current) => [event, ...current].slice(0, 4));
  }

  function reset() {
    setEvents([]);
    setSlider(18);
    setPressed(false);
    setDrawerOpen(false);
  }

  const signed = mode === "signed";

  return (
    <div className="p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            さわれる手がかりを切り替える
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            まずは素の状態で探して、次にシグニファイアを足して比べる。
          </p>
        </div>

        <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-white p-1 text-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setMode("bare")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              mode === "bare"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            手がかり少なめ
          </button>
          <button
            type="button"
            onClick={() => setMode("signed")}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              mode === "signed"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            手がかり多め
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          aria-label={signed ? "押して保存" : "保存"}
          onClick={() => {
            setPressed(true);
            addEvent({ label: "平たい文字は、実は押せた。", kind: "hit" });
          }}
          className={`min-h-36 rounded-lg border p-4 text-left transition-all ${
            signed
              ? "border-emerald-300 bg-emerald-50 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-800 dark:bg-emerald-950"
              : "border-transparent bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
          }`}
        >
          <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            {signed ? "押して保存" : "保存"}
          </span>
          <span className="mt-3 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {signed
              ? "影、枠、動詞があるので、操作できることが読み取りやすい。"
              : "機能としては押せる。でも見た目はただの見出しに近い。"}
          </span>
          {pressed && (
            <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
              保存済み
            </span>
          )}
        </button>

        <div
          className={`min-h-36 rounded-lg border p-4 transition-all ${
            signed
              ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
              : "border-slate-300 bg-white shadow-md dark:border-slate-600 dark:bg-slate-900"
          }`}
          onClick={() => addEvent({ label: "押せそうに見えたが、何も起きない面だった。", kind: "blocked" })}
          role="presentation"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {signed ? "状態表示" : "完了"}
            </p>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              static
            </span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {signed
              ? "これは押す対象ではない、というラベルがある。見た目の誘いを弱めている。"
              : "影と余白があるせいで、押せるカードに見える。これは紛らわしいシグニファイア。"}
          </p>
        </div>

        <div className="min-h-36 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <label
            htmlFor="affordance-slider"
            className="block text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            {signed ? "つまみを右へ動かす" : "強さ"}
          </label>
          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {signed
              ? "レール、つまみ、方向の言葉が、横に動かせることを示している。"
              : "スライダー自体の形が、ドラッグできるというアフォーダンスを持っている。"}
          </p>
          <input
            id="affordance-slider"
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(event) => {
              const value = Number(event.target.value);
              setSlider(value);
              if (value > 70) {
                addEvent({ label: "つまみを動かせた。形そのものが操作を誘った。", kind: "hit" });
              }
            }}
            className="mt-5 w-full accent-emerald-600"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>弱い</span>
            <span>{slider}%</span>
            <span>強い</span>
          </div>
        </div>

        <div className="min-h-36 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            aria-expanded={drawerOpen}
            aria-label={signed ? "引き出しを開く" : "詳細"}
            onClick={() => {
              setDrawerOpen((open) => !open);
              addEvent({ label: "取っ手を見つけて開閉できた。", kind: "hit" });
            }}
            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
              signed
                ? "border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                : "border-transparent bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {signed ? "引き出しを開く" : "詳細"}
            </span>
            <span
              className={`text-slate-400 transition-transform ${drawerOpen ? "rotate-90" : ""}`}
              aria-hidden="true"
            >
              &gt;
            </span>
          </button>
          <div className={`grid transition-all ${drawerOpen ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              {drawerOpen && (
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  右端の記号は「ここを動かすと展開する」というシグニファイアとして働く。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">操作の読み取りやすさ</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
          >
            リセット
          </button>
        </div>
        <Meter value={score} />
        <ul className="mt-3 space-y-2" aria-live="polite">
          {events.length === 0 ? (
            <li className="text-xs text-slate-500 dark:text-slate-400">
              どこを触ればよいか、まずは目で探してみる。
            </li>
          ) : (
            events.map((event, index) => (
              <li
                key={`${event.label}-${index}`}
                className={`rounded-md border px-3 py-2 text-xs ${feedbackStyle[event.kind]}`}
              >
                {event.label}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
