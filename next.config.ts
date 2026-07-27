import type { NextConfig } from "next";

/**
 * 정적 내보내기(`output: "export"`)로 고정한다.
 *
 * `next build` 하나로 `out/` 아래 순수 HTML/CSS/JS가 떨어지므로 Vercel,
 * Cloudflare Pages, GitHub Pages, render.com 정적 사이트 어디에나 같은
 * 산출물을 올릴 수 있다. 서버 런타임에 묶이지 않는 게 이 블로그의 전제다.
 */
const nextConfig: NextConfig = {
  output: "export",
  // 정적 호스팅에서 /blog/foo -> /blog/foo/index.html 로 해석되게 한다.
  trailingSlash: true,
  images: {
    // 정적 내보내기에는 서버 이미지 최적화가 없다.
    unoptimized: true,
  },
};

export default nextConfig;
