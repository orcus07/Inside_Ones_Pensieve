import Link from "next/link";

import { formatDate, getAllPosts } from "@/lib/posts";
import { site } from "@/site.config";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="shell">
      <section className="intro">
        <h1>{site.title}</h1>
        <p>{site.description}</p>
      </section>

      <p className="section-label">글</p>

      {posts.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>
          아직 쓴 글이 없다. <code>content/posts/</code> 에 마크다운을 하나
          넣으면 여기 나타난다.
        </p>
      ) : (
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
      )}
    </div>
  );
}
