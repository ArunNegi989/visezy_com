"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import CountUp from "react-countup";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const employerBenefits = [
  "Access a diverse talent pool",
  "Streamline your hiring process",
  "Make informed hiring decisions",
  "Reduce recruitment costs",
  "Focus on business growth",
];

const employeeBenefits = [
  "Discover relevant job opportunities",
  "Get career guidance",
  "Build professional networks",
  "Access premium employers",
  "Accelerate career growth",
];

export default function EmployerBenefits() {
  const [active, setActive] = useState("employers");

  const items =
    active === "employers" ? employerBenefits : employeeBenefits;

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
                  Job Applicants
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
                  Match Accuracy
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
                    Recruitment Efficiency
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
            Find the Right Talent Faster
          </h2>

          <div className="mt-8 flex rounded-2xl bg-slate-100 p-2">
            <button
              onClick={() => setActive("employers")}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all ${active === "employers"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600"
                }`}
            >
              For Employers
            </button>

            <button
              onClick={() => setActive("employees")}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all ${active === "employees"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600"
                }`}
            >
              For Employees
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
                duration: .4,
              }}
              className="mt-8 space-y-4"
            >
              {items.map((item, index) => (

                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    x: -25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="flex gap-3"
                >

                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <CheckCircle2 className="mt-1 text-emerald-500" />
                  </motion.div>

                  <span className="text-slate-600">
                    {item}
                  </span>

                </motion.div>

              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}