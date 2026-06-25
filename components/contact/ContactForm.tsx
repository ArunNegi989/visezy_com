"use client";

import { Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Tell Us About Your Hiring Needs
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-lg leading-relaxed">
              Whether you're hiring one person or scaling an entire team, our enterprise-grade talent solutions are here to help.
            </p>
            <div className="mt-10 flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
              Read our success stories <ArrowRight size={20} />
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <InputField placeholder="Full Name" />
              <InputField placeholder="Email Address" type="email" />
              <InputField placeholder="Phone Number" type="tel" />
              <InputField placeholder="Company Name" />
            </div>

            <textarea
              rows={4}
              placeholder="Tell us about your hiring requirements..."
              className="mt-5 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-blue-600"
            >
              Send Message
              <Send size={18} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InputField({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all duration-300"
    />
  );
}