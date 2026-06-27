"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  me,
  signup,
} from "@/services/auth.service";

export default function SignupPage() {

  const router = useRouter();

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

  const [form, setForm] =
    useState({

      name: "",

      email: "",

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

  const strength =
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

    if (!form.name.trim()) {

      toast.error("Name is required.");

      return false;

    }

    if (!form.email.trim()) {

      toast.error("Email is required.");

      return false;

    }

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(form.email)) {

      toast.error(
        "Please enter a valid email."
      );

      return false;

    }

    if (!form.password.trim()) {

      toast.error(
        "Password is required."
      );

      return false;

    }

    if (
      form.password.length < 8
    ) {

      toast.error(
        "Password must be at least 8 characters."
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
        await signup({

          name:
            form.name.trim(),

          email:
            form.email.trim(),

          password:
            form.password.trim(),

        });

      toast.success(data.message);

      router.push(

        `/admin/verify-otp?email=${encodeURIComponent(
          form.email
        )}`

      );

    } catch (error: any) {

      toast.error(

        error?.response?.data
          ?.message ||

          "Signup failed."

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

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl">

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
          Create Admin Account
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Create the first Visezy administrator account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                disabled={loading}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Email */}

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
                type="email"
                placeholder="admin@visezy.com"
                value={form.email}
                disabled={loading}
                autoComplete="email"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
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
                placeholder="Create password"
                value={form.password}
                disabled={loading}
                autoComplete="new-password"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
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
                placeholder="Confirm password"
                value={form.confirmPassword}
                disabled={loading}
                autoComplete="new-password"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword:
                      e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
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
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Password Strength
              </span>

              <span className="font-semibold text-blue-600">
                {strength}/4
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-2 rounded-full transition ${
                    strength >= item
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
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
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Login */}

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Already verified?
            </p>

            <Link
              href="/admin/login"
              className="mt-2 inline-flex font-semibold text-blue-600 hover:text-blue-700"
            >
              Login to Admin Panel
            </Link>
          </div>

        </form>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-800">
            <strong>Note:</strong> Only the first admin account
            can be created. After verification, admin signup
            will be permanently disabled.
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
            Secure Admin Registration
          </p>
        </div>

      </div>
    </div>
  );
}