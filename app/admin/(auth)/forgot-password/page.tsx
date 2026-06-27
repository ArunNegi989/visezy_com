"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  forgotPassword,
  me,
} from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [checking, setChecking] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  useEffect(() => {

    const check = async () => {

      try {

        await me();

        router.replace("/admin");

      } catch {

        setChecking(false);

        setTimeout(() => {
          inputRef.current?.focus();
        }, 200);

      }

    };

    check();

  }, [router]);

  const validate = () => {

    if (!email.trim()) {

      toast.error("Email is required.");

      return false;

    }

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {

      toast.error(
        "Please enter a valid email."
      );

      return false;

    }

    return true;

  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const { data } =
        await forgotPassword({
          email: email.trim(),
        });

      toast.success(
        data.message ||
          "Password reset email sent."
      );

      router.push("/admin/login")
    } catch (error: any) {

      toast.error(

        error?.response?.data?.message ||

          "Unable to send reset email."

      );

    } finally {

      setLoading(false);

    }

  };

  if (checking) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      </div>
    );

  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

        <div className="mb-8 flex justify-center">

          <Image
            src="/logo.jpeg"
            alt="Visezy"
            width={80}
            height={80}
            className="rounded-xl bg-white p-2 shadow"
            priority
          />

        </div>

        <h1 className="text-center text-3xl font-bold text-slate-900">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Enter your registered email address.
          We'll send you a secure password reset
          link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                ref={inputRef}
                type="email"
                placeholder="admin@visezy.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                spellCheck={false}
                autoComplete="email"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Info */}

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              We'll send a password reset link to your
              registered email address. The link will
              expire automatically for security.
            </p>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Back */}

          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-700">
              Visezy
            </span>
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Secure Password Recovery
          </p>
        </div>
      </div>
    </div>
  );
}