// "use client";

// import React, { useState } from "react";
// import {
//   Star,
//   Search,
//   Compass,
//   Zap,
//   ShieldCheck,
//   CheckCircle2,
//   Sparkles,
//   TrendingUp,
// } from "lucide-react";

// export default function ProcessSection() {
//   // Explicitly set default active step to Phase 01 (index 0)
//   const [activeStep, setActiveStep] = useState(0);

//   const steps = [
//     {
//       id: "01",
//       badge: "PHASE 01",
//       title: "Understand Your Business",
//       subtitle: "Discovery & Operational Context",
//       icon: Search,
//       accent: "#f26522",
//       description:
//         "We begin by learning about your business goals, challenges, and future plans to map regulatory frameworks and eliminate friction from day one.",
//       deliverables: [
//         "Business Goals & Context Mapping",
//         "Compliance & Regulatory Gap Assessment",
//         "Operational Bottleneck Identification",
//       ],
//       metric: "100% Structural Clarity",
//     },
//     {
//       id: "02",
//       badge: "PHASE 02",
//       title: "Develop the Right Strategy",
//       subtitle: "Custom Compliance Architecture",
//       icon: Compass,
//       accent: "#157327",
//       description:
//         "Our experts recommend the most effective solutions based on your specific requirements, crafting a cost-effective roadmap for speed.",
//       deliverables: [
//         "Custom Legal & Regulatory Roadmap",
//         "Resource & Cost Optimization Plan",
//         "Milestone-Driven Execution Timeline",
//       ],
//       metric: "Zero Friction Advisory",
//     },
//     {
//       id: "03",
//       badge: "PHASE 03",
//       title: "Execute with Precision",
//       subtitle: "Rapid Implementation & Filing",
//       icon: Zap,
//       accent: "#f26522",
//       description:
//         "From complex documentation to government authority filings, we manage every single step professionally with total accuracy.",
//       deliverables: [
//         "Precision Legal Drafting & Verification",
//         "Authority & Regulatory Submissions",
//         "Real-Time Filing Status Transparency",
//       ],
//       metric: "Fast-Track Approval",
//     },
//     {
//       id: "04",
//       badge: "PHASE 04",
//       title: "Ongoing Business Support",
//       subtitle: "Proactive Long-Term Scale",
//       icon: ShieldCheck,
//       accent: "#157327",
//       description:
//         "Our relationship doesn't end after delivery. We continue supporting your business as it grows with annual updates and guidance.",
//       deliverables: [
//         "Annual Compliance Advisory",
//         "Dedicated Account Management",
//         "Continuous Regulatory Monitoring",
//       ],
//       metric: "Long-Term Security",
//     },
//   ];

//   // Safely fallback to step 01 if activeStep is out of bounds
//   const current = steps[activeStep] || steps[0];

//   return (
//     <section
//       onMouseLeave={() => setActiveStep(0)} // Resets back to Phase 01 when cursor leaves the component area
//       className="relative w-full bg-[#f8fafc] py-14 sm:py-20 font-sans select-none overflow-hidden text-[#0f172a]"
//     >
//       {/* Subtle Light Geometric Accent Glows */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f26522]/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#157327]/5 rounded-full blur-3xl pointer-events-none" />

//       {/* Background Decorative Grid Patterns */}
//       <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
//         <div className="grid grid-cols-6 gap-2">
//           {Array.from({ length: 24 }).map((_, i) => (
//             <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f26522]" />
//           ))}
//         </div>
//       </div>

//       <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
//         <div className="grid grid-cols-6 gap-2">
//           {Array.from({ length: 24 }).map((_, i) => (
//             <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#157327]" />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* SECTION BADGE */}
//         <div className="flex justify-center mb-4">
//           <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5f0] border border-[#f26522]/20 px-3.5 py-1">
//             <Star className="w-3 h-3 fill-[#f26522] text-[#f26522]" />
//             <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
//               OUR METHODOLOGY
//             </span>
//           </div>
//         </div>

//         {/* SECTION HEADER */}
//         <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2a4a] leading-[1.2] tracking-tight">
//             Simple Process. Powerful Results.
//           </h2>
//           <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
//             An engineered four-stage execution rail built to navigate regulatory complexity with absolute clarity.
//           </p>
//         </div>

