"use client";

import { motion, type Variants } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
} satisfies Variants;

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

const cards = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 7453 852 331",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@visezy.com",
  },
  {
    icon: MapPin,
    title: "Visit Office",
    value: "Dehradun, India",
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.12),transparent_35%)]" />

      <motion.div
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 35, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"
        animate={{
          scale: [1.05, 1.2, 1.05],
          x: [0, -30, 0],
          y: [0, 20, 0],
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
        className="container relative"
      >
        {/* Hero Content */}
        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm"
          >
            Contact Us
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl"
          >
            Let's Build Your

            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Dream Team
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Connect with our recruitment specialists and discover how
            AI-powered hiring can accelerate your business growth and
            help you build exceptional teams.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={container}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-[0_25px_60px_rgba(37,99,235,.15)]"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] to-violet-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top Gradient */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-transform duration-500 group-hover:scale-x-100" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.12,
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

                  <Icon size={28} />
                </motion.div>

                <h3 className="relative text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  {card.title}
                </h3>

                <p className="relative mt-3 text-slate-600 break-words">
                  {card.value}
                </p>

                {/* Bottom Line */}
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
                  className="mt-6 h-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}