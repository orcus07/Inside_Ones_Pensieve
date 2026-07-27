/**
 * 콘텐츠 레이어. `content/posts/*.md` 를 읽어 목록·본문 HTML로 바꾼다.
 *
 * 전부 빌드 타임에만 돈다(`output: "export"`). 런타임 DB도, CMS도 없다 —
 * 글은 마크다운 파일이고 배포는 그 파일들을 렌더한 결과다.
 */
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { Marked } from "marked";
import { codeToHtml } from "shiki";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** 초안(`draft: true`)은 개발 서버에서만 보인다. */
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

export type PostMeta = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  /** 글 커버 이미지 경로 (선택) */
  cover?: string;
};

export type Post = PostMeta & { html: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * 제목 → 앵커 id. 한글을 살려야 해서 `\w` 대신 유니코드 글자 범주를 쓴다.
 */
const slugifyHeading = (s: string) =>
  s.toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");

/**
 * 읽는 시간. 한글은 단어 수보다 글자 수가 잘 맞아서 분당 500자로 잡는다.
 */
const readingMinutes = (markdown: string) => {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`~\[\]()]/g, "");
  return Math.max(1, Math.round(plain.replace(/\s/g, "").length / 500));
};

async function highlight(code: string, lang: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
      // 색을 인라인으로 박지 않고 CSS 변수로 흘린다 — globals.css 가 라이트/
      // 다크를 고른다.
      defaultColor: false,
    });
  } catch {
    // shiki 가 모르는 언어면 하이라이팅 없이 그대로 둔다.
    return `<pre class="shiki-plain"><code>${escapeHtml(code)}</code></pre>`;
  }
}

function createRenderer() {
  const marked = new Marked({ gfm: true });

  marked.use({
    async: true,
    async walkTokens(token) {
      if (token.type === "code") {
        const lang = (token.lang || "text").split(/\s+/)[0] || "text";
        token.text = await highlight(token.text, lang);
        token.escaped = true;
      }
    },
    renderer: {
      // walkTokens 가 이미 하이라이팅된 HTML을 넣어줬으면 그대로 통과시킨다.
      code({ text, escaped }) {
        return escaped
          ? text
          : `<pre class="shiki-plain"><code>${escapeHtml(text)}</code></pre>`;
      },
      heading(token) {
        const inner = this.parser.parseInline(token.tokens);
        const id = slugifyHeading(inner);
        const d = token.depth;
        return `<h${d} id="${id}"><a class="anchor" href="#${id}">${inner}</a></h${d}>\n`;
      },
      link(token) {
        const inner = this.parser.parseInline(token.tokens);
        const href = escapeHtml(token.href);
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        // 바깥으로 나가는 링크는 새 탭에서, 그리고 rel 을 붙여서 연다.
        const external = /^https?:\/\//.test(token.href);
        const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : "";
        return `<a href="${href}"${title}${attrs}>${inner}</a>`;
      },
    },
  });

  return marked;
}

const renderer = createRenderer();

function readAll(): Array<{ slug: string; data: matter.GrayMatterFile<string> }> {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      data: matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8")),
    }));
}

function toMeta(slug: string, file: matter.GrayMatterFile<string>): PostMeta {
  const fm = file.data as Record<string, unknown>;
  const date = fm.date instanceof Date
    ? fm.date.toISOString().slice(0, 10)
    : String(fm.date ?? "");

  if (!date) throw new Error(`content/posts/${slug}.md: 프런트매터에 date 가 없다.`);

  return {
    slug,
    title: String(fm.title ?? slug),
    date,
    summary: String(fm.summary ?? ""),
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    draft: fm.draft === true,
    readingMinutes: readingMinutes(file.content),
    cover: typeof fm.cover === "string" ? fm.cover : undefined,
  };
}

/** 최신순 글 목록. 초안은 프로덕션 빌드에서 빠진다. */
export function getAllPosts(): PostMeta[] {
  return readAll()
    .map(({ slug, data }) => toMeta(slug, data))
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPost(slug: string): Promise<Post | null> {
  const found = readAll().find((f) => f.slug === slug);
  if (!found) return null;

  const meta = toMeta(found.slug, found.data);
  if (meta.draft && !SHOW_DRAFTS) return null;

  // 넓은 표가 페이지를 가로로 밀지 않도록 스크롤 컨테이너로 감싼다.
  const html = (await renderer.parse(found.data.content))
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return { ...meta, html };
}

/** 글 하단 이전/다음 링크용. 목록과 같은 최신순 정렬을 기준으로 한다. */
export function getAdjacent(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    // 목록이 최신순이므로 인덱스가 큰 쪽이 더 예전 글이다.
    prev: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  };
}

/** `2026-07-27` → `2026년 7월 27일` */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}
