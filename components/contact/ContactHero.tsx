"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactHero() {
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

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.12),transparent_35%)]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
            Let's Build Your
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Dream Team
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Connect with our recruitment specialists and discover
            how AI-powered hiring can accelerate your growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8 }}
              className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all group-hover:rotate-6">
                <card.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {card.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}