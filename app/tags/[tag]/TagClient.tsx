"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import type { PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { site } from "@/site.config";

const POSTS_PER_PAGE = 4;

type Language = "ko" | "en";

type Props = {
  koPosts: PostMeta[];
  enPosts: PostMeta[];
  koTag: string;
  enTag: string;
};

function SubscribeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="subscribe-overlay" onClick={onClose}>
      <div className="subscribe-modal" onClick={(event) => event.stopPropagation()}>
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

function TagSiteHeader({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const description = lang === "en" ? "A place to keep thoughts." : site.description;

  return (
    <section className="intro">
      <Link href={lang === "en" ? "/?lang=en" : "/"} className="intro-name">
        {site.title}
      </Link>
      <div className="intro-desc-row">
        <p className="intro-desc">{description}</p>
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
    </section>
  );
}

function PinBadge() {
  return (
    <span className="badge-pin" aria-label="고정된 글">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
      </svg>
    </span>
  );
}

function TagInner({ koPosts, enPosts, koTag, enTag }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang: Language = searchParams.get("lang") === "en" ? "en" : "ko";
  const allPosts = lang === "en" ? enPosts : koPosts;
  const visibleTag = lang === "en" ? enTag : koTag;
  const [showSubscribe, setShowSubscribe] = useState(false);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const requestedPage = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const posts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const hrefFor = (nextLang: Language, page = 1) => {
    const params = new URLSearchParams();
    if (nextLang === "en") params.set("lang", "en");
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return `/tags/${encodeURIComponent(koTag)}/${query ? `?${query}` : ""}`;
  };

  const goToPage = (page: number) => router.push(hrefFor(lang, page));
  const setLang = (nextLang: Language) => router.push(hrefFor(nextLang));

  const pageNumbers = (() => {
    const half = 2;
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    if (end - start < half * 2) {
      start = Math.max(1, end - half * 2);
      end = Math.min(totalPages, start + half * 2);
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  })();

  return (
    <div className="shell">
      <TagSiteHeader lang={lang} setLang={setLang} />

      <section>
        <div className="section-header">
          <div className="section-header-left">
            <p className="section-label tag-section-label">
              #{visibleTag} · {allPosts.length}{lang === "en" ? " posts" : "편"}
            </p>
            <button className="subscribe-btn-text" onClick={() => setShowSubscribe(true)}>
              {lang === "en" ? "Subscribe" : "구독하기"}
            </button>
          </div>
        </div>

        <ul className="post-list">
          {posts.map((post) => {
            const isNew = Date.now() - new Date(post.date).getTime() < 7 * 24 * 60 * 60 * 1000;
            return (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/${lang === "en" ? "?lang=en" : ""}`} className="post-card">
                  <div className="post-card-body">
                    <div className="post-title">
                      <span>{post.title}</span>
                      {post.pinned && <PinBadge />}
                      {isNew && !post.pinned && <span className="badge-new">new</span>}
                    </div>
                    {post.summary && <div className="post-preview">{post.summary}</div>}
                    <div className="post-dateline">
                      {formatDate(post.date, lang)} · {post.readingMinutes}{lang === "en" ? " min" : "분"}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {totalPages > 1 && (
          <div className="pagination" aria-label={lang === "en" ? "Pagination" : "페이지 이동"}>
            <button className="page-arrow" onClick={() => goToPage(1)} disabled={currentPage === 1} aria-label={lang === "en" ? "First page" : "첫 페이지"}>«</button>
            <button className="page-arrow" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label={lang === "en" ? "Previous page" : "이전 페이지"}>‹</button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={page === currentPage ? "page-active" : "page-btn"}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button className="page-arrow" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label={lang === "en" ? "Next page" : "다음 페이지"}>›</button>
            <button className="page-arrow" onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} aria-label={lang === "en" ? "Last page" : "마지막 페이지"}>»</button>
          </div>
        )}
      </section>

      {showSubscribe && <SubscribeModal onClose={() => setShowSubscribe(false)} />}
    </div>
  );
}

export default function TagClient(props: Props) {
  return (
    <Suspense fallback={<div className="shell" />}>
      <TagInner {...props} />
    </Suspense>
  );
}