//         {/* TIMELINE INTERACTIVE CONNECTOR BAR */}
//         <div className="mb-10 relative">
//           {/* Continuous Light Rail Line (Desktop) */}
//           <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200/80 -translate-y-1/2 z-0 rounded-full" />

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
//             {steps.map((item, idx) => {
//               const Icon = item.icon;
//               const isActive = activeStep === idx;

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveStep(idx)}
//                   onMouseEnter={() => setActiveStep(idx)}
//                   onMouseLeave={() => setActiveStep(0)} // Reset to 0 when cursor moves away from button
//                   className={`group relative text-left p-4 rounded-md transition-all duration-300 cursor-pointer ${
//                     isActive
//                       ? "bg-white border-b-2 border-[#0f2a4a] shadow-xl shadow-slate-200/50 translate-y-[-2px]"
//                       : "bg-white/70 border border-slate-200/80 hover:bg-white hover:border-slate-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <span
//                       className={`text-xs font-black px-2.5 py-1 rounded-md transition-all duration-300 ${
//                         isActive
//                           ? "text-white shadow-xs"
//                           : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
//                       }`}
//                       style={{
//                         backgroundColor: isActive ? item.accent : undefined,
//                       }}
//                     >
//                       {item.id}
//                     </span>

//                     <Icon
//                       className={`w-4 h-4 transition-colors ${
//                         isActive ? "text-[#0f2a4a]" : "text-slate-400 group-hover:text-slate-600"
//                       }`}
//                     />
//                   </div>

//                   <div className="space-y-0.5">
//                     <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
//                       {item.badge}
//                     </span>
//                     <h4 className="text-xs font-black text-[#0f2a4a] truncate">
//                       {item.title}
//                     </h4>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* MAIN FEATURE DISPLAY PANEL */}
//         <div className="bg-white border border-slate-200/80 rounded-md p-6 sm:p-10 shadow-sm relative overflow-hidden">

//           {/* Dynamic Ambient Corner Glow */}
//           <div
//             className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-500"
//             style={{ backgroundColor: current.accent }}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

//             {/* LEFT: TEXT CONTENT & STRATEGY */}
//             <div className="lg:col-span-7 space-y-5">
//               <div className="flex items-center gap-2">
//                 <span
//                   className="w-2.5 h-2.5 rounded-full animate-pulse"
//                   style={{ backgroundColor: current.accent }}
//                 />
//                 <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
//                   {current.badge} • {current.subtitle}
//                 </span>
//               </div>

//               <h3 className="text-2xl sm:text-3xl font-black text-[#0f2a4a] leading-tight">
//                 {current.title}
//               </h3>

//               <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
//                 {current.description}
//               </p>

//               {/* Impact Metric Bar */}
//               <div className="pt-2 flex items-center gap-3">
//                 <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#f8fafc] border border-slate-200/80 text-xs font-bold text-[#0f2a4a]">
//                   <TrendingUp className="w-4 h-4 text-[#f26522]" />
//                   <span>Strategic Focus: {current.metric}</span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: DELIVERABLE CHECKLIST CARD */}
//             <div className="lg:col-span-5">
//               <div className="bg-[#f8fafc] border border-slate-200/80 rounded-md p-5 sm:p-6 space-y-3">

//                 <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
//                   <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
//                     Phase Deliverables
//                   </span>
//                   <Sparkles className="w-4 h-4 text-slate-400" />
//                 </div>

//                 <div className="space-y-2.5">
//                   {current.deliverables.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-3 p-3 rounded-md bg-white border border-slate-200/60 shadow-2xs transition-all duration-300"
//                     >
//                       <CheckCircle2
//                         className="w-4 h-4 shrink-0"
//                         style={{ color: current.accent }}
//                       />
//                       <span className="text-xs font-bold text-[#0f2a4a]">
//                         {item}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* BOTTOM RIGHT STEP COUNTER - DEFAULTS TO 01 OF 04 */}
//                 <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-slate-400">
//                   <span>Methodology Execution</span>
//                   <span className="text-[#0f2a4a] font-black">Step {current.id} of 04</span>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>

