"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Images,
  Mail,
  BriefcaseBusiness,
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
    title: "Career Applications",
    href: "/admin/careers",
    icon: BriefcaseBusiness,
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
        <div className={styles.menuTop}>
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`${styles.item} ${active ? styles.active : ""}`}
              >
                <Icon size={20} />

                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}