"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { Clock3, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
} satisfies Variants;

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
  },
  show: {
    opacity: 1,
    x: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

export default function OfficeLocations() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        animate={{
          scale: [1.1, 1.25, 1.1],
          x: [0, -30, 0],
          y: [0, 25, 0],
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
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container"
      >
        <SectionHeading
          badge="Office Location"
          title="Visit Our Office"
          description="Meet our recruitment specialists and discuss your hiring goals in person."
        />

        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          {/* Left Card */}
          <motion.div
            variants={fadeLeft}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-[0_25px_60px_rgba(37,99,235,.15)]"
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] to-violet-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top Border */}
            <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-transform duration-500 group-hover:scale-x-100" />

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.1,
              }}
              className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-blue-600"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(37,99,235,.35)",
                    "0 0 0 14px rgba(37,99,235,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-2xl"
              />

              <MapPin size={30} />
            </motion.div>

            <h3 className="relative text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
              Dehradun Office
            </h3>

            <p className="relative mt-5 leading-8 text-slate-600">
              1st Floor, 84 Chander Nagar,
              <br />
              Dehradun - 248001,
              <br />
              Uttarakhand, India
            </p>

            <div className="relative mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
              <Clock3
                size={20}
                className="text-blue-600"
              />

              <span className="font-medium text-slate-700">
                Mon - Sat : 9 AM - 5 PM
              </span>
            </div>

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
              className="mt-6 h-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
            />
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeRight}
            whileHover={{
              y: -6,
            }}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps?q=1st+Floor,+84+Chander+Nagar,+Dehradun+248001&output=embed"
              loading="lazy"
              className="h-[520px] w-full transition-all duration-500"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}