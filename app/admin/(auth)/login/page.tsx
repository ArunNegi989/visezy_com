"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

import {
    adminExists,
    login,
    me,
} from "@/services/auth.service";

export default function AdminLoginPage() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);

    const [capsLock, setCapsLock] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [showPassword, setShowPassword] =
        useState(false);
    const [showSignup, setShowSignup] =
        useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {

        const init = async () => {

            try {

                await me();

                router.replace("/admin");

                return;

            } catch { }

            try {

                const { data } =
                    await adminExists();

                setShowSignup(!data.exists);

            } catch {

                setShowSignup(false);

            }

            setCheckingAuth(false);

        };

        init();

    }, [router]);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        if (!form.email.trim()) {
            toast.error("Email is required.");
            return false;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email.");
            return false;
        }

        if (!form.password.trim()) {
            toast.error("Password is required.");
            return false;
        }

        if (form.password.length < 6) {
            toast.error(
                "Password must be at least 6 characters."
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

            const { data } = await login({
                email: form.email,
                password: form.password,
            });

            toast.success(
                data.message || "Login successful."
            );

            setTimeout(() => {

                router.replace("/admin");

                router.refresh();

            }, 500);
        } catch (error: any) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                error?.message ||

                "Unable to login."

            );

        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                    <p className="text-sm text-slate-600">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

                    {/* LEFT SIDE */}

                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-14 text-white lg:flex lg:flex-col lg:justify-between">

                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

                        <div className="relative z-10">

                            <Image
                                src="/logo.jpeg"
                                alt="Visezy"
                                width={170}
                                height={60}
                                className="rounded-xl bg-white p-2"
                                priority
                            />

                            <div className="mt-20">

                                <h1 className="text-5xl font-bold leading-tight">
                                    Welcome Back
                                </h1>

                                <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                                    Login to your Visezy Admin Dashboard
                                    and manage blogs, sliders,
                                    contacts, careers and website
                                    content from one place.
                                </p>

                            </div>

                        </div>

                        <div className="relative z-10 space-y-4">

                            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">

                                <h3 className="font-semibold">
                                    Secure Access
                                </h3>

                                <p className="mt-2 text-sm text-blue-100">
                                    Your session is protected using
                                    secure HTTP-only authentication
                                    cookies.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="flex items-center justify-center p-8 sm:p-12 lg:p-4">

                        <div className="w-full max-w-md">

                            {/* Divider */}

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>

                                <div className="relative flex justify-center">
                                    <span className="bg-white px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                                        Secure Login
                                    </span>
                                </div>
                            </div>
                            <div className="mb-10">

                                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                                    Admin Panel
                                </span>

                                <h2 className="mt-5 text-4xl font-bold text-slate-900">
                                    Sign In
                                </h2>

                                <p className="mt-3 text-slate-500">
                                    Enter your credentials to
                                    continue.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
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
                                            ref={emailRef}
                                            disabled={loading}
                                            type="email"
                                            name="email"
                                            placeholder="abc@gmail.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                                            onKeyUp={(e) =>
                                                setCapsLock(
                                                    e.getModifierState("CapsLock")
                                                )
                                            }
                                            disabled={loading}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="••••••••"
                                            value={form.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
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
                                    {
                                        capsLock && (
                                            <p className="mt-2 text-sm font-medium text-amber-600">
                                                Caps Lock is ON.
                                            </p>
                                        )
                                    }
                                </div>

                                {/* Forgot Password */}

                                <div className="flex items-center justify-end">
                                    <Link
                                        href="/admin/forgot-password"
                                        className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-70"  >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="h-5 w-5 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    opacity=".25"
                                                />

                                                <path
                                                    d="M22 12a10 10 0 0 1-10 10"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                            </svg>

                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                                {
                                    showSignup && (

                                        <div className="text-center">

                                            <p className="text-sm text-slate-500">
                                                First time setup?
                                            </p>
                                            <Link
                                                href="/admin/signup"
                                                className="mt-2  font-semibold text-blue-600 transition hover:text-blue-700"
                                            >
                                                Create Admin Account
                                            </Link>

                                        </div>

                                    )
                                }
                                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />

                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-800">
                                                Protected Session
                                            </h4>

                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                Your login session is protected using secure
                                                HTTP-only cookies. Never share your admin
                                                credentials with anyone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 border-t border-slate-200 pt-3 text-center">
                                    <p className="text-sm text-slate-500">
                                        © {new Date().getFullYear()}{" "}
                                        <span className="font-semibold text-slate-700">
                                            Visezy
                                        </span>

                                        {" • "}Admin Dashboard
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Version 1.0 • Secure Authentication
                                    </p>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
