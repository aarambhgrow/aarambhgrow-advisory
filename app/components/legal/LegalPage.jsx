import { Mail } from "lucide-react";

/* Shared layout for the Privacy Policy and Terms of Service pages (content in app/data/legal.js). */

function Block({ block }) {
  if (block.heading) {
    return <h3 className="pt-2 text-base font-semibold text-[#03254C]">{block.heading}</h3>;
  }

  if (block.list) {
    return (
      <ul className="space-y-2">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F26522]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.email) {
    return (
      <a
        href={`mailto:${block.email}`}
        className="inline-flex items-center gap-2 font-semibold text-[#157327] transition-colors hover:text-[#F26522]"
      >
        <Mail size={16} />
        {block.email}
      </a>
    );
  }

  return (
    <p>
      {block.label && <strong className="font-semibold text-[#03254C]">{block.label} </strong>}
      {block.text}
    </p>
  );
}

export default function LegalPage({ badge, title, subtitle, intro, sections }) {
  return (
    <>
      <section className="w-full border-b border-slate-200 bg-[#f8fafc] font-sans">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#157327]/20 bg-[#157327]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#03254C] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[#157327]" />
            <span>{badge}</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#03254C] sm:text-4xl lg:text-[44px]">{title}</h1>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#F26522]" />
          {subtitle && <p className="mt-4 text-sm text-slate-600 sm:text-base">{subtitle}</p>}
        </div>
      </section>

      <section className="w-full bg-white font-sans">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-slate-200 pt-8">
                <h2 className="text-lg font-bold text-[#03254C] sm:text-xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-[15px] leading-7 text-slate-600">
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
