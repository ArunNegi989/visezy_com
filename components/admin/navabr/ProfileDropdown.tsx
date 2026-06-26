"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import {
  User,
  KeyRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import styles from "./Navbar.module.css";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);
  useEffect(() => {

    document.body.style.overflow =
      showLogoutModal
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };

  }, [showLogoutModal]);
  const handleLogout = async () => {

    try {

      setLoading(true);

      const { data } = await logout();

      toast.success(data.message);

      router.replace("/admin/login");

      router.refresh();

    } catch {

      toast.error("Logout failed.");

    } finally {

      setLoading(false);

      setShowLogoutModal(false);

      setOpen(false);

    }

  };
  return (
    <div
      className={styles.profileWrapper}
      ref={dropdownRef}
    >
      <button
        className={styles.profileBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/logo.jpeg"
          alt="Admin"
          width={40}
          height={40}
          className={styles.avatar}
        />

        <div className={styles.profileInfo}>
          <h4>Admin</h4>
          <span>Super Admin</span>
        </div>

        <ChevronDown
          size={18}
          className={`${styles.chevron} ${open ? styles.rotate : ""
            }`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <Link
            href="/admin/profile"
            className={styles.dropdownItem}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>

          <Link
            href="/admin/profile/change-password"
            className={styles.dropdownItem}
            onClick={() => setOpen(false)}
          >
            <KeyRound size={18} />
            <span>Change Password</span>
          </Link>
          <button
            className={`${styles.dropdownItem} ${styles.logoutItem}`}
            onClick={() => {
              setOpen(false);
              setShowLogoutModal(true);
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
{
  typeof window !== "undefined" &&
  showLogoutModal &&
  createPortal(
    <>
      <div
        className={styles.modalOverlay}
        onClick={() => setShowLogoutModal(false)}
      />

      <div className={styles.logoutModal}>

        <div className={styles.modalIcon}>
          <LogOut size={30} />
        </div>

        <h3>Logout?</h3>

        <p>
          Are you sure you want to logout
          from the admin dashboard?
        </p>

        <div className={styles.modalActions}>

          <button
            className={styles.cancelBtn}
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>

          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading
              ? "Logging out..."
              : "Logout"}
          </button>

        </div>

      </div>
    </>,
    document.body
  )
}
    </div>

  );
}
