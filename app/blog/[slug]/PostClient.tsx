"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { site } from "@/site.config";

function PostSiteHeader({ lang }: { lang: "ko" | "en" }) {
  const homeHref = lang === "en" ? "/?lang=en" : "/";
  const description = lang === "en"
    ? "A place to take thoughts out and keep them."
    : site.description;

  return (
    <div className="post-site-header">
      <Link href={homeHref} className="post-site-title">{site.title}</Link>
      <p className="post-site-description">{description}</p>
    </div>
  );
}

function SubscribeModal({ onClose, lang }: { onClose: () => void; lang: string }) {
  return (
    <div className="subscribe-overlay" onClick={onClose}>
      <div className="subscribe-modal" onClick={(e) => e.stopPropagation()}>
        <button className="subscribe-close" onClick={onClose} aria-label="닫기">✕</button>
        <iframe
          src="https://sangrok2lee.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: "1px solid #EEE", background: "white", display: "block" }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
}

function PostInner({ koPost, enPost }: { koPost: Post; enPost: Post | null }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const post = (lang === "en" && enPost) ? enPost : koPost;
  const langSuffix = lang === "en" ? "?lang=en" : "";
  const backLabel = lang === "en" ? "← Back to Posts" : "← 글 목록으로 돌아가기";
  const subscribeLabel = lang === "en" ? "Subscribe" : "구독하기";
  const prevLabel = lang === "en" ? "Previous" : "이전 글";
  const nextLabel = lang === "en" ? "Next" : "다음 글";

  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <article className="shell">
      <PostSiteHeader lang={lang} />
      <div className="post-back">
        <Link href={`/${langSuffix}`}>{backLabel}</Link>
        <button className="subscribe-btn-text" onClick={() => setShowSubscribe(true)}>
          {subscribeLabel}
        </button>
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

      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} lang={lang} />
      )}
    </article>
  );
}

export default function PostClient({ koPost, enPost }: { koPost: Post; enPost: Post | null }) {
  return (
    <Suspense fallback={
      <article className="shell">
        <PostSiteHeader lang="ko" />
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
