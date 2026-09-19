"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  Sparkles,
  Layers,
  ChevronRight,
  FileText,
  Briefcase,
  TrendingUp,
  Award,
  Scale,
  Settings,
} from "lucide-react";

import { serviceData, categories } from "../../data";

// Category Level Icons
const CATEGORY_ICONS = {
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  Award: Award,
  Sparkles: Sparkles,
  Scale: Scale,
  Settings: Settings,
};

// Custom category headings for the left sidebar
const CATEGORY_HEADINGS = {
  Registration: "Establish Your Business on the Right Foundation",
  Finance: "Strategic Financial Solutions for Sustainable Business Growth",
  Certification: "Strengthen Compliance, Credibility & Market Trust",
  Branding: "Build a Powerful Brand That Drives Lasting Growth",
  Operations: "Streamline Your Operations for Smarter, Sustainable Growth",
  "Legal & CA": "Simplify Compliance, Strengthen Your Business",
};

function CategoryIcon({ iconKey, className }) {
  const Icon = CATEGORY_ICONS[iconKey] || Layers;
  if (!Icon) return null;
  return <Icon className={className} />;
}

function ServicesExplorerInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory =
    categoryParam && categories.includes(categoryParam)
      ? categoryParam
      : "Registration";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  useEffect(() => {
    const paramNow = searchParams.get("category");
    if (
      paramNow &&
      categories.includes(paramNow) &&
      paramNow !== activeCategory
    ) {
      setActiveCategory(paramNow);
      setActiveSubIndex(0);
    }
  }, [searchParams]);

  const currentCategoryData = serviceData[activeCategory];
  const activeService =
    currentCategoryData.subServices[activeSubIndex] ||
    currentCategoryData.subServices[0];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubIndex(0);

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", cat);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#f8fafc] py-12 lg:py-16 font-sans text-[#0f172a] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center justify-start md:justify-center gap-2 border-b border-slate-200/80 pb-4 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`group relative px-5 py-2.5 rounded-md text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#03254C] text-white shadow-md shadow-[#03254C]/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-[#F97316]" : "text-slate-400 group-hover:text-[#03254C]"} transition-colors`}
                  >
                    <CategoryIcon
                      iconKey={serviceData[cat].icon}
                      className="w-4 h-4"
                    />
                  </span>
                  <span>{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-4 left-0 right-0 h-1 bg-[#F97316] rounded-full hidden md:block"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-md p-4 shadow-xs space-y-3">
            <div className="flex items-start gap-2.5 pb-3 mb-2 border-b border-slate-100 px-2">
              <CategoryIcon
                iconKey={currentCategoryData.icon}
                className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#03254C] leading-snug">
                  {CATEGORY_HEADINGS[activeCategory] ||
                    "Complete business solutions"}
                </h3>
              </div>
            </div>
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
              {currentCategoryData.subServices.map((sub, idx) => {
                const isSubActive = activeSubIndex === idx;
                return (
                  <button
                    key={sub.name}
                    onClick={() => setActiveSubIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-bold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isSubActive
                        ? "bg-[#03254C]/10 text-[#03254C] border-l-4 border-[#F97316] font-extrabold shadow-2xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#03254C]"
                    }`}
                  >
                    <span className="truncate pr-2">{sub.name}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSubActive
                          ? "text-[#F97316] translate-x-0.5"
                          : "text-slate-300 group-hover:text-slate-500"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-9 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeSubIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white border border-slate-200/80 rounded-md p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#03254C] via-[#F97316] to-[#1F8A4D]" />
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-[10px] font-extrabold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      Featured Solution
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-[32px] font-black text-[#03254C] tracking-tight leading-tight">
                      {activeService.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#F97316]">
                      {activeService.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {activeService.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200/80 rounded-md p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <ShieldCheck className="w-4 h-4 text-[#1F8A4D]" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#03254C]">
                          Key Benefits
                        </h3>
                      </div>
                      <div className="space-y-3.5">
                        {activeService.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#1F8A4D] shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold text-[#03254C]">
                                {benefit.title}
                              </h4>
                              <p className="text-[11px] text-slate-600 leading-normal">
                                {benefit.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200/80 rounded-md p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <Target className="w-4 h-4 text-[#F97316]" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#03254C]">
                          Best Suited For
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-4 font-medium">
                        Tailored specifically for entities and professionals
                        looking to optimize this domain:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeService.suitedFor.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-[#03254C] hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 cursor-default border border-slate-200/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-md p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-[#03254C]" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#03254C]">
                      How AarambhGrow Supports You
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeService.steps.map((step, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-200/60 rounded-md p-4 space-y-2 hover:border-[#F97316] transition-colors duration-200"
                      >
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#03254C] text-white">
                          {step.num}
                        </span>
                        <h4 className="text-xs font-bold text-[#03254C] pt-1">
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesExplorer() {
  return (
    <Suspense fallback={null}>
      <ServicesExplorerInner />
    </Suspense>
  );
}

