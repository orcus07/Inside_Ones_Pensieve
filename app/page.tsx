import type { Metadata } from "next";

import { getAllPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/utils";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
};

export default function Home() {
  const koPosts = getAllPosts("ko");
  const enPosts = getAllPosts("en");

  return <HomeClient koPosts={koPosts} enPosts={enPosts} />;
}
