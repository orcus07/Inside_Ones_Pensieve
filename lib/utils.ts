import { site } from "@/site.config";

/**
 * 페이지별 canonical. 레이아웃에 두면 모든 하위 페이지가 홈을 가리키게 되므로
 * 페이지마다 단다. 페이지가 `alternates` 를 정의하면 레이아웃 것을 통째로 덮어쓰므로
 * (메타데이터는 얕게 병합된다) RSS 링크도 함께 넘긴다.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  };
}

/** `2026-07-27` → `2026년 7월 27일` (ko) or `Jul 27, 2026` (en) */
export function formatDate(iso: string, lang: "ko" | "en" = "ko"): string {
  const [y, m, d] = iso.split("-");
  if (lang === "en") {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
  }
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}
