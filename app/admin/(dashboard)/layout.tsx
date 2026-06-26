
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { me } from "@/services/auth.service";
import { AdminProvider } from "../../context/AdminContext";

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import AdminNavbar from "@/components/admin/navabr/AdminNavbar";
import SidebarOverlay from "@/components/admin/sidebar/SidebarOverlay";

import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);
 useEffect(() => {
  const check = async () => {
    try {
      await me();
      setLoading(false);
    } catch {
      router.replace("/admin/login");
    }
  };

  check();
}, [router]);
  if (loading) {

    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Loading...
      </div>
    );

  }
  return (
    <AdminProvider>
      <div className={styles.wrapper}>
        <AdminSidebar />

        <SidebarOverlay />

        <div className={styles.main}>
          <AdminNavbar />

          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}