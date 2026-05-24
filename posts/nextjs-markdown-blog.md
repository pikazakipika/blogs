---
title: "Next.js + Markdown でブログを作った"
date: "2026-05-24"
description: "Next.js の App Router と Markdown を使ってブログを構築した記録です。"
tags: ["Next.js", "React", "Markdown", "技術"]
---

# Next.js + Markdown でブログを作った

このブログは **Next.js** と **Markdown** を使って構築しました。

## 使った技術

- [Next.js](https://nextjs.org/) — React フレームワーク
- [Tailwind CSS](https://tailwindcss.com/) — スタイリング
- [gray-matter](https://github.com/jonschlinkert/gray-matter) — Frontmatter のパース
- [remark](https://github.com/remarkjs/remark) — Markdown → HTML 変換

## 記事の書き方

`posts/` ディレクトリに `.md` ファイルを作るだけで記事が増えます。

```markdown
---
title: "記事タイトル"
date: "2026-05-24"
description: "記事の説明"
tags: ["タグ1", "タグ2"]
---

ここに本文を書く。
```

シンプルで書きやすい！
