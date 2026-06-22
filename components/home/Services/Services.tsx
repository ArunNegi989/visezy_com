"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Users,
  UserRoundCheck,
  Landmark,
  GraduationCap,
  FileText,
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

export default function Services() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-semibold text-blue-600">
            SOLUTIONS WE PROVIDE
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Inspiring Staffing Solutions
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            AI-powered recruitment services designed for modern businesses.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-100 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.desc}
                </p>

                <button className="mt-8 font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-2">
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}