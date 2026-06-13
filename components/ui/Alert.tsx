"use client";

import { useId, useState } from "react";

type Variant = "error" | "warning" | "info" | "success";

type Props = {
  variant: Variant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
};

const styles: Record<Variant, { container: string; icon: string }> = {
  error: {
    container: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    icon: "text-red-500 dark:text-red-400",
  },
  warning: {
    container: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    icon: "text-yellow-500 dark:text-yellow-400",
  },
  info: {
    container: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    icon: "text-blue-500 dark:text-blue-400",
  },
  success: {
    container: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    icon: "text-green-500 dark:text-green-400",
  },
};

const accessibility: Record<
  Variant,
  { label: string; role: "alert" | "status"; live: "assertive" | "polite" }
> = {
  error: {
    label: "エラー",
    role: "alert",
    live: "assertive",
  },
  warning: {
    label: "警告",
    role: "alert",
    live: "assertive",
  },
  info: {
    label: "お知らせ",
    role: "status",
    live: "polite",
  },
  success: {
    label: "成功",
    role: "status",
    live: "polite",
  },
};

function Icon({ variant }: { variant: Variant }) {
  if (variant === "error") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm.75 7.5a.875.875 0 100-1.75.875.875 0 000 1.75z" clipRule="evenodd" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5.75zm.875 7.375a.875.875 0 11-1.75 0 .875.875 0 011.75 0z" clipRule="evenodd" />
      </svg>
    );
  }
  if (variant === "info") {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a.75.75 0 01-.75-.75V10a.75.75 0 011.5 0v4.25A.75.75 0 0110 15z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

export function Alert({ variant, title, children, dismissible = false }: Props) {
  const id = useId();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const { container, icon } = styles[variant];
  const { label, role, live } = accessibility[variant];
  const labelId = `${id}-label`;
  const titleId = `${id}-title`;
  const contentId = `${id}-content`;
  const labelledBy = title ? `${labelId} ${titleId}` : labelId;

  return (
    <div
      role={role}
      aria-live={live}
      aria-atomic="true"
      aria-labelledby={labelledBy}
      aria-describedby={contentId}
      className={`flex gap-3 border rounded-lg px-4 py-3 text-sm ${container}`}
    >
      <span className={icon} aria-hidden="true">
        <Icon variant={variant} />
      </span>

      <div className="flex-1 min-w-0">
        <span id={labelId} className="sr-only">
          {label}:
        </span>
        {title && (
          <p id={titleId} className="font-semibold mb-0.5">
            {title}
          </p>
        )}
        <div id={contentId}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          aria-label={`${label}を閉じる`}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Alert variant="error" title="送信に失敗しました">
        サーバーに接続できませんでした。しばらく経ってから再試行してください。
      </Alert>
      <Alert variant="warning" title="セッションの有効期限が近づいています">
        あと5分でログアウトされます。作業中のデータを保存してください。
      </Alert>
      <Alert variant="info" dismissible>
        このページの内容は毎日0時に自動更新されます。
      </Alert>
      <Alert variant="success" title="設定を保存しました" dismissible>
        変更内容が反映されました。
      </Alert>
    </div>
  );
}
