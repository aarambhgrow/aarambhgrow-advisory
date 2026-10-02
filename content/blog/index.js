import PvtLtdRegistration, { metadata as pvtLtdRegistration } from "./private-limited-company-registration-india-2026.mdx";
import PvtLtdVsLlp, { metadata as pvtLtdVsLlp } from "./private-limited-vs-llp-2026.mdx";

/*
  Blog registry. To publish a post: add an .mdx file in this folder with an
  `export const metadata` block, then register it here with its slug.
*/
const entries = [
  { slug: "private-limited-vs-llp-2026", metadata: pvtLtdVsLlp, Content: PvtLtdVsLlp },
  { slug: "private-limited-company-registration-india-2026", metadata: pvtLtdRegistration, Content: PvtLtdRegistration },
];

/* Newest first. */
export const posts = entries
  .map(({ slug, metadata }) => ({ slug, ...metadata }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPost = (slug) => {
  const entry = entries.find((e) => e.slug === slug);
  return entry ? { slug, ...entry.metadata, Content: entry.Content } : null;
};

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
