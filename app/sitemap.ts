import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags } from "@/lib/posts";
import { site } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: `${site.url}/`, lastModified: posts[0]?.date, priority: 1 },
    { url: `${site.url}/blog/`, lastModified: posts[0]?.date, priority: 0.8 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: post.date,
      priority: 0.7,
    })),
    ...getAllTags().map(({ tag }) => ({
      url: `${site.url}/tags/${encodeURIComponent(tag)}/`,
      priority: 0.3,
    })),
  ];
}
