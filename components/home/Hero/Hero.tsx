"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import CountUp from "react-countup";
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

  /* -------------------- Animation Variants -------------------- */

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const fadeLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -70,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeRight: Variants = {
    hidden: {
      opacity: 0,
      x: 70,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden bg-white h-[1440px] lg:h-[900px]  pt-12 pb-24 lg:pb-32"
    >
      {/* Background Effects */}

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_40%)]" />

      <motion.div
        className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 35, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT CONTENT */}

          <motion.div variants={fadeLeft}>

            <motion.div
              variants={fadeUp}
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700 shadow-sm"
            >
              <Sparkles size={16} />
              AI-Powered Recruitment Platform
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl xl:text-7xl"
            >
              {slider?.title}

              <motion.span
                animate={{
                  backgroundPosition: [
                    "0% 50%",
                    "100% 50%",
                    "0% 50%",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="mt-2 block bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-[length:200%_200%] bg-clip-text text-transparent"
              >
                Simple, Fast
              </motion.span>

              {slider?.subtitle}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-600"
            >
              {slider?.description}
            </motion.p>

            {/* Feature Pills */}

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              {[
                "Smart Screening",
                "AI Matching",
                "24/7 Support",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                  }}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            {/* CTA */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={slider?.primaryButtonLink || "/contact"}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(79,70,229,0.35)]"
                >
                  {slider?.primaryButtonText}

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={slider?.secondaryButtonLink || "/employees"}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg"
                >
                  {slider?.secondaryButtonText}
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}

            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-xl"
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 280 }}
              className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm min-w-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 whitespace-nowrap">
                  <CountUp
                    end={10000}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </h3>

             <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-tight">
                  Candidates
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 280 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-3xl font-bold text-slate-900">
                  <CountUp
                    end={500}
                    duration={2.2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Companies
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 280 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-3xl font-bold text-slate-900">
                  <CountUp
                    end={24}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  h
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Average Hiring
                </p>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* RIGHT VISUAL */}

          <motion.div
            variants={fadeRight}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
              }}
              className="relative overflow-hidden rounded-[42px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            >
              <div className="overflow-hidden rounded-[34px]">
                <motion.img
                  key={slider?._id}
                  initial={{
                    scale: 1.15,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.9,
                  }}
                  src={imageUrl || "/hero.jpg"}
                  alt={slider?.title || "Hero"}
                 className="h-[300px] sm:h-[420px] lg:h-[580px] w-full object-cover lg:object-cover object-contain bg-white"
                />
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}