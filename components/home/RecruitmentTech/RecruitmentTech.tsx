"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Efficient AI matching",
  "Expanded talent network",
  "Automated screening",
  "Enhanced candidate experience",
];

export default function RecruitmentTech() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="font-semibold text-blue-600">
            RECRUITMENT TECHNOLOGY
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Solving Recruitment Using Technology
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We leverage cutting-edge technology to streamline the
            recruitment process for both businesses and candidates.
          </p>

          <div className="mt-8 space-y-5">
            {features.map((feature) => (
              <div key={feature} className="flex gap-3">
                <CheckCircle2 className="text-emerald-500" />

                <span className="text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="relative"
        >
          <div className="rounded-[32px] bg-gradient-to-br from-blue-100 to-violet-100 p-10">
            <div className="rounded-[28px] bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    New Employees
                  </p>

                  <h3 className="text-5xl font-bold">112</h3>
                </div>

                <div className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-600">
                  +12%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}