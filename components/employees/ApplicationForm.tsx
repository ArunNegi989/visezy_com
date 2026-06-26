"use client";

import { useState } from "react";
import {
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createCareer } from "@/services/career.service";

interface CareerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  experience: string;
}

export default function ApplicationForm() {
  const [formData, setFormData] =
    useState<CareerFormData>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentPosition: "",
      experience: "",
    });

  const [resume, setResume] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [uploaded, setUploaded] =
    useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResume = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      toast.error(
        "Only PDF, DOC and DOCX files are allowed."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5MB.");
      return;
    }

    setResume(file);
    setUploaded(true);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.currentPosition ||
      !formData.experience
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append(
        "firstName",
        formData.firstName
      );

      payload.append(
        "lastName",
        formData.lastName
      );

      payload.append(
        "email",
        formData.email
      );

      payload.append(
        "phone",
        formData.phone
      );

      payload.append(
        "currentPosition",
        formData.currentPosition
      );

      payload.append(
        "experience",
        formData.experience
      );

      payload.append(
        "resume",
        resume
      );

      const data =
        await createCareer(payload);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentPosition: "",
        experience: "",
      });

      setResume(null);

      setUploaded(false);
    } catch (err: any) {
      toast.error(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
  <section
    id="application-form"
    className="bg-slate-50 py-24 px-4"
  >
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

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <Input
            name="currentPosition"
            placeholder="Current Position"
            value={formData.currentPosition}
            onChange={handleChange}
          />

          {/* Resume Upload */}

          <div className="group relative rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition-all hover:border-blue-500 hover:bg-blue-50">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResume}
              className="absolute inset-0 cursor-pointer opacity-0"
            />

            <div className="text-center">
              {uploaded ? (
                <>
                  <CheckCircle2
                    size={44}
                    className="mx-auto mb-4 text-green-500"
                  />

                  <p className="font-semibold text-green-600">
                    Resume Selected
                  </p>

                  <p className="mt-2 text-sm text-slate-500 break-all">
                    {resume?.name}
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    size={40}
                    className="mx-auto mb-4 text-blue-500 transition-transform group-hover:scale-110"
                  />

                  <p className="font-semibold text-slate-700">
                    Click to upload or drag and drop
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </>
              )}
            </div>
          </div>

          <textarea
            rows={5}
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  </section>
);
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  );
}