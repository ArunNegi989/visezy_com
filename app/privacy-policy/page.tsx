"use client";

import CTA from "@/components/common/CTA/CTA";
import {
  ShieldCheck,
  Database,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "VISEZY Staffing Solutions is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you interact with our website and services.",
  },
  {
    id: "information",
    title: "Information We Collect",
    points: [
      "Personal information such as name, email address, phone number and resume.",
      "Professional details including skills, education and work experience.",
      "Device information such as browser type, IP address and operating system.",
      "Website usage analytics and interaction data.",
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    points: [
      "To provide recruitment and staffing services.",
      "To connect candidates with potential employers.",
      "To improve user experience and platform performance.",
      "To communicate updates and relevant opportunities.",
      "To comply with legal and regulatory obligations.",
    ],
  },
  {
    id: "security",
    title: "Security & Data Protection",
    content:
      "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. While we strive for maximum security, no online platform can guarantee complete protection.",
  },
  {
    id: "retention",
    title: "Data Retention",
    content:
      "We retain your information only as long as necessary to provide our services, fulfill legal obligations, resolve disputes, and enforce agreements.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pt-32 pb-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.12),transparent_35%)]" />

        <motion.div
          className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
              <ShieldCheck size={16} />
              Privacy & Security
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
              Privacy
              <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Transparency, trust and security are at the core of everything we
              do. Learn how VISEZY protects and manages your data.
            </p>

            <div className="mt-8 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              Last Updated: June 2026
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Navigation */}
      <section className="pb-10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-4 md:grid-cols-5"
          >
            {sections.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
              >
                <p className="font-semibold text-slate-700 group-hover:text-blue-600">
                  {item.title}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm md:p-14">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                }}
                className="mb-14 scroll-mt-32"
              >
                <h2 className="mb-6 text-3xl font-bold text-slate-900">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-lg leading-8 text-slate-600">
                    {section.content}
                  </p>
                )}

                {section.points && (
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                    className="space-y-5"
                  >
                    {section.points.map((point) => (
                      <motion.div
                        key={point}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -25,
                          },
                          show: {
                            opacity: 1,
                            x: 0,
                          },
                        }}
                        whileHover={{
                          x: 6,
                        }}
                        className="flex items-start gap-4"
                      >
                        <CheckCircle2
                          size={22}
                          className="mt-1 shrink-0 text-emerald-500"
                        />

                        <p className="text-lg leading-8 text-slate-600">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="pb-24">
        <div className="container">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            className="overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-10 text-white shadow-2xl md:p-14"
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Lock size={24} />

                  <h2 className="text-3xl font-bold">
                    Questions About Privacy?
                  </h2>
                </div>

                <p className="max-w-2xl text-blue-100">
                  If you have any questions regarding this Privacy Policy or
                  how your data is handled, our team is here to help.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:info@visezy.com"
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                  }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Mail size={20} />
                  info@visezy.com
                </motion.a>

                <motion.a
                  href="tel:+917453852331"
                  whileHover={{
                    x: 8,
                    scale: 1.03,
                  }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Database size={20} />
                  +91 7453 852 331
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}