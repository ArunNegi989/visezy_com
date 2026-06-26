"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

export default function EmployeeHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,.12),transparent_35%)]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            <BriefcaseBusiness size={16} />
            Career Opportunities
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl"
          >
            Find Your
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Dream Job
            </span>
          </motion.h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Join leading companies, accelerate your career and discover
            opportunities tailored to your skills.
          </p>

          <Link
            href="#application-form"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Apply Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}