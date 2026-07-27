import Image from "next/image";
import Link from "next/link";

import { formatDate, getAllPosts } from "@/lib/posts";
import { site } from "@/site.config";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="shell">
      <section className="intro">
        <h1 className="intro-name">{site.author}</h1>
        <p className="intro-desc">{site.description}</p>
        <div className="intro-links">
          {site.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <section>
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
                <Link href={`/blog/${post.slug}/`} className="post-card">
                  <div className="post-card-body">
                    <div className="post-title">
                      {post.draft && <span style={{ color: "var(--faint)" }}>[초안] </span>}
                      {post.title}
                    </div>
                    {post.summary && <div className="post-summary">{post.summary}</div>}
                    <div className="post-dateline">
                      {formatDate(post.date)} · {post.readingMinutes}분
                    </div>
                  </div>
                  {post.cover && (
                    <div className="post-card-thumb">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        width={120}
                        height={80}
                        style={{ objectFit: "cover", borderRadius: "6px", width: "100%", height: "100%" }}
                      />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
