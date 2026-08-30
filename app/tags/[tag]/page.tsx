import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllPosts, getAllTags } from "@/lib/posts";
import TagClient from "./TagClient";

type Props = { params: Promise<{ tag: string }> };

const tagTranslations: Record<string, string> = {
  에세이: "Essay",
  테크: "Tech",
  루틴: "Routine",
  메모: "Note",
  독서: "Reading",
};

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);
  return { title: `#${tag}` };
}

export default async function TagPage({ params }: Props) {
  const koTag = decodeURIComponent((await params).tag);
  const enTag = tagTranslations[koTag] ?? koTag;
  const koPosts = getAllPosts("ko").filter((post) => post.tags.includes(koTag));
  const enPosts = getAllPosts("en").filter((post) => post.tags.includes(enTag));

  if (koPosts.length === 0) notFound();

  return <TagClient koPosts={koPosts} enPosts={enPosts} koTag={koTag} enTag={enTag} />;
}
