"use client";

import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "HR Manager",
    company: "SkyBridge",
    review:
      "VISEZY helped us reduce hiring time by more than 60%. Their recruitment specialists understood exactly what we needed and delivered exceptional candidates within days.",
  },
  {
    name: "Simon Mayer",
    role: "CEO",
    company: "NovoTech",
    review:
      "Their AI-powered recruitment platform has completely transformed our hiring process. We've never hired this efficiently before.",
  },
  {
    name: "Lena Carlier",
    role: "Operations Lead",
    company: "EliteCore",
    review:
      "Professional, responsive, and incredibly effective. VISEZY has become our long-term hiring partner for every expansion.",
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

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Animated Background */}
      <motion.div
        className="absolute right-0 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-100/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.75, 0.35],
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
        viewport={{ once: true, amount: 0.2 }}
        className="container"
      >
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-semibold uppercase tracking-wider text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Trusted by startups, enterprises, and growing businesses across
            multiple industries.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: index * 0.1 + i * 0.05,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                  >
                    <Star
                      size={18}
                      className="fill-amber-400 text-amber-400"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="leading-8 text-slate-600">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-8 h-px bg-slate-200" />

              {/* Author */}
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  {item.name}
                </h4>

                <p className="mt-1 text-slate-500">
                  {item.role} • {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}