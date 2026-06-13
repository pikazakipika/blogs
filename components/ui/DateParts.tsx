"use client";

import { useState } from "react";

type DatePartVariant = "inline" | "badge" | "stacked" | "relative";

type DatePartsProps = {
  date: string;
  variant?: DatePartVariant;
  referenceDate?: string;
};

const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("ja-JP", {
  weekday: "short",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

function parseDate(value: string) {
  return new Date(`${value}T00:00:00+09:00`);
}

function isDateValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(parseDate(value).getTime());
}

function shiftDate(value: string, amount: number) {
  if (!isDateValue(value)) return "2026-06-13";

  const nextDate = parseDate(value);
  nextDate.setDate(nextDate.getDate() + amount);
  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toMachineDate(value: string) {
  return value;
}

function toDisplayDate(value: string) {
  return formatter.format(parseDate(value)).replace(/\//g, ".");
}

function toRelativeDate(value: string, referenceDate: string) {
  const day = 24 * 60 * 60 * 1000;
  const diff = Math.round((parseDate(referenceDate).getTime() - parseDate(value).getTime()) / day);

  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  if (diff > 1) return `${diff}日前`;
  if (diff === -1) return "明日";
  return `${Math.abs(diff)}日後`;
}

export function DateParts({
  date,
  variant = "inline",
  referenceDate = "2026-06-13",
}: DatePartsProps) {
  const parsed = parseDate(date);
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = monthFormatter.format(parsed).toUpperCase();
  const weekday = weekdayFormatter.format(parsed);
  const machineDate = toMachineDate(date);
  const displayDate = toDisplayDate(date);

  if (variant === "badge") {
    return (
      <time
        dateTime={machineDate}
        className="inline-grid h-16 w-16 place-items-center rounded-lg border border-slate-200 bg-white text-center shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">
          {month}
        </span>
        <span className="-mt-2 text-2xl font-bold leading-none text-slate-900 dark:text-slate-100">
          {day}
        </span>
      </time>
    );
  }

  if (variant === "stacked") {
    return (
      <time dateTime={machineDate} className="inline-flex flex-col">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{displayDate}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{weekday}曜日</span>
      </time>
    );
  }

  if (variant === "relative") {
    return (
      <time
        dateTime={machineDate}
        title={displayDate}
        className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        {toRelativeDate(date, referenceDate)}
      </time>
    );
  }

  return (
    <time dateTime={machineDate} className="text-sm text-slate-500 dark:text-slate-400">
      {displayDate}
    </time>
  );
}

export function DatePartsDemo() {
  const [inputDate, setInputDate] = useState("2026-06-13");
  const previewDate = isDateValue(inputDate) ? inputDate : "";
  const updateInputDate = (value: string) => setInputDate(value);
  const examples = [
    {
      title: "記事一覧",
      description: "本文より弱く、でも日付として機械にも伝わる表示。",
      date: previewDate,
      variant: "inline" as const,
    },
    {
      title: "イベント",
      description: "日付そのものを視覚的な目印にする表示。",
      date: previewDate,
      variant: "badge" as const,
    },
    {
      title: "詳細ページ",
      description: "曜日まで含めて、予定として読みやすくする表示。",
      date: previewDate,
      variant: "stacked" as const,
    },
    {
      title: "更新履歴",
      description: "絶対日付は title に残しつつ、距離感を先に伝える表示。",
      date: previewDate,
      variant: "relative" as const,
    },
  ];

  return (
    <div className="grid gap-3 p-5 sm:p-6">
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              日付を入力する
            </span>
            <input
              type="date"
              value={inputDate}
              onChange={(event) => updateInputDate(event.target.value)}
              onInput={(event) => updateInputDate(event.currentTarget.value)}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-950"
            />
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setInputDate((current) => shiftDate(current, -1))}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              前日
            </button>
            <button
              type="button"
              onClick={() => setInputDate("2026-06-13")}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              今日
            </button>
            <button
              type="button"
              onClick={() => setInputDate((current) => shiftDate(current, 1))}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              翌日
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400" aria-live="polite">
          {previewDate
            ? `入力値 ${previewDate} を下の表示に反映しています。`
            : "日付が空です。入力すると下の表示に反映されます。"}
        </p>
      </section>

      {examples.map((example) => (
        <article
          key={example.title}
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[5rem_1fr] sm:items-center dark:border-slate-700 dark:bg-slate-950"
        >
          <div className="min-h-16">
            {example.date ? (
              <DateParts date={example.date} variant={example.variant} />
            ) : (
              <span className="text-sm text-slate-400">未入力</span>
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{example.title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {example.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
