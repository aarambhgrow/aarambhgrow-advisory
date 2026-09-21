"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, Sparkles, Navigation } from "lucide-react";

export default function ContactMainSection() {
  return (
    <section className="w-full bg-[#f8fafc] px-4 py-4 font-sans text-[#03254C] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px] space-y-4">
        {/* MAIN CONTAINER */}
        <div className="space-y-5 rounded-md border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(3,37,76,0.05)] sm:p-6">
          {/* HEADER */}
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#157327]/15 bg-[#157327]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#157327]">
                <Sparkles className="h-3 w-3" />
                Contact Desk
              </div>

              <h2 className="text-xl font-extrabold tracking-tight text-[#03254C] sm:text-2xl">Get in Touch with AarambhGrow Advisory</h2>
            </div>

            <div className="flex items-center gap-2 self-start rounded-md border border-slate-100 bg-slate-50 px-3 py-1.5 sm:self-auto">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#157327] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#157327]" />
              </span>

              <span className="text-[11px] font-bold text-[#03254C]">
                Active Hours: <span className="font-normal text-slate-500">Mon–Sat, 9 AM – 7 PM</span>
              </span>
            </div>
          </div>

          {/* CONTACT CHANNELS + OFFICE */}
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-12">
            {/* CONTACT CARDS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-8">
              {/* PHONE */}
              <a
                href="tel:+919998715799"
                className="group relative flex flex-col justify-between rounded-md border border-slate-200/80 bg-[#f8fafc] p-3.5 transition-all duration-200 hover:border-[#157327] hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-[#157327]/10 p-2 text-[#157327]">
                    <Phone className="h-4 w-4" />
                  </div>

                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#157327]" />
                </div>

                <div className="mt-3">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone Inquiry</span>

                  <p className="mt-0.5 truncate text-xs font-bold text-[#03254C] transition-colors group-hover:text-[#157327]">
                    +91 99987 15799
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:info@aarambhgrow.com"
                className="group relative flex flex-col justify-between rounded-md border border-slate-200/80 bg-[#f8fafc] p-3.5 transition-all duration-200 hover:border-[#F26522] hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-[#F26522]/10 p-2 text-[#F26522]">
                    <Mail className="h-4 w-4" />
                  </div>

                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F26522]" />
                </div>

                <div className="mt-3">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Official Email</span>

                  <p className="mt-0.5 truncate text-xs font-bold text-[#03254C] transition-colors group-hover:text-[#F26522]">
                    info@aarambhgrow.com
                  </p>
                </div>
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/919998715799"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-md border border-slate-200/80 bg-[#f8fafc] p-3.5 transition-all duration-200 hover:border-[#F26522] hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-[#F26522]/10 p-2 text-[#F26522]">
                    <MessageCircle className="h-4 w-4" />
                  </div>

                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F26522]" />
                </div>

                <div className="mt-3">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">WhatsApp Chat</span>

                  <p className="mt-0.5 truncate text-xs font-bold text-[#03254C] transition-colors group-hover:text-[#F26522]">
                    Instant Messaging
                  </p>
                </div>
              </a>
            </div>

            {/* OFFICE PANEL */}
            <div className="flex flex-col justify-between space-y-3 rounded-md border border-[#03254C]/10 bg-[#03254C]/5 p-3.5 lg:col-span-4">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0 rounded-md bg-[#157327] p-2 text-white shadow-xs">
                  <MapPin className="h-3.5 w-3.5" />
                </div>

                <div className="min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Visit Our Office</span>

                  <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[#03254C]">
                    813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=813%2C%20Silver%20Radiance%204%2C%20Ovnaj%2C%20Bhavik%20Publication%2C%20SG%20Highway%2C%20Ahmedabad%2C%20Gujarat%20380060"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#F26522] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs transition-colors hover:bg-[#d85416]"
              >
                <span>Navigate on Maps</span>
                <Navigation className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
