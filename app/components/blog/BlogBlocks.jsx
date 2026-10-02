import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  XCircle,
} from "lucide-react";

/* =========================================================
   BLOG BUILDING BLOCKS

   Registered globally in mdx-components.js, so every post
   can mix these freely without importing them. Each post
   decides its own arrangement — that is how different
   posts get different layouts from one design system.
========================================================= */

/* Anchor ids for headings, shared by H2 and TableOfContents. */
export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const textOf = (children) =>
  Array.isArray(children) ? children.map(textOf).join("") : typeof children === "object" ? textOf(children?.props?.children) : String(children ?? "");

/* ---------- Markdown element overrides ---------- */

export const H2 = ({ children, id }) => (
  <h2
    id={id || slugify(textOf(children))}
    className="mt-14 mb-4 scroll-mt-28 text-2xl font-bold leading-tight text-[#03254C] sm:text-[28px]"
  >
    {children}
  </h2>
);

export const H3 = ({ children }) => (
  <h3 className="mt-8 mb-2 text-lg font-bold text-[#03254C]">{children}</h3>
);

export const P = ({ children }) => <p className="my-4 text-[15px] leading-7 text-slate-600">{children}</p>;

export const UL = ({ children }) => <ul className="my-4 space-y-2.5">{children}</ul>;

export const LI = ({ children }) => (
  <li className="flex items-start gap-2.5 text-[15px] leading-7 text-slate-600">
    <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#157327]" />
    <span>{children}</span>
  </li>
);

export const A = ({ href = "", children }) => {
  const external = /^https?:/.test(href);
  const className = "font-medium text-[#F26522] underline decoration-[#F26522]/30 underline-offset-2 hover:decoration-[#F26522] break-words";

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export const Strong = ({ children }) => <strong className="font-semibold text-[#03254C]">{children}</strong>;

/* ---------- Content blocks ---------- */

export const Lead = ({ children }) => (
  <div className="my-6 text-[17px] leading-8 text-slate-700 [&_p]:text-[17px] [&_p]:leading-8 [&_p]:text-slate-700">
    {children}
  </div>
);

const CALLOUT_STYLES = {
  tip: { icon: Lightbulb, box: "border-[#157327]/25 bg-[#f0fdf4]", icon_: "text-[#157327]" },
  warning: { icon: AlertTriangle, box: "border-[#F26522]/30 bg-[#fff7ed]", icon_: "text-[#F26522]" },
  note: { icon: Lightbulb, box: "border-[#03254C]/15 bg-slate-50", icon_: "text-[#03254C]" },
};

export const Callout = ({ type = "note", title, children }) => {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.note;
  const Icon = style.icon;

  return (
    <aside className={`my-8 flex gap-4 rounded-2xl border p-5 sm:p-6 ${style.box}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.icon_}`} />
      <div className="[&_p]:my-1.5">
        {title && <p className="!mt-0 font-bold text-[#03254C]">{title}</p>}
        {children}
      </div>
    </aside>
  );
};

/*
  Table. `columns` is the header row, `rows` an array of arrays.
  `highlight` tints one column (0-based) to draw the eye.
*/
export const DataTable = ({ columns, rows, highlight, caption }) => (
  <figure className="my-8">
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[#03254C] text-white">
            {columns.map((col, i) => (
              <th key={i} className={`px-4 py-3 font-semibold ${i === highlight ? "bg-[#F26522]" : ""}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-slate-200 even:bg-slate-50/60">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-3 align-top leading-6 ${c === 0 ? "font-semibold text-[#03254C]" : "text-slate-600"} ${c === highlight ? "bg-[#fff7ed]/70" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {caption && <figcaption className="mt-2 text-xs text-slate-500">{caption}</figcaption>}
  </figure>
);

/* Numbered vertical timeline. Each <Step title> holds its own markdown body. */
export const Steps = ({ children }) => (
  <ol className="relative my-8 space-y-8 border-l-2 border-dashed border-slate-200 pl-8 [counter-reset:step]">{children}</ol>
);

export const Step = ({ title, children }) => (
  <li className="relative [counter-increment:step] before:absolute before:-left-[49px] before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:bg-[#03254C] before:text-xs before:font-bold before:text-white before:ring-4 before:ring-white before:content-[counter(step)]">
    <h3 className="text-lg font-bold text-[#03254C]">{title}</h3>
    <div className="[&_p]:my-2">{children}</div>
  </li>
);

/* Two side-by-side cards, e.g. "Pvt Ltd fits when" / "LLP fits when". */
export const SplitCards = ({ children }) => <div className="my-8 grid gap-5 md:grid-cols-2">{children}</div>;

export const Card = ({ title, accent = "navy", items = [], children }) => {
  const bar = accent === "orange" ? "bg-[#F26522]" : accent === "green" ? "bg-[#157327]" : "bg-[#03254C]";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
      <span className={`absolute inset-x-0 top-0 h-1 ${bar}`} />
      <h3 className="mb-3 text-lg font-bold text-[#03254C]">{title}</h3>
      {items.length > 0 && (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#157327]" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {children && <div className="text-sm leading-6 text-slate-600 [&_p]:my-0 [&_p]:text-sm [&_p]:leading-6">{children}</div>}
    </div>
  );
};

/* Myth vs fact grid. items: [{ myth, fact }] */
export const Myths = ({ items }) => (
  <div className="my-8 grid gap-4 sm:grid-cols-2">
    {items.map((item, i) => (
      <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-start gap-2 text-sm font-semibold text-[#b42318]">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Myth: {item.myth}</span>
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#157327]" />
          <span>{item.fact}</span>
        </p>
      </div>
    ))}
  </div>
);

/* Numbered question cards. */
export const QuestionList = ({ items }) => (
  <div className="my-8 grid gap-3">
    {items.map((q, i) => (
      <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff7ed] text-sm font-bold text-[#F26522]">
          {i + 1}
        </span>
        <span className="text-[15px] font-medium leading-6 text-[#03254C]">{q}</span>
      </div>
    ))}
  </div>
);

/* Accordion without client JS. items: [{ question, answer }] — also feed the FAQ schema. */
export const FAQ = ({ items }) => (
  <div className="my-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
    {items.map((faq, i) => (
      <details key={i} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#03254C]">
          {faq.question}
          <ChevronDown className="h-4 w-4 shrink-0 text-[#F26522] transition-transform group-open:rotate-180" />
        </summary>
        <p className="mt-3 text-[15px] leading-7 text-slate-600">{faq.answer}</p>
      </details>
    ))}
  </div>
);

export const BlogCTA = ({ title, children, href = "/contact", label = "Talk to an advisor" }) => (
  <section className="my-12 overflow-hidden rounded-3xl bg-[#03254C] p-8 text-white sm:p-10">
    <h3 className="text-2xl font-bold leading-tight">{title}</h3>
    <div className="mt-3 max-w-2xl text-[15px] leading-7 text-white/80 [&_p]:text-white/80">{children}</div>
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F26522] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d9541a]"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  </section>
);

export const Sources = ({ children }) => (
  <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm [&_li]:text-sm [&_p]:text-sm">
    <h3 className="mb-2 text-base font-bold text-[#03254C]">Sources &amp; legal note</h3>
    {children}
  </section>
);
