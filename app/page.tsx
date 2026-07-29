import { getAllPosts } from "@/lib/posts";
import HomeClient from "./HomeClient";

export default function Home() {
  const koPosts = getAllPosts("ko");
  const enPosts = getAllPosts("en");

  return <HomeClient koPosts={koPosts} enPosts={enPosts} />;
}