//         {/* STATIC NON-CLICKABLE FOOTER */}
//         <div className="mt-10 flex justify-center">
//           <div className="inline-flex items-center gap-2 py-2 px-4 bg-white border border-slate-200/80 rounded-md text-[11px] font-extrabold uppercase tracking-wider text-[#0f2a4a]/70 cursor-default shadow-xs">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#f26522]" />
//             <span>Institutional Operational Standard</span>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import {
  Star,
  Search,
  Compass,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function FullProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      badge: "PHASE 01",
      title: "Understand Your Business",
      subtitle: "Discovery & Operational Context",
      icon: Search,
      accent: "#f26522",
      description:
        "We begin by learning about your business goals, challenges, and future plans to map regulatory frameworks and eliminate friction from day one.",
      deliverables: [
        "Business Goals & Context Mapping",
        "Compliance & Regulatory Gap Assessment",
        "Operational Bottleneck Identification",
      ],
      metric: "100% Structural Clarity",
    },
    {
      id: "02",
      badge: "PHASE 02",
      title: "Develop the Right Strategy",
      subtitle: "Custom Compliance Architecture",
      icon: Compass,
      accent: "#157327",
      description:
        "Our experts recommend the most effective solutions based on your specific requirements, crafting a cost-effective roadmap for speed.",
      deliverables: [
        "Custom Legal & Regulatory Roadmap",
        "Resource & Cost Optimization Plan",
        "Milestone-Driven Execution Timeline",
      ],
      metric: "Zero Friction Advisory",
    },
    {
      id: "03",
      badge: "PHASE 03",
      title: "Execute with Precision",
      subtitle: "Rapid Implementation & Filing",
      icon: Zap,
      accent: "#f26522",
      description:
        "From complex documentation to government authority filings, we manage every single step professionally with total accuracy.",
      deliverables: [
        "Precision Legal Drafting & Verification",
        "Authority & Regulatory Submissions",
        "Real-Time Filing Status Transparency",
      ],
      metric: "Fast-Track Approval",
    },
    {
      id: "04",
      badge: "PHASE 04",
      title: "Ongoing Business Support",
      subtitle: "Proactive Long-Term Scale",
      icon: ShieldCheck,
      accent: "#157327",
      description:
        "Our relationship doesn't end after delivery. We continue supporting your business as it grows with annual updates and guidance.",
      deliverables: [
        "Annual Compliance Advisory",
        "Dedicated Account Management",
        "Continuous Regulatory Monitoring",
      ],
      metric: "Long-Term Security",
    },
  ];

  const current = steps[activeStep] || steps[0];

  return (
    <section
      onMouseLeave={() => setActiveStep(0)}
      className="relative w-full bg-[#f8fafc] py-14 sm:py-20 font-sans select-none overflow-hidden text-[#0f172a]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5f0] border border-[#f26522]/20 px-3.5 py-1">
            <Star className="w-3 h-3 fill-[#f26522] text-[#f26522]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
              OUR METHODOLOGY
            </span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2a4a] leading-[1.2] tracking-tight">
            Simple Process. Powerful Results.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            An engineered four-stage execution rail built to navigate regulatory
            complexity with absolute clarity.
          </p>
        </div>

        <div className="mb-10 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative text-left p-4 rounded-md transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-b-2 border-[#0f2a4a] shadow-xl shadow-slate-200/50 translate-y-[-2px]"
                      : "bg-white/70 border border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-md transition-all duration-300 ${
                        isActive ? "text-white" : "bg-slate-100 text-slate-600"
                      }`}
                      style={{
                        backgroundColor: isActive ? item.accent : undefined,
                      }}
                    >
                      {item.id}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-[#0f2a4a]" : "text-slate-400"}`}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {item.badge}
                    </span>
                    <h4 className="text-xs font-black text-[#0f2a4a] truncate">
                      {item.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-md p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: current.accent }}
                />
                <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
                  {current.badge} • {current.subtitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0f2a4a] leading-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#f8fafc] border border-slate-200/80 text-xs font-bold text-[#0f2a4a]">
                  <TrendingUp className="w-4 h-4 text-[#f26522]" />
                  <span>Strategic Focus: {current.metric}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-md p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
                    Phase Deliverables
                  </span>
                  <Sparkles className="w-4 h-4 text-slate-400" />
                </div>
                <div className="space-y-2.5">
                  {current.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-md bg-white border border-slate-200/60 shadow-2xs"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: current.accent }}
                      />
                      <span className="text-xs font-bold text-[#0f2a4a]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Methodology Execution</span>
                  <span className="text-[#0f2a4a] font-black">
                    Step {current.id} of 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
