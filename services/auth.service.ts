import api from "@/lib/axios";

export const adminExists = () =>
    api.get("/api/auth/admin-exists");

export const signup = (data: any) =>
    api.post("/api/auth/signup", data);

export const verifyOTP = (data: any) =>
    api.post("/api/auth/verify-otp", data);

export const login = (data: any) =>
    api.post("/api/auth/login", data);

export const logout = () =>
    api.post("/api/auth/logout");

export const me = () =>
    api.get("/api/auth/me");

export const forgotPassword = (data: any) =>
    api.post("/api/auth/forgot-password", data);

export const resetPassword = (
    token: string,
    data: any
) =>
    api.post(`/api/auth/reset-password/${token}`, data);

export const changePassword = (data: any) =>
    api.put("/api/auth/change-password", data);

export const resendOTP = (data: any) =>
    api.post("/api/auth/resend-otp", data);