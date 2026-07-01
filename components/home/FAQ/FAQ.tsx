"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
const faqs = [
  {
    q: "What types of candidates do you recruit?",
    a: "We recruit talent across multiple industries and job functions.",
  },
  {
    q: "How does your recruitment process work?",
    a: "We leverage AI-powered screening and matching for faster hiring.",
  },
  {
    q: "What are your fees?",
    a: "Pricing depends on the engagement model and role requirements.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
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
    x: 60,
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

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const statsRef = useRef(null);

  const isInView = useInView(statsRef, {
    once: true,
    amount: 0.4,
  });
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-50 py-24 scroll-mt-24"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.8, 0.35],
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
        className="container grid gap-16 lg:grid-cols-2"
      >
        {/* Left */}
        <motion.div variants={fadeLeft}>
          <h2 className="text-4xl font-bold leading-tight text-slate-900">
            Find Interview-ready Candidates in 24 Hours
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Our AI-driven recruitment platform connects employers with
            qualified professionals faster, smarter, and more accurately.
          </p>

          <div
            ref={statsRef}
            className="mt-10 flex gap-10"
          >
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.04,
              }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-5xl font-bold text-blue-600">
                {isInView && (
                  <CountUp
                    start={0}
                    end={220}
                    duration={2}
                  />
                )}
                +
              </h3>

              <p className="mt-2 text-slate-500">
                Trusted Companies
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -6,
                scale: 1.04,
              }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-5xl font-bold text-blue-600">
                {isInView && (
                  <CountUp
                    start={0}
                    end={750}
                    duration={2.2}
                  />
                )}
                +
              </h3>

              <p className="mt-2 text-slate-500">
                Successful Hires
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          variants={fadeRight}
          className="space-y-5"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.q}
              whileHover={{
                y: -3,
              }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.q}
                </span>

                <motion.div
                  animate={{
                    rotate: open === index ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  >
                    <p className="px-6 pb-6 leading-7 text-slate-600">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}