"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is a Private Limited Company and why should I register it?",
    answer:
      "A Private Limited Company is a popular corporate business structure that offers limited liability protection to its shareholders, a separate legal identity, and greater credibility in the market. It is ideal for startups and growing businesses looking to raise funding or scale operations securely.",
  },
  {
    question:
      "What documents are generally required for business incorporation?",
    answer:
      "Typically, you need PAN cards and identity/address proofs (like Aadhaar, Voter ID, or Passports) for all directors and shareholders, passport-size photographs, and address proof for the registered office (such as an electricity bill along with an NOC from the owner).",
  },
  {
    question: "How long does the company registration process take?",
    answer:
      "The duration depends on government processing times and document accuracy. Usually, incorporating a Private Limited Company or LLP takes anywhere from 7 to 14 working days once all paperwork is verified and submitted.",
  },
  {
    question: "What is MSME / Udyam registration and do I need it?",
    answer:
      "MSME (Micro, Small, and Medium Enterprises) or Udyam registration helps businesses access government subsidies, priority sector lending from banks, protection against delayed payments, and rebates on trademark registrations.",
  },
  {
    question: "Why do I need professional help for GST and annual compliance?",
    answer:
      "Tax laws and regulatory filings involve strict deadlines and precise calculations. Professional CAs and legal experts ensure error-free submissions, prevent heavy late penalties, and maintain your business's active compliance status.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#f8fafc] py-16 lg:py-14 font-sans text-[#0f172a] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#03254C] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Find clear, straightforward answers to common queries regarding
            company registration, compliance, legal documentation, and financial
            services.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-md shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="text-xs sm:text-sm font-extrabold text-[#03254C]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? "bg-[#F97316] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
