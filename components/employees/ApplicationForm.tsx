"use client";

import { Upload, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplicationForm() {
  return (
    <section id="application-form" className="bg-slate-50 py-24 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-[32px] bg-white p-8 md:p-12 shadow-2xl shadow-blue-100/50"
        >
          <h2 className="mb-2 text-center text-4xl font-extrabold text-slate-900">
            Join Our Team
          </h2>
          <p className="mb-10 text-center text-slate-500">
            Take the next step in your career with us.
          </p>

          <form className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
            </div>

            <Input placeholder="Current Position" />

            <div className="group relative mt-5 rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition-colors hover:border-blue-500 hover:bg-blue-50/50">
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="text-center">
                <Upload size={40} className="mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-700">Click to upload or drag and drop</p>
                <p className="mt-1 text-sm text-slate-400">PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </div>

            <textarea
              rows={4}
              placeholder="Tell us about your experience..."
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
            >
              Submit Application
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 px-5 py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
    />
  );
}