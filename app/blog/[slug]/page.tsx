import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate, getAdjacent, getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary || site.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || site.description,
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}/`,
      tags: [...post.tags],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <article className="shell">
      <header className="post-header">
        <h1>{post.title}</h1>
        {post.summary && <p className="post-summary">{post.summary}</p>}
        <div className="post-dateline">
          {formatDate(post.date)} · {post.readingMinutes}분
        </div>
        {post.tags.length > 0 && (
          <div className="tag-row">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/*
        본문은 빌드 타임에 우리가 만든 마크다운에서 나온 HTML이다.
        외부 입력이 섞이지 않으므로 그대로 주입한다.
      */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      {(prev || next) && (
        <nav className="post-nav">
          {prev && (
            <Link href={`/blog/${prev.slug}/`}>
              <span className="dir">이전 글</span>
              {prev.title}
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}/`} className="next">
              <span className="dir">다음 글</span>
              {next.title}
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
