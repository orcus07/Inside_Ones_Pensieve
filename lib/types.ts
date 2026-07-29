export type PostMeta = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  /** 글 커버 이미지 경로 (선택) */
  cover?: string;
};

export type Post = PostMeta & { html: string };
