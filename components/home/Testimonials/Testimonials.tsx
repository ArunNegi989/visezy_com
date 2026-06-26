"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "HR Manager",
    company: "SkyBridge",
    review:
      "VISEZY helped us reduce hiring time by more than 60%.",
  },
  {
    name: "Simon Mayer",
    role: "CEO",
    company: "NovoTech",
    review:
      "Their AI-powered approach delivers exceptional talent quickly.",
  },
  {
    name: "Lena Carlier",
    role: "Operations Lead",
    company: "EliteCore",
    review:
      "A reliable recruitment partner for scaling our teams.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-semibold text-blue-600">
            TESTIMONIALS
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h4 className="font-bold">{item.name}</h4>

                <p className="text-slate-500">
                  {item.role} · {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}