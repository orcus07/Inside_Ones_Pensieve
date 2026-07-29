"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function PostInner({ koPost, enPost }: { koPost: Post; enPost: Post | null }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const post = (lang === "en" && enPost) ? enPost : koPost;
  const langSuffix = lang === "en" ? "?lang=en" : "";
  const backLabel = lang === "en" ? "← Back to Posts" : "← 글 목록으로 돌아가기";
  const prevLabel = lang === "en" ? "Previous" : "이전 글";
  const nextLabel = lang === "en" ? "Next" : "다음 글";

  return (
    <article className="shell">
      <div className="post-back">
        <Link href={`/${langSuffix}`}>{backLabel}</Link>
      </div>
      <header className="post-header">
        <h1>{post.title}</h1>
        {post.summary && <p className="post-summary">{post.summary}</p>}
        <div className="post-dateline">
          {formatDate(post.date, lang)} · {post.readingMinutes}{lang === "en" ? " min" : "분"}
        </div>
        {post.tags.length > 0 && (
          <div className="tag-row">
            {post.tags.map((tag: string) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.cover && (
        <div className="post-cover">
          <Image
            src={post.cover}
            alt={post.title}
            width={800}
            height={450}
            style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      )}
    </article>
  );
}

export default function PostClient({ koPost, enPost }: { koPost: Post; enPost: Post | null }) {
  return (
    <Suspense fallback={
      <article className="shell">
        <div className="post-back" />
        <header className="post-header">
          <h1>{koPost.title}</h1>
        </header>
      </article>
    }>
      <PostInner koPost={koPost} enPost={enPost} />
    </Suspense>
  );
}
