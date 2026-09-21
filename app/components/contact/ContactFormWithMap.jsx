"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export default function ContactFormWithMap() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus("success");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#f8fafc] px-4 py-8 font-sans text-[#03254C] sm:px-8 sm:py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 overflow-hidden rounded-md border border-slate-100 bg-white shadow-sm lg:grid-cols-12"
        >
          {/* LEFT: Contact Form */}
          <div className="space-y-6 p-5 sm:p-8 lg:col-span-7 lg:p-10">
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-black text-[#03254C] sm:text-2xl">
                Send Us a <span className="text-[#F26522]">Message</span>
              </h3>

              <p className="mt-1 text-xs text-slate-500">Share your requirements and our advisory team will get back to you.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div variants={fadeInUp}>
                  <label className="mb-1.5 block text-xs font-bold text-[#03254C]">Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#03254C] transition-all focus:border-[#F26522] focus:bg-white focus:outline-none"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="mb-1.5 block text-xs font-bold text-[#03254C]">Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#03254C] transition-all focus:border-[#F26522] focus:bg-white focus:outline-none"
                    required
                  />
                </motion.div>
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div variants={fadeInUp}>
                  <label className="mb-1.5 block text-xs font-bold text-[#03254C]">Phone Number</label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#03254C] transition-all focus:border-[#F26522] focus:bg-white focus:outline-none"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="mb-1.5 block text-xs font-bold text-[#03254C]">Service</label>

                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500 transition-all focus:border-[#F26522] focus:bg-white focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="company-incorporation">Company Incorporation</option>
                    <option value="msme-udyam-registration">MSME / Udyam Registration</option>
                    <option value="gst-registration">GST Registration</option>
                    <option value="income-tax-itr-filing">Income Tax / ITR Filing</option>
                    <option value="mca-annual-filing-roc-compliance">MCA Annual Filing / ROC Compliance</option>
                    <option value="dsc">DSC (Digital Signature Certificate)</option>
                    <option value="startup-india-dpiit-recognition">Startup India / DPIIT Recognition</option>
                    <option value="labour-licence">Labour Licence</option>
                    <option value="fssai-licence">FSSAI Licence</option>
                    <option value="iso-certification">ISO Certification</option>
                    <option value="trademark-registration">Trademark Registration</option>
                    <option value="zed-certification">ZED Certification</option>
                    <option value="80iac-tax-exemption">80IAC Tax Exemption</option>
                    <option value="other">Other Requirement</option>
                  </select>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div variants={fadeInUp}>
                <label className="mb-1.5 block text-xs font-bold text-[#03254C]">Message</label>

                <textarea
                  rows={4}
                  placeholder="Tell us about your business requirement..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#03254C] transition-all focus:border-[#F26522] focus:bg-white focus:outline-none"
                  required
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#F26522] px-6 py-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#d85416] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>

                  {!loading && <ArrowRight className="h-4 w-4" />}
                </motion.button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400 sm:justify-start">
                  <Lock className="h-3.5 w-3.5 text-[#157327]" />
                  <span>We respect your privacy</span>
                </div>
              </motion.div>

              {/* Success Message */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />

                  <p className="text-xs font-semibold text-green-700">
                    Your message has been sent successfully. Our advisory team will contact you soon.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3"
                >
                  <XCircle className="h-4 w-4 shrink-0 text-red-600" />

                  <p className="text-xs font-semibold text-red-700">Something went wrong. Please try again or contact us directly.</p>
                </motion.div>
              )}
            </form>
          </div>

          {/* RIGHT: Location Map */}
          <motion.div
            variants={fadeInUp}
            className="relative flex min-h-[300px] flex-col justify-end overflow-hidden bg-[#03254C] sm:min-h-[360px] lg:col-span-5 lg:min-h-full"
          >
            <iframe
              title="AarambhGrow Advisory Location Map"
              src="https://www.google.com/maps?q=813%2C%20Silver%20Radiance%204%2C%20Ovnaj%2C%20Bhavik%20Publication%2C%20SG%20Highway%2C%20Ahmedabad%2C%20Gujarat%20380060&output=embed"
              className="absolute inset-0 h-full w-full border-0 opacity-80 invert brightness-90 contrast-125"
              loading="lazy"
            />

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 m-4 space-y-2 rounded-md border border-slate-200/80 bg-white/95 p-4 shadow-lg backdrop-blur-xs sm:m-6"
            >
              <h4 className="text-xs font-black text-[#03254C]">AarambhGrow Advisory</h4>

              <p className="text-[11px] leading-snug text-slate-600">
                813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060
              </p>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=813%2C%20Silver%20Radiance%204%2C%20Ovnaj%2C%20Bhavik%20Publication%2C%20SG%20Highway%2C%20Ahmedabad%2C%20Gujarat%20380060"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 pt-1 text-[11px] font-bold text-[#F26522] hover:underline"
              >
                <span>Get Directions</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
