import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import { formatDate } from "../../../content/blog";
import CoverImage from "./CoverImage";

/* =========================================================
   ARTICLE FRAMES

   A post's `metadata.layout` picks the frame:
   - "guide"      → hero + sticky sidebar table of contents
   - "comparison" → "A vs B" hero + horizontal topic chips
   Inside the frame, the post's own MDX arranges its blocks.
========================================================= */

const Breadcrumb = () => (
  <Link
    href="/blogs"
    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition hover:text-white"
  >
    <ArrowLeft className="h-3.5 w-3.5" />
    All articles
  </Link>
);

const MetaLine = ({ post }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
    <span className="rounded-full bg-[#F26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
      {post.category}
    </span>
    <span className="flex items-center gap-1.5">
      <CalendarDays className="h-4 w-4" />
      {formatDate(post.date)}
    </span>
    <span className="flex items-center gap-1.5">
      <Clock className="h-4 w-4" />
      {post.readTime}
    </span>
  </div>
);

const TocList = ({ items }) => (
  <nav aria-label="In this guide">
    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#F26522]">In this guide</p>
    <ol className="space-y-1 border-l border-slate-200">
      {items.map(([label, id]) => (
        <li key={id}>
          <a
            href={`#${id}`}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-slate-600 transition hover:border-[#F26522] hover:text-[#03254C]"
          >
            {label}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

/*
  One hero for every post: fixed height on desktop so all articles open the
  same way. Text left (title clamped to 3 lines), cover image right.
  `eyebrow` lets a layout add its own flourish above the title.
*/
const ArticleHero = ({ post, eyebrow }) => (
  <header className="relative overflow-hidden bg-[#03254C] pt-28 lg:h-[620px] lg:pt-20">
    <div className="pointer-events-none absolute -left-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[#F26522]/10 blur-3xl" />

    <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pb-0">
      <div>
        <Breadcrumb />
        {eyebrow && <div className="mt-6">{eyebrow}</div>}
        <h1 className="mt-6 line-clamp-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:line-clamp-3 lg:text-[42px] lg:leading-[1.15]">
          {post.title}
        </h1>
        <p className="mt-5 line-clamp-3 text-base leading-7 text-white/75">{post.excerpt}</p>
        <div className="mt-8">
          <MetaLine post={post} />
        </div>
      </div>

      <CoverImage
        src={post.cover}
        alt={post.title}
        label={post.category}
        priority
        sizes="(min-width: 1024px) 520px, 100vw"
        className="aspect-[4/3] w-full rounded-3xl shadow-2xl shadow-black/30 ring-1 ring-white/10 lg:aspect-auto lg:h-[440px]"
      />
    </div>
  </header>
);

/* ---------- "guide" ---------- */

function GuideLayout({ post, children }) {
  return (
    <>
      <ArticleHero post={post} />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TocList items={post.toc} />
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <details className="mb-8 rounded-2xl border border-slate-200 p-5 lg:hidden">
            <summary className="cursor-pointer text-sm font-bold text-[#03254C]">In this guide</summary>
            <div className="mt-4">
              <TocList items={post.toc} />
            </div>
          </details>
          {children}
        </article>
      </div>
    </>
  );
}

/* ---------- "comparison" ---------- */

function ComparisonLayout({ post, children }) {
  const [left, right] = post.versus || [];

  return (
    <>
      <ArticleHero
        post={post}
        eyebrow={
          left &&
          right && (
            <div className="flex max-w-md items-center gap-3">
              <span className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-center text-sm font-bold text-white">
                {left}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-[11px] font-black text-white">
                VS
              </span>
              <span className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-center text-sm font-bold text-white">
                {right}
              </span>
            </div>
          )
        }
      />

      <nav
        aria-label="In this guide"
        className="sticky top-20 z-30 border-b border-slate-200 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {post.toc.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-[#03254C] transition hover:border-[#F26522] hover:text-[#F26522]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">{children}</article>
    </>
  );
}

const LAYOUTS = { guide: GuideLayout, comparison: ComparisonLayout };

export default function ArticleLayout({ post, children }) {
  const Layout = LAYOUTS[post.layout] || GuideLayout;
  return <Layout post={post}>{children}</Layout>;
}
