"use client";

import { useState } from "react";
import {
  Send,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createContact } from "@/services/contact.service";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] =
    useState<FormData>({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await createContact(formData);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Tell Us About Your Project
            </h2>

            <p className="mt-6 max-w-lg text-xl leading-relaxed text-slate-600">
              Have an idea for a website, mobile app, e-commerce platform,
              or custom software solution? Tell us what you're building and
              let's explore how we can bring it to life.
            </p>

            <div className="mt-10 flex cursor-pointer items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700">
              Explore our solutions
              <ArrowRight size={20} />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative rounded-[32px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project, requirements, goals, or idea..."
              className="mt-5 w-full resize-none rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50"
            />

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={loading}
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:opacity-90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Sending...
                </>
              ) : (
                <>
                  Discuss Your Project
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function InputField(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50"
    />
  );
}