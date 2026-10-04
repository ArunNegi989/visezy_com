"use client";

import { motion, type Variants } from "framer-motion";

const companies = [
  "NovoTech",
  "EliteCore",
  "FutureFlow",
  "SkyBridge",
  "AgileWave",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} satisfies Variants;

export default function TrustedCompanies() {
  return (
    <section className="relative overflow-hidden py-16">

      {/* Background Glow */}
      <motion.div
        className="absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container">

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500"
        >
          Trusted by leading companies
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5"
        >
          {companies.map((company) => (
            <motion.div
              key={company}
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.06,
                rotateX: 5,
                rotateY: -5,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-violet-500/0 opacity-0 transition duration-500 group-hover:opacity-100" />

              <span className="relative text-xl font-semibold text-slate-400 transition-colors duration-300 group-hover:text-blue-600">
                {company}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}