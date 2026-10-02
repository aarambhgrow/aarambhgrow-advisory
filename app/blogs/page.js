import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTASection from "../components/layout/CTA";
import CoverImage from "../components/blog/CoverImage";
import { formatDate, posts } from "../../content/blog";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Blog: Business Registration, Tax & Compliance Guides | AarambhGrow",
  description:
    "Practical guides for Indian founders and MSMEs on company registration, business structures, GST, tax and ongoing compliance from AarambhGrow Advisory.",
  path: "/blogs",
});

const Meta = ({ post, light = false }) => (
  <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${light ? "text-white/70" : "text-slate-500"}`}>
    <span className="flex items-center gap-1.5">
      <CalendarDays className="h-3.5 w-3.5" />
      {formatDate(post.date)}
    </span>
    <span className="flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5" />
      {post.readTime}
    </span>
  </div>
);

const Category = ({ children }) => (
  <span className="w-fit rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F26522]">
    {children}
  </span>
);

/* Large horizontal card for the newest post. */
function FeaturedPost({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-[1.15fr_1fr]"
    >
      <CoverImage
        src={post.cover}
        alt={post.title}
        label={post.category}
        priority
        sizes="(min-width: 1024px) 620px, 100vw"
        className="aspect-[16/10] transition duration-500 group-hover:brightness-105 lg:aspect-auto lg:min-h-[420px]"
      />

      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#03254C] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Latest
          </span>
          <Category>{post.category}</Category>
        </div>

        <h2 className="mt-5 text-2xl font-bold leading-snug text-[#03254C] sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-600">{post.excerpt}</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Meta post={post} />
          <span className="flex items-center gap-2 rounded-full bg-[#F26522] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#d9541a]">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#F26522]/30 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <CoverImage
        src={post.cover}
        alt={post.title}
        label={post.category}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10]"
      />

      <div className="flex flex-1 flex-col p-6">
        <Category>{post.category}</Category>
        <h3 className="mt-4 line-clamp-3 text-lg font-bold leading-snug text-[#03254C] transition group-hover:text-[#F26522]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <Meta post={post} />
          <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-[#F26522]" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafafa]">
        <header className="relative overflow-hidden bg-[#03254C] pt-36 pb-40 sm:pt-22">
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#F26522]/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F26522]">
              AarambhGrow Insights
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Clear answers for <span className="text-[#F26522]">founders</span> building compliant businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Plain-language guides on registration, business structures, tax and compliance in India — written by our
              advisory team.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/80"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="relative mx-auto -mt-24 max-w-6xl px-4 pb-20 sm:px-6">
          {featured && <FeaturedPost post={featured} />}

          {rest.length > 0 && (
            <>
              <div className="mt-16 mb-8 flex items-end justify-between">
                <h2 className="text-2xl font-bold text-[#03254C] sm:text-3xl">More articles</h2>
                <span className="text-sm text-slate-500">{posts.length} articles</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>

        <CTASection />
      </main>

      <Footer />
    </>
  );
}
