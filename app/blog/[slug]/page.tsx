import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Post } from "@/lib/types";
import { getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/site.config";
import PostClient from "./PostClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts("ko").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug, "ko");
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary || site.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || site.description,
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}/`,
      tags: [...post.tags],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // 한국어 + 영어 버전 모두 빌드 타임에 로드
  const koPost: Post | null = await getPost(slug, "ko");
  const enPost: Post | null = await getPost(slug, "en");

  if (!koPost) notFound();

  return <PostClient koPost={koPost} enPost={enPost} />;
}
