"use client";

import { useAdmin } from "@/app/context/AdminContext";
import styles from "./Sidebar.module.css";

export default function SidebarOverlay() {
  const { mobileOpen, closeMobileSidebar } = useAdmin();

  if (!mobileOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={closeMobileSidebar}
      aria-hidden="true"
    />
  );
}