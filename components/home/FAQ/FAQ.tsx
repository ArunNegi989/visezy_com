"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What types of candidates do you recruit?",
    a: "We recruit talent across multiple industries and job functions.",
  },
  {
    q: "How does your recruitment process work?",
    a: "We leverage AI-powered screening and matching for faster hiring.",
  },
  {
    q: "What are your fees?",
    a: "Pricing depends on the engagement model and role requirements.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold">
            Find Interview-ready Candidates in 24 Hours
          </h2>

          <div className="mt-10 flex gap-10">
            <div>
              <h3 className="text-5xl font-bold text-blue-600">
                220+
              </h3>

              <p className="text-slate-500">
                Trusted Companies
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-600">
                750+
              </h3>

              <p className="text-slate-500">
                Successful Hires
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-lg font-semibold">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <p className="mt-4 text-slate-600">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}