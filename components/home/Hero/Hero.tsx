"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSliders } from "@/services/slider.service";

interface Slider {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function Hero() {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const [current, setCurrent] = useState(0);
  const slider = sliders[current];
  useEffect(() => {
    const load = async () => {
      const data = await getSliders();

      if (data.success) {
        setSliders(data.sliders);
      }
    };

    load();
  }, []);
  const imageUrl =
    slider?.image?.startsWith("http")
      ? slider.image
      : `${process.env.NEXT_PUBLIC_API_URL}/${slider?.image}`;
  useEffect(() => {
    if (!sliders.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliders]);

  return (
    <section className="relative overflow-hidden bg-white pt-2 pb-24 lg:pt-16 lg:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_40%)]" />

      <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="container relative mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700 shadow-sm"
            >
              <Sparkles size={16} />
              AI-Powered Recruitment Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl xl:text-7xl"
            >
              {slider?.title}

              <span className="mt-2 block bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Simple, Fast
              </span>
              {slider?.subtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-600"
            >
              {slider?.description}
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {[
                "Smart Screening",
                "AI Matching",
                "24/7 Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link href={slider?.primaryButtonLink || "/contact"}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(79,70,229,0.35)]"
              >
                {slider?.primaryButtonText}

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link href={slider?.secondaryButtonLink || "/employees"}

                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg"
              >
                {slider?.secondaryButtonText}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-12 grid max-w-xl grid-cols-3 gap-4"
            >
              {[
                {
                  value: "10K+",
                  label: "Candidates",
                },
                {
                  value: "500+",
                  label: "Companies",
                },
                {
                  value: "24h",
                  label: "Average Hiring",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-3xl font-bold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            {/* Main Image Card */}
            <div className="relative overflow-hidden rounded-[42px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="overflow-hidden rounded-[34px]">
                <img
                  src={imageUrl || "/hero.jpg"}
                  alt={slider?.title || "Hero"}
                  className="h-[580px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}