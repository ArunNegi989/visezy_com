"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Images,
  Mail,
  Settings,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAdmin } from "@/app/context/AdminContext";
import styles from "./Sidebar.module.css";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Hero Slider",
    href: "/admin/sliders",
    icon: Images,
  },
  {
    title: "Contact Leads",
    href: "/admin/contacts",
    icon: Mail,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const {
    collapsed,
    mobileOpen,
    toggleSidebar,
    closeMobileSidebar,
  } = useAdmin();

  return (
    <aside
      className={`
        ${styles.sidebar}
        ${collapsed ? styles.collapsed : ""}
        ${mobileOpen ? styles.mobileOpen : ""}
      `}
    >
      {/* Header */}

      <div className={styles.header}>
        <Link
          href="/admin"
          className={styles.logo}
          onClick={closeMobileSidebar}
        >
          <Image
            src="/logo.jpeg"
            alt="Visezy"
            width={42}
            height={42}
            priority
          />

          {!collapsed && (
            <div>
              <h2>Visezy</h2>
              <span>Admin Panel</span>
            </div>
          )}
        </Link>

        <button
          className={styles.collapseBtn}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Menu */}

      <nav className={styles.menu}>
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileSidebar}
              className={`${styles.item} ${
                active ? styles.active : ""
              }`}
            >
              <Icon size={20} />

              {!collapsed && (
                <span>{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className={styles.footer}>
        <Link
          href="/"
          target="_blank"
          className={styles.item}
        >
          <Globe size={20} />

          {!collapsed && (
            <span>Visit Website</span>
          )}
        </Link>

        <button className={styles.logout}>
          <LogOut size={20} />

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}