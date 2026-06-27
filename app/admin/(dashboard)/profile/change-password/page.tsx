"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { toast } from "react-toastify";

import { changePassword } from "@/services/auth.service";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const strength = useMemo(() => {
    let score = 0;

    if (form.newPassword.length >= 8)
      score++;

    if (/[A-Z]/.test(form.newPassword))
      score++;

    if (/[0-9]/.test(form.newPassword))
      score++;

    if (
      /[!@#$%^&*(),.?":{}|<>]/.test(
        form.newPassword
      )
    )
      score++;

    return score;
  }, [form.newPassword]);

  const validate = () => {

    if (!form.oldPassword.trim()) {

      toast.error(
        "Current password is required."
      );

      return false;

    }

    if (!form.newPassword.trim()) {

      toast.error(
        "New password is required."
      );

      return false;

    }

    if (
      form.newPassword.length < 8
    ) {

      toast.error(
        "Password must be at least 8 characters."
      );

      return false;

    }

    if (
      form.oldPassword ===
      form.newPassword
    ) {

      toast.error(
        "New password cannot be the same as current password."
      );

      return false;

    }

    if (
      !form.confirmPassword.trim()
    ) {

      toast.error(
        "Please confirm your password."
      );

      return false;

    }

    if (
      form.newPassword !==
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
        await changePassword({
          oldPassword:
            form.oldPassword.trim(),

          newPassword:
            form.newPassword.trim(),
        });

      toast.success(
        data.message ||
          "Password changed successfully."
      );

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.back();
      }, 1000);

    } catch (error: any) {

      toast.error(

        error?.response?.data
          ?.message ||

          "Unable to change password."

      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="mx-auto w-full max-w-3xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Change Password
          </h1>

          <p className="mt-2 text-slate-500">
            Update your admin account password.
          </p>

        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
      >        {/* Current Password */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Current Password
          </label>

          <div className="relative">
            <Lock
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showCurrent ? "text" : "password"}
              value={form.oldPassword}
              disabled={loading}
              autoComplete="current-password"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter current password"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
            >
              {showCurrent ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}

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
              type={showNew ? "text" : "password"}
              value={form.newPassword}
              disabled={loading}
              autoComplete="new-password"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter new password"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
            >
              {showNew ? (
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
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              disabled={loading}
              autoComplete="new-password"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-800 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              placeholder="Confirm new password"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
            >
              {showConfirm ? (
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

            <span className="text-sm font-semibold text-blue-600">
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

          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className={
                  form.newPassword.length >= 8
                    ? "text-green-500"
                    : "text-slate-300"
                }
              />
              Minimum 8 characters
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className={
                  /[A-Z]/.test(form.newPassword)
                    ? "text-green-500"
                    : "text-slate-300"
                }
              />
              One uppercase letter
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className={
                  /[0-9]/.test(form.newPassword)
                    ? "text-green-500"
                    : "text-slate-300"
                }
              />
              One number
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className={
                  /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword)
                    ? "text-green-500"
                    : "text-slate-300"
                }
              />
              One special character
            </div>
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
              Updating Password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Security Note */}

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-slate-800">
            Security Tips
          </h4>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Never reuse old passwords.</li>
            <li>• Use at least 8–12 characters.</li>
            <li>• Include uppercase, numbers and symbols.</li>
            <li>• Keep your password private.</li>
          </ul>
        </div>

      </form>
    </div>
  );
}