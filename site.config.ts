/**
 * 사이트 전역 노브. 코드를 뒤지지 않고 여기만 고치면 되도록 한 곳에 모은다.
 * 배포 도메인이 정해지면 `url` 만 바꾸면 RSS·사이트맵·OG 태그가 따라온다.
 */
export const site = {
  title: "Inside One's Pensieve",
  description: "생각을 꺼내 담아두는 곳.",
  /** 배포 주소. 끝에 슬래시를 붙이지 않는다. */
  url: "https://inside-ones-pensieve.vercel.app",
  author: "Sangrok Lee",
  locale: "ko_KR",
  lang: "ko",
  /** 헤더에 노출할 외부 링크. 필요 없으면 빈 배열로 둔다. */
  links: [
    { label: "GitHub", href: "https://github.com/orcus07", icon: "github" },
    { label: "Instagram", href: "https://www.instagram.com/korgnas", icon: "instagram" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/korgnas", icon: "linkedin" },
  ],
} as const;
