"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export function Snackbar({ message, duration = 3000, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);
    const hide = setTimeout(() => setVisible(false), duration - 300);
    const close = setTimeout(onClose, duration);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(close);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {message}
    </div>
  );
}

export function SnackbarDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <button
        onClick={() => setOpen(true)}
        disabled={open}
        className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-40 transition-colors"
      >
        スナックバーを表示
      </button>
      {open && (
        <Snackbar message="保存しました" onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
