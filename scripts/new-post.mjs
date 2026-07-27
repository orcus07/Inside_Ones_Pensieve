#!/usr/bin/env node
/**
 * 새 글 뼈대 생성.
 *
 *   npm run new "제목"            -> content/posts/<slug>.md
 *   npm run new "제목" my-slug    -> 파일명을 직접 지정
 *
 * 슬러그가 곧 주소(/blog/<slug>/)라서 한글 제목이면 직접 넘기는 편이 낫다.
 */
import fs from "node:fs";
import path from "node:path";

const [title, explicitSlug] = process.argv.slice(2);

if (!title) {
  console.error('사용법: npm run new "글 제목" [슬러그]');
  process.exit(1);
}

const slugify = (s) =>
  s.toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "_");

const slug = explicitSlug ?? slugify(title);
const dir = path.join(process.cwd(), "content", "posts");
const file = path.join(dir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`이미 있다: content/posts/${slug}.md`);
  process.exit(1);
}

// 로컬 자정 기준 YYYY-MM-DD. toISOString() 은 UTC라 한국에서 하루 밀린다.
const today = new Date();
const date = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  file,
  `---
title: ${title}
date: ${date}
summary:
tags: []
draft: true
---

`,
  "utf8",
);

console.log(`content/posts/${slug}.md`);
console.log(`→ http://localhost:3000/blog/${slug}/`);
