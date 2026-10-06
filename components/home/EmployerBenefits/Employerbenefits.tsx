"use client";

import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
});

const businessBenefits = [
  "Build scalable and reliable digital solutions",
  "Streamline business processes with automation",
  "Improve customer experience across platforms",
  "Reduce operational costs with smart technology",
  "Accelerate digital growth with modern solutions",
];

const developmentBenefits = [
  "Modern web and mobile application development",
  "Scalable architecture for growing businesses",
  "Seamless API and third-party integrations",
  "Secure and performance-focused development",
  "Continuous improvements and technical support",
];

export default function EmployerBenefits() {
  const [active, setActive] = useState("business");

  const items =
    active === "business"
      ? businessBenefits
      : developmentBenefits;

  return (
    <section className="py-24">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-[32px] bg-gradient-to-br from-blue-50 to-violet-50 p-10 shadow-xl">
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <p className="text-sm text-slate-500">
                  Digital Solutions
                </p>

                <h3 className="mt-2 text-4xl font-bold">
                  <CountUp
                    end={250}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <p className="text-sm text-slate-500">
                  Client Satisfaction
                </p>

                <h3 className="mt-2 text-4xl font-bold">
                  <CountUp
                    end={98}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  %
                </h3>
              </motion.div>

              <div className="col-span-2 rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex justify-between">
                  <span className="text-sm font-medium">
                    Project Delivery Efficiency
                  </span>

                  <span className="font-semibold text-blue-600">
                    92%
                  </span>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                    ease: "easeOut",
                  }}
                  className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-semibold text-blue-600">
            OUR CORE VALUES
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Technology That Drives Your Business Forward
          </h2>

          <div className="mt-8 flex rounded-2xl bg-slate-100 p-2">
            <button
              onClick={() => setActive("business")}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all ${
                active === "business"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-700"
              }`}
              aria-label="Show business benefits"
            >
              For Businesses
            </button>

            <button
              onClick={() => setActive("development")}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all ${
                active === "development"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600"
              }`}
              aria-label="Show development benefits"
            >
              Our Approach
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
              }}
              className="mt-8 space-y-4"
            >
              {items.map((item, index) => (
                <div
                  key={`${active}-${index}`}
                  className="group flex gap-3"
                >
                  <CheckCircle2 className="mt-1 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />

                  <span className="text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}