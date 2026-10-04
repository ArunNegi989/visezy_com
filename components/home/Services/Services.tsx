"use client";

import { motion, type Variants } from "framer-motion";
import {
  BriefcaseBusiness,
  Users,
  UserRoundCheck,
  Landmark,
  GraduationCap,
  FileText,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Executive Search",
    icon: BriefcaseBusiness,
    desc: "Identify and attract top-tier leadership talent.",
  },
  {
    title: "Temporary Staffing",
    icon: Users,
    desc: "Flexible workforce solutions for short-term needs.",
  },
  {
    title: "Direct Hire",
    icon: UserRoundCheck,
    desc: "Build stronger teams with permanent placements.",
  },
  {
    title: "Contract Staffing",
    icon: FileText,
    desc: "Scale quickly with project-based specialists.",
  },
  {
    title: "Payrolling",
    icon: Landmark,
    desc: "Simplify workforce and payroll management.",
  },
  {
    title: "Training",
    icon: GraduationCap,
    desc: "Upskill teams with targeted training programs.",
  },
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
    y: 45,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Glow */}

      <motion.div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="font-semibold text-blue-600">
            SOLUTIONS WE PROVIDE
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Inspiring Staffing Solutions
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            AI-powered recruitment services designed for modern businesses.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: .2 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{
                  y: -14,
                  scale: 1.03,
                  rotateX: 4,
                  rotateY: -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
              >

                {/* Shine Effect */}

                <div className="absolute -left-40 top-0 h-full w-24 -skew-x-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]" />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50"
                >
                  <Icon
                    className="text-blue-600 transition-transform duration-300 group-hover:scale-110"
                    size={28}
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.desc}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-blue-600">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />

                </button>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}