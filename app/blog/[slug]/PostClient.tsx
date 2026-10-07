"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import type { Post, PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { site } from "@/site.config";

type Language = "ko" | "en";
type PostNav = { prev: PostMeta | null; next: PostMeta | null };

type Props = {
  koPost: Post;
  enPost: Post | null;
  koNav: PostNav;
  enNav: PostNav;
};

function PostSiteHeader({ lang, setLang }: { lang: "ko" | "en"; setLang: (l: "ko" | "en") => void }) {
  const homeHref = lang === "en" ? "/?lang=en" : "/";
  const description = lang === "en"
    ? "A place to keep thoughts."
    : site.description;

  return (
    <div className="post-site-header">
      <Link href={homeHref} className="post-site-title">{site.title}</Link>
      <div className="intro-desc-row">
        <p className="post-site-description">{description}</p>
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

function PostNavLinks({ nav, lang }: { nav: PostNav; lang: Language }) {
  const { prev, next } = nav;
  if (!prev && !next) return null;
  const query = lang === "en" ? "?lang=en" : "";

  return (
    <nav className="post-nav">
      {prev && (
        <Link href={`/blog/${prev.slug}/${query}`}>
          <span className="dir">{lang === "en" ? "Previous" : "이전 글"}</span>
          {prev.title}
        </Link>
      )}
      {next && (
        <Link href={`/blog/${next.slug}/${query}`} className="next">
          <span className="dir">{lang === "en" ? "Next" : "다음 글"}</span>
          {next.title}
        </Link>
      )}
    </nav>
  );
}

function PostView({ post, lang, setLang, nav }: {
  post: Post;
  lang: Language;
  setLang: (l: Language) => void;
  nav: PostNav;
}) {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <article className="shell">
      <PostSiteHeader lang={lang} setLang={setLang} />

      <div className="section-header">
        <div className="section-header-left">
          <Link href={lang === "en" ? "/?lang=en" : "/"} className="section-label">
            {lang === "en" ? "Posts" : "글 목록"}
          </Link>
          <button className="subscribe-btn-text" onClick={() => setShowSubscribe(true)}>
            {lang === "en" ? "Subscribe" : "구독하기"}
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

      {lang === "en" && (
        <p className="post-dateline">
          © 2025 Sangrok Lee · English translation of the original Korean text.
        </p>
      )}

      <PostNavLinks nav={nav} lang={lang} />

      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} />
      )}
    </article>
  );
}

function PostInner({ koPost, enPost, koNav, enNav }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const showEn = lang === "en" && enPost !== null;
  const slug = koPost.slug;

  const setLang = (l: "ko" | "en") => {
    if (l === "ko") {
      router.push(`/blog/${slug}/`);
    } else {
      router.push(`/blog/${slug}/?lang=en`);
    }
  };

  return (
    <PostView
      post={showEn ? enPost : koPost}
      lang={lang}
      setLang={setLang}
      nav={showEn ? enNav : koNav}
    />
  );
}

export default function PostClient(props: Props) {
  // useSearchParams 를 쓰는 PostInner 는 정적 빌드에서 통째로 클라이언트 렌더링으로
  // 빠지고, HTML에는 이 fallback 만 남는다. 검색엔진이 JS 없이도 본문과 링크를 읽도록
  // fallback 에 한국어 본문 전체를 그린다.
  return (
    <Suspense fallback={
      <PostView post={props.koPost} lang="ko" setLang={() => {}} nav={props.koNav} />
    }>
      <PostInner {...props} />
    </Suspense>
  );
}
