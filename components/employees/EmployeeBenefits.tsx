"use client";

import { motion } from "framer-motion";
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
    desc: "Accelerate your professional journey.",
  },
  {
    title: "Top Companies",
    icon: BadgeCheck,
    desc: "Work with trusted employers.",
  },
  {
    title: "Global Opportunities",
    icon: Globe,
    desc: "Access jobs worldwide.",
  },
  {
    title: "Supportive Team",
    icon: Users,
    desc: "Get guidance throughout hiring.",
  },
];

export default function EmployeeBenefits() {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeading
          badge="Benefits"
          title="Why Work With Us"
          description="Helping professionals discover better opportunities."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <item.icon
                size={36}
                className="mb-5 text-blue-600"
              />

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}