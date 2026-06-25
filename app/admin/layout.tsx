import type { Metadata } from "next";

import { AdminProvider } from "../context/AdminContext";

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import AdminNavbar from "@/components/admin/navabr/AdminNavbar";
import SidebarOverlay from "@/components/admin/sidebar/SidebarOverlay";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Visezy Admin",
  description: "Visezy CMS Dashboard",
};

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
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