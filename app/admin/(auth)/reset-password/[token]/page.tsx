"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  me,
  resetPassword,
} from "@/services/auth.service";

export default function ResetPasswordPage() {
  const router = useRouter();

  const params = useParams();

  const token = params.token as string;

  const [checking, setChecking] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {

    const check = async () => {

      try {

        await me();

        router.replace("/admin");

      } catch {

        setChecking(false);

      }

    };

    check();

  }, [router]);

  const passwordStrength =
    useMemo(() => {

      let score = 0;

      if (form.password.length >= 8)
        score++;

      if (/[A-Z]/.test(form.password))
        score++;

      if (/[0-9]/.test(form.password))
        score++;

      if (
        /[!@#$%^&*(),.?":{}|<>]/.test(
          form.password
        )
      )
        score++;

      return score;

    }, [form.password]);

  const validate = () => {

    if (!form.password.trim()) {

      toast.error(
        "Password is required."
      );

      return false;

    }

    if (form.password.length < 8) {

      toast.error(
        "Password must be at least 8 characters."
      );

      return false;

    }

    if (!form.confirmPassword.trim()) {

      toast.error(
        "Confirm your password."
      );

      return false;

    }

    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match."
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
        await resetPassword(
          token,
          {
            password:
              form.password.trim(),
          }
        );

      toast.success(
        data.message ||
          "Password updated successfully."
      );

      setTimeout(() => {

        router.replace(
          "/admin/login"
        );

      }, 1200);

    } catch (error: any) {

      toast.error(

        error?.response?.data
          ?.message ||

          "Unable to reset password."

      );

    } finally {

      setLoading(false);

    }

  };

  if (checking) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      </div>
    );

  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />

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
          Reset Password
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Create a strong password for
          your admin account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >          {/* New Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword:
                      e.target.value,
                  }))
                }
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Password Strength */}

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">
                Password Strength
              </span>

              <span className="font-semibold text-blue-600">
                {passwordStrength}/4
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-2 rounded-full transition-all ${
                    passwordStrength >= item
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className={
                    form.password.length >= 8
                      ? "text-green-500"
                      : "text-slate-300"
                  }
                />
                Minimum 8 characters
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className={
                    /[A-Z]/.test(form.password)
                      ? "text-green-500"
                      : "text-slate-300"
                  }
                />
                One uppercase letter
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className={
                    /[0-9]/.test(form.password)
                      ? "text-green-500"
                      : "text-slate-300"
                  }
                />
                One number
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className={
                    /[!@#$%^&*(),.?":{}|<>]/.test(
                      form.password
                    )
                      ? "text-green-500"
                      : "text-slate-300"
                  }
                />
                One special character
              </li>
            </ul>
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
                Updating...
              </>
            ) : (
              <>
                Update Password
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </form>

        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-center text-sm leading-6 text-slate-600">
            After resetting your password, you'll be redirected
            to the login page where you can sign in with your new
            credentials.
          </p>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-700">
              Visezy
            </span>
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Secure Password Reset
          </p>
        </div>

      </div>
    </div>
  );
}