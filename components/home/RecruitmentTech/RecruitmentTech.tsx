"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";

const features = [
  "Efficient AI matching",
  "Expanded talent network",
  "Automated screening",
  "Enhanced candidate experience",
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

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

export default function RecruitmentTech() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Animated Background Glow */}
      <motion.div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container grid items-center gap-16 lg:grid-cols-2"
      >
        {/* LEFT CONTENT */}
        <motion.div variants={fadeLeft}>
          <span className="font-semibold text-blue-600">
            RECRUITMENT TECHNOLOGY
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Solving Recruitment Using Technology
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We leverage cutting-edge technology to streamline the recruitment
            process for both businesses and candidates.
          </p>

          <div className="mt-8 space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <CheckCircle2 className="text-emerald-500" />
                </motion.div>

                <span className="text-slate-600">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          variants={fadeRight}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.03,
            rotateX: 4,
            rotateY: -4,
          }}
          className="relative"
        >
          <div className="rounded-[32px] bg-gradient-to-br from-blue-100 to-violet-100 p-10 shadow-xl">
            <div className="rounded-[28px] bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    New Employees
                  </p>

                  <h3 className="mt-2 text-5xl font-bold text-slate-900">
                    <CountUp
                      end={112}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </h3>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-600 shadow-sm"
                >
                  +12%
                </motion.div>
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Recruitment Success
                  </span>

                  <span className="font-semibold text-blue-600">
                    92%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "92%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.6,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                  />
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                  }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-500">
                    Hiring Speed
                  </p>

                  <h4 className="mt-1 text-2xl font-bold">
                    3 Days
                  </h4>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                  }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-500">
                    Accuracy
                  </p>

                  <h4 className="mt-1 text-2xl font-bold">
                    98%
                  </h4>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}