"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

function SubscribeModal({ onClose }: { onClose: () => void }) {
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
  const router = useRouter();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const post = (lang === "en" && enPost) ? enPost : koPost;
  const slug = koPost.slug;

  const [showSubscribe, setShowSubscribe] = useState(false);

  const setLang = (l: "ko" | "en") => {
    if (l === "ko") {
      router.push(`/blog/${slug}/`);
    } else {
      router.push(`/blog/${slug}/?lang=en`);
    }
  };

  return (
    <article className="shell">
      <PostSiteHeader lang={lang} />

      <div className="section-header">
        <div className="section-header-left">
          <Link href={lang === "en" ? "/?lang=en" : "/"} className="section-label">
            {lang === "en" ? "Posts" : "글"}
          </Link>
          <button className="subscribe-btn-text" onClick={() => setShowSubscribe(true)}>
            {lang === "en" ? "Subscribe" : "구독하기"}
          </button>
        </div>
        <div className="lang-toggle">
          <button
            className={lang === "ko" ? "lang-active" : "lang-inactive"}
            onClick={() => setLang("ko")}
          >
            한국어
          </button>
          <span className="lang-divider">/</span>
          <button
            className={lang === "en" ? "lang-active" : "lang-inactive"}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
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
        <SubscribeModal onClose={() => setShowSubscribe(false)} />
      )}
    </article>
  );
}

export default function PostClient({ koPost, enPost }: { koPost: Post; enPost: Post | null }) {
  return (
    <Suspense fallback={
      <article className="shell">
        <PostSiteHeader lang="ko" />
        <div className="section-header" />
        <header className="post-header">
          <h1>{koPost.title}</h1>
        </header>
      </article>
    }>
      <PostInner koPost={koPost} enPost={enPost} />
    </Suspense>
  );
}
