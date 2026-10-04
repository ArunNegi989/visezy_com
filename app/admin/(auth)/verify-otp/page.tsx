"use client";

import { Suspense } from "react";

import {
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
} from "lucide-react";

import { toast } from "react-toastify";

import {
    resendOTP,
    verifyOTP,
} from "@/services/auth.service";

function VerifyOTPContent() {
    
    const router = useRouter();

    const searchParams =
        useSearchParams();

    const email =
        searchParams.get("email") || "";

    const [loading, setLoading] =
        useState(false);

    const [timer, setTimer] =
        useState(600);

    const [otp, setOtp] =
        useState([
            "",
            "",
            "",
            "",
            "",
            "",
        ]);

    const inputsRef =
        useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {

        if (!email) {

            router.replace(
                "/admin/signup"
            );

        }

    }, [email, router]);

    useEffect(() => {

        if (timer <= 0) return;

        const interval =
            setInterval(() => {

                setTimer(
                    (prev) => prev - 1
                );

            }, 1000);

        return () =>
            clearInterval(interval);

    }, [timer]);

    const handleChange = (
        index: number,
        value: string
    ) => {

        if (!/^\d*$/.test(value))
            return;

        const updated = [...otp];

        updated[index] =
            value.slice(-1);

        setOtp(updated);

        if (
            value &&
            index < 5
        ) {

            inputsRef.current[
                index + 1
            ]?.focus();

        }

    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {

            inputsRef.current[
                index - 1
            ]?.focus();

        }

    };

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {

        e.preventDefault();

        const pasted =
            e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 6);

        if (
            pasted.length !== 6
        )
            return;

        const arr =
            pasted.split("");

        setOtp(arr);

        arr.forEach((item, i) => {

            if (
                inputsRef.current[i]
            ) {

                inputsRef.current[
                    i
                ]!.value = item;

            }

        });

        inputsRef.current[5]?.focus();

    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        const code =
            otp.join("");

        if (
            code.length !== 6
        ) {

            toast.error(
                "Please enter the 6-digit OTP."
            );

            return;

        }

        try {

            setLoading(true);

            const { data } =
                await verifyOTP({

                    email,

                    otp: code,

                });

            toast.success(
                data.message
            );

            router.replace(
                "/admin/login"
            );

        } catch (error: any) {

            toast.error(

                error?.response?.data
                    ?.message ||

                "Invalid OTP."

            );

        } finally {

            setLoading(false);

        }

    };

    const minutes =
        String(
            Math.floor(timer / 60)
        ).padStart(2, "0");

    const seconds =
        String(
            timer % 60
        ).padStart(2, "0");

    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">

            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />

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

                <div className="mb-6 flex justify-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

                        <ShieldCheck
                            size={34}
                            className="text-blue-600"
                        />

                    </div>

                </div>

                <h1 className="text-center text-3xl font-bold text-slate-900">
                    Verify Email
                </h1>

                <p className="mt-3 text-center text-slate-500">

                    Enter the 6-digit verification code sent to

                    <br />

                    <span className="font-semibold text-slate-700">

                        {email}

                    </span>

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >          {/* OTP Inputs */}

                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(index, e)
                                }
                                onPaste={handlePaste}
                                disabled={loading}
                                className="h-14 w-14 rounded-xl border border-slate-300 text-center text-2xl font-bold outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />
                        ))}
                    </div>

                    {/* Timer */}

                    <div className="text-center">
                        {timer > 0 ? (
                            <p className="text-sm text-slate-500">
                                OTP expires in{" "}
                                <span className="font-semibold text-blue-600">
                                    {minutes}:{seconds}
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm font-medium text-red-600">
                                OTP has expired.
                            </p>
                        )}
                    </div>

                    {/* Verify Button */}

                    <button
                        type="submit"
                        disabled={loading || timer <= 0}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                Verify OTP
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    {/* Back */}

                    <Link
                        href="/admin/signup"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Signup
                    </Link>

                </form>

                {/* Resend */}

                <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                    <p className="text-sm text-amber-800">
                        Didn't receive the OTP?
                    </p>

                    <button
                        type="button"
                        disabled={timer > 0}
                        onClick={async () => {

                            try {

                                const { data } =
                                    await resendOTP({
                                        email,
                                    });

                                toast.success(data.message);

                                setTimer(600);

                            } catch (error: any) {

                                toast.error(
                                    error?.response?.data?.message ||
                                    "Unable to resend OTP."
                                );

                            }

                        }}
                        className="mt-3 font-semibold text-blue-600 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                        Resend OTP
                    </button>
                </div>

                {/* Footer */}

                <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-slate-700">
                            Visezy
                        </span>
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                        Secure Email Verification
                    </p>
                </div>

            </div>
        </div>
    );
}
export default function VerifyOTPPage() {

    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading...
                </div>
            }
        >
            <VerifyOTPContent />
        </Suspense>
    );
}