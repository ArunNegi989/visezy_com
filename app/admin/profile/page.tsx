"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Shield,
  Clock3,
  KeyRound,
  LogOut,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  logout,
  me,
} from "@/services/auth.service";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export default function AdminProfilePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const [user, setUser] =
    useState<UserData | null>(null);

  useEffect(() => {

    const getProfile = async () => {

      try {

        const { data } = await me();

        setUser(data.user);

      } catch {

        router.replace("/admin/login");

      } finally {

        setLoading(false);

      }

    };

    getProfile();

  }, [router]);

  const handleLogout = async () => {

    try {

      setLogoutLoading(true);

      const { data } = await logout();

      toast.success(data.message);

      router.replace("/admin/login");

      router.refresh();

    } catch {

      toast.error("Unable to logout.");

    } finally {

      setLogoutLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account information and security.
        </p>

      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-10 text-white">

          <div className="flex items-center gap-6">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold">

              {user?.name?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {user?.name}
              </h2>

              <p className="mt-2 text-blue-100">
                {user?.email}
              </p>

            </div>

          </div>

        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-2">
                    {/* Name */}

        <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <User
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Full Name
              </p>

              <h3 className="text-lg font-semibold text-slate-900">
                {user?.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Email */}

        <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <Mail
                size={22}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email Address
              </p>

              <h3 className="break-all text-lg font-semibold text-slate-900">
                {user?.email}
              </h3>
            </div>
          </div>
        </div>

        {/* Role */}

        <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3">
              <Shield
                size={22}
                className="text-violet-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Account Role
              </p>

              <h3 className="text-lg font-semibold capitalize text-slate-900">
                {user?.role}
              </h3>
            </div>
          </div>
        </div>

        {/* Last Login */}

        <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-100 p-3">
              <Clock3
                size={22}
                className="text-amber-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Last Login
              </p>

              <h3 className="text-lg font-semibold text-slate-900">
                {user?.lastLogin
                  ? new Date(
                      user.lastLogin
                    ).toLocaleString()
                  : "Recently"}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Change Password */}

        <Link
          href="/admin/profile/change-password"
          className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">

            <div>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <KeyRound
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Change Password
              </h3>

              <p className="mt-2 text-slate-500">
                Update your password to keep
                your account secure.
              </p>

            </div>

            <ArrowRight
              className="transition group-hover:translate-x-1"
              size={24}
            />

          </div>
        </Link>

        {/* Logout */}

        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="group rounded-3xl border border-red-200 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="flex items-center justify-between">

            <div>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                <LogOut
                  size={28}
                  className="text-red-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Logout
              </h3>

              <p className="mt-2 text-slate-500">
                End your current admin session
                securely.
              </p>

            </div>

            {logoutLoading ? (
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
            ) : (
              <ArrowRight
                className="transition group-hover:translate-x-1"
                size={24}
              />
            )}

          </div>
        </button>

      </div>

    </div>
    </div>
  );
}
       