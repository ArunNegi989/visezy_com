"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  User,
  KeyRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import styles from "./Navbar.module.css";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

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
          className={`${styles.chevron} ${
            open ? styles.rotate : ""
          }`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <Link
            href="/admin/profile"
            className={styles.dropdownItem}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>

          <Link
            href="/admin/change-password"
            className={styles.dropdownItem}
          >
            <KeyRound size={18} />
            <span>Change Password</span>
          </Link>

          <button
            className={`${styles.dropdownItem} ${styles.logoutItem}`}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}