"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function EmployeeHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,.12),transparent_35%)]" />

      <motion.div
        className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-0 top-16 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl"
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm"
          >
            <BriefcaseBusiness size={16} />
            Career Opportunities
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl"
          >
            Find Your

            <motion.span
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
              className="block bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent"
            >
              Dream Job
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Join leading companies, accelerate your career and discover
            opportunities tailored to your skills through our AI-powered
            recruitment platform.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-10"
          >
            <Link
              href="#application-form"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(59,130,246,.35)]"
            >
              Apply Now

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}