"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  Rocket,
  Users,
  Globe,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    title: "Career Growth",
    icon: Rocket,
    desc: "Accelerate your professional journey with personalized career opportunities and continuous development.",
  },
  {
    title: "Top Companies",
    icon: BadgeCheck,
    desc: "Connect with trusted employers and leading organizations across multiple industries.",
  },
  {
    title: "Global Opportunities",
    icon: Globe,
    desc: "Explore exciting job openings worldwide with remote and international career options.",
  },
  {
    title: "Supportive Team",
    icon: Users,
    desc: "Receive expert guidance and dedicated support throughout every step of your hiring journey.",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const card: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
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

export default function EmployeeBenefits() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Animated Background */}
      <motion.div
        className="absolute left-0 top-10 -z-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl"
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-0 bottom-0 -z-10 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl"
        animate={{
          x: [0, -35, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container">
        <SectionHeading
          badge="Benefits"
          title="Why Work With Us"
          description="Helping professionals discover better opportunities with AI-powered recruitment and career guidance."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={card}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:border-blue-100 hover:shadow-2xl"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/40 to-violet-50/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.15,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50"
                >
                  <Icon
                    size={30}
                    className="text-blue-600"
                  />
                </motion.div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  {item.title}
                </h3>

                <p className="relative mt-4 leading-7 text-slate-600">
                  {item.desc}
                </p>

                {/* Bottom Accent */}
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileHover={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="relative mt-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}