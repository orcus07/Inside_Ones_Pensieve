import type { Metadata } from "next";
import Link from "next/link";

import { formatDate, getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "글",
  description: "쓴 글 전부.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="shell">
      <section className="intro">
        <h1>글</h1>
        <p>{posts.length}편.</p>
        {tags.length > 0 && (
          <div className="tag-row">
            {tags.map(({ tag, count }) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`} className="tag">
                {tag} {count}
              </Link>
            ))}
          </div>
        )}
      </section>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`}>
              <div className="post-title">
                {post.draft && <span style={{ color: "var(--faint)" }}>[초안] </span>}
                {post.title}
              </div>
              {post.summary && <div className="post-summary">{post.summary}</div>}
              <div className="post-dateline">
                {formatDate(post.date)} · {post.readingMinutes}분
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
