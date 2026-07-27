# Inside One's Pensieve

마크다운으로 쓰고 정적 HTML로 내보내는 개인 블로그.
Next.js(App Router) + `output: "export"` — 서버 런타임 없이 `out/` 폴더 하나가
결과물이라 어디든 올릴 수 있다.

## 빠르게 시작

```bash
npm install
npm run dev      # http://localhost:3000
```

## 글 쓰기

`content/posts/` 에 마크다운 파일을 하나 만들면 그게 글 하나다.
**파일 이름이 그대로 주소가 된다** — `illusion_of_talent.md` → `/blog/illusion_of_talent/`.

뼈대는 스크립트로 만든다:

```bash
npm run new "재능이라는 착각" illusion_of_talent
```

두 번째 인자(슬러그)를 생략하면 제목에서 만들어내는데, 한글 제목이면 주소도
한글이 되니 영문 슬러그를 직접 넘기는 편이 낫다.

### 프런트매터

```yaml
---
title: 재능이라는 착각      # 필수
date: 2026-07-27           # 필수. YYYY-MM-DD, 목록 정렬 기준
summary: 목록에 뜨는 한 줄
tags: [에세이, 커리어]
draft: true                # 개발 서버에서만 보이고 배포에서 빠진다
---
```

`date` 가 없으면 빌드가 **실패한다**. 조용히 오늘 날짜로 때우면 나중에
정렬이 틀어지기 때문에 일부러 막아뒀다.

## 빌드·확인

```bash
npm run build    # -> out/
npm start        # out/ 을 로컬에서 서빙해 배포본 그대로 확인
```

## 배포

`out/` 이 순수 정적 파일이라 호스팅은 아무거나 된다. 순서대로 추천:

| | 방법 | 비고 |
| --- | --- | --- |
| 1 | **Vercel** | 레포 연결하면 끝. 설정 자동 감지, 푸시마다 재배포 |
| 2 | Cloudflare Pages | 빌드 `npm run build`, 출력 디렉터리 `out` |
| 3 | GitHub Pages | 같은 설정. 서브경로에 올리면 `basePath` 를 잡아줘야 한다 |

배포 주소가 정해지면 **`site.config.ts` 의 `url` 을 실제 도메인으로 바꾼다.**
RSS·사이트맵·OG 태그가 전부 이 값을 따라간다.

### 커스텀 도메인

1. 도메인을 산다 (가비아, Cloudflare Registrar, Namecheap 등).
2. Vercel 프로젝트 → Settings → Domains 에 도메인을 추가한다.
3. Vercel이 알려주는 DNS 레코드를 등록한다 —
   루트 도메인은 `A`, `www` 는 `CNAME`.
4. `site.config.ts` 의 `url` 을 그 도메인으로 바꾸고 다시 배포한다.

HTTPS 인증서는 Vercel이 알아서 발급한다.

## 구조

```
app/                 라우트와 레이아웃
  page.tsx           홈 (소개 + 글 목록)
  blog/page.tsx      전체 글 목록
  blog/[slug]/       글 본문
  tags/[tag]/        태그별 목록
  feed.xml/          RSS
  globals.css        디자인 토큰 전부 여기
lib/posts.ts         마크다운 읽기·렌더링
content/posts/       글 (= 이 레포의 알맹이)
site.config.ts       제목·설명·도메인·링크
```

### 손댈 곳

- **색·간격·타이포**: `app/globals.css` 상단 `:root` 변수. 다크 모드는
  바로 아래 `prefers-color-scheme` 블록에 같은 변수를 다시 정의한다.
- **사이트 제목·도메인·헤더 링크**: `site.config.ts`.
- **글 목록에 보이는 정보**: `app/page.tsx`.

## 설계 메모

- **코드 하이라이팅은 빌드 타임에 끝난다.** shiki가 색을 입힌 HTML을 내보내므로
  브라우저가 받는 하이라이팅용 자바스크립트는 0바이트다.
- **테마 토글이 없다.** 라이트/다크 두 벌을 CSS 변수로 같이 싣고
  `prefers-color-scheme` 으로 고른다. 토글이 없으니 초기 렌더 깜빡임도 없다.
- **`trailingSlash: true`.** 정적 호스팅에서 `/blog/foo` 가
  `/blog/foo/index.html` 로 해석되게 하려는 것이다. 끄면 호스팅에 따라 404가 난다.
