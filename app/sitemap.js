import { serviceSlugs } from "./data/services";
import { SITE_URL } from "./data/site";

export default function sitemap() {
  const lastModified = new Date("2026-09-19");

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({ ...route, lastModified }));
}
