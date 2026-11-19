import { posts } from "../content/blog";
import { serviceSlugs } from "./data/services";
import { SITE_URL } from "./data/site";

export default function sitemap() {
  const lastModified = new Date("2026-09-19");

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(post.updated || post.date),
  }));

  return [
    ...[...staticRoutes, ...serviceRoutes].map((route) => ({ ...route, lastModified })),
    ...blogRoutes,
  ];
}
