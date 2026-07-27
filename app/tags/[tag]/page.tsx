import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate, getAllPosts, getAllTags } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(tag));
  if (posts.length === 0) notFound();

  return (
    <div className="shell">
      <section className="intro">
        <h1>#{tag}</h1>
        <p>{posts.length}편.</p>
      </section>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`}>
              <div className="post-title">{post.title}</div>
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
