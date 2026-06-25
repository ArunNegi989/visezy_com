"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
{
title: "Submit Resume",
description:
"Upload your resume and share your profile details with our recruitment team.",
},
{
title: "Profile Review",
description:
"Our experts evaluate your skills, experience and career goals.",
},
{
title: "Interview Process",
description:
"Connect with top companies through streamlined interview rounds.",
},
{
title: "Get Hired",
description:
"Receive offers and start your next career opportunity with confidence.",
},
];

export default function HiringProcess() {
return ( <section className="relative overflow-hidden py-28">
{/* Background Effects */} <div className="absolute inset-0 -z-20"> <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" /> <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-100/70 blur-3xl" /> <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" /> </div>


  <div className="container">
    <SectionHeading
      badge="Hiring Journey"
      title="Your Path To Success"
      description="A streamlined recruitment process designed to connect talented professionals with leading companies."
    />

    <div className="relative mt-20">
      {/* Desktop Main Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        className="absolute left-0 top-1/2 hidden h-[4px] w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 md:block"
        style={{
          transformOrigin: "left center",
        }}
      />

      <div className="grid gap-10 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            className={`group relative ${
              index % 2 === 0
                ? "md:-translate-y-12"
                : "md:translate-y-12"
            }`}
          >
            {/* Connector Dot */}
            <div className="absolute left-1/2 top-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg md:block" />

            <motion.div
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="
                relative
                z-20
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200/80
                bg-white/95
                p-8
                text-center
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(15,23,42,0.08)]
                transition-all
                duration-500
                hover:border-blue-200
                hover:shadow-[0_30px_80px_rgba(37,99,235,0.18)]
              "
            >
              {/* Top Gradient Bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-violet-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Number Circle */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                }}
                className="
                  relative
                  mx-auto
                  mb-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-blue-600
                  via-indigo-600
                  to-violet-600
                  text-2xl
                  font-bold
                  text-white
                  shadow-[0_15px_35px_rgba(37,99,235,0.35)]
                "
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(37,99,235,0.4)",
                      "0 0 0 12px rgba(37,99,235,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full"
                />

                {index + 1}
              </motion.div>

              <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {step.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>


);
}
