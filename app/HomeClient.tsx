"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import type { PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { site } from "@/site.config";

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "github") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
  if (icon === "instagram") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
  if (icon === "linkedin") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  if (icon === "substack") return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
  return null;
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

const POSTS_PER_PAGE = 3;

function HomeInner({ koPosts, enPosts }: { koPosts: PostMeta[]; enPosts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const allPosts = lang === "en" ? enPosts : koPosts;
  const [showSubscribe, setShowSubscribe] = useState(false);

  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const goToPage = (p: number) => {
    const params = new URLSearchParams();
    if (lang === "en") params.set("lang", "en");
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  };

  const setLang = (l: "ko" | "en") => {
    if (l === "ko") {
      router.push("/");
    } else {
      router.push("/?lang=en");
    }
  };

  return (
    <div className="shell">
      <section className="intro">
        <h1 className="intro-name">{site.title}</h1>
        <div className="intro-desc-row">
          <p className="intro-desc">{lang === "en" ? "A place to keep thoughts." : site.description}</p>
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

      <section>
        <div className="section-header">
          <div className="section-header-left">
            <p className="section-label">{lang === "en" ? "Posts" : "글 목록"}</p>
            <button className="subscribe-btn-text" onClick={() => setShowSubscribe(true)}>
              {lang === "en" ? "Subscribe" : "구독하기"}
            </button>
          </div>
        </div>
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            {lang === "en" ? "No posts yet." : "아직 쓴 글이 없다."}
          </p>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/${lang === "en" ? "?lang=en" : ""}`} className="post-card">
                  <div className="post-card-body">
                    <div>
                      <div className="post-title">
                        {post.draft && <span style={{ color: "var(--faint)" }}>[Draft] </span>}
                        {post.title}
                      </div>
                      {post.summary && <div className="post-preview">{post.summary}</div>}
                    </div>
                    <div className="post-dateline">
                      {formatDate(post.date, lang)} · {post.readingMinutes}{lang === "en" ? " min" : "분"}
                    </div>
                  </div>
                  {post.cover && (
                    <div className="post-card-thumb">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        width={130}
                        height={90}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={p === currentPage ? "page-active" : "page-btn"}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      {showSubscribe && <SubscribeModal onClose={() => setShowSubscribe(false)} />}
    </div>
  );
}

export default function HomeClient({ koPosts, enPosts }: { koPosts: PostMeta[]; enPosts: PostMeta[] }) {
  return (
    <Suspense fallback={<div className="shell" />}>
      <HomeInner koPosts={koPosts} enPosts={enPosts} />
    </Suspense>
  );
}
