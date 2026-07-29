---
title: How This Blog Works
date: 2026-07-27
summary: One Markdown file, one post. Build it, and you get static HTML—that's all there is to it.
tags: [Note, Web]
---

All you need to write a post is to create a Markdown file inside `content/posts/`.
The file name becomes the URL—this post, being `hello.md`, is at `/blog/hello/`.

## Frontmatter

The content between the `---` at the very top of the file is the metadata.

| Key | Required | Description |
| --- | --- | --- |
| `title` | ✔ | Post title |
| `date` | ✔ | `YYYY-MM-DD`. Used for list sorting |
| `summary` | | A single line that appears in lists and search results |
| `tags` | | List of tags. `/tags/<tag>/` pages are automatically generated |
| `draft` | | If `true`, it's only visible on the development server and excluded from deployment |

If `date` is missing, the build will fail. It's better than silently defaulting to today's date.

## Code

Code blocks are colored with [shiki](https://shiki.style) during the build process. The browser
receives already colored HTML, so there's no JavaScript loaded just for highlighting.

```ts
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}
```

Both light and dark versions are included as CSS variables, and `prefers-color-scheme` is
used to select between them. So, there's no flickering even with a theme toggle—because there isn't one to begin with.

## Other

> Blockquotes appear like this.

- Lists
- also
- work

External links automatically open in a new tab, and each heading gets an anchor, so you can
link directly to addresses like `#frontmatter`.

---

You can create a new post's skeleton with `npm run new "Title"`.
