"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    title: "Understand Requirements",
    description:
      "We understand your business goals, users, challenges, technical requirements, and project vision.",
  },
  {
    title: "Plan & Design",
    description:
      "We define the solution architecture, user experience, technology stack, and development roadmap.",
  },
  {
    title: "Build & Test",
    description:
      "Our team develops the solution while continuously testing functionality, performance, security, and usability.",
  },
  {
    title: "Launch & Support",
    description:
      "We deploy your product and provide ongoing maintenance, improvements, and technical support.",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const card: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HiringProcess() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Animated Background */}
      <motion.div
        className="absolute left-0 top-20 -z-10 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl"
        animate={{
          x: [0, 35, 0],
          y: [0, -30, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-0 top-40 -z-10 h-80 w-80 rounded-full bg-violet-100/70 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container">
        <SectionHeading
          badge="Our Process"
          title="From Idea To Digital Product"
          description="A transparent and structured development process designed to turn your ideas into reliable, scalable, and user-focused digital solutions."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="relative mt-20"
        >
          {/* Desktop Timeline */}
          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "left center",
            }}
            className="absolute left-0 top-1/2 hidden h-[4px] w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 md:block"
          />

          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={card}
                className={`group relative ${
                  index % 2 === 0
                    ? "md:-translate-y-12"
                    : "md:translate-y-12"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(37,99,235,.45)",
                      "0 0 0 14px rgba(37,99,235,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute left-1/2 top-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-lg md:block"
                />

                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                  }}
                  className="relative z-30 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 p-8 text-center backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:border-blue-200 hover:shadow-[0_30px_80px_rgba(37,99,235,.18)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-indigo-500/[0.03] to-violet-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-transform duration-500 group-hover:scale-x-100" />

                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      rotate: 10,
                      scale: 1.15,
                    }}
                    className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-2xl font-bold text-white shadow-[0_15px_35px_rgba(37,99,235,.35)]"
                  >
                    {index + 1}
                  </motion.div>

                  <h3 className="relative text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {step.title}
                  </h3>

                  <p className="relative mt-4 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileHover={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="relative mt-6 h-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}