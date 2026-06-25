"use client";

import styles from "./Navbar.module.css";

import { Menu, Bell, Search } from "lucide-react";

import { useAdmin } from "@/app/context/AdminContext";

import ProfileDropdown from "./ProfileDropdown";

export default function AdminNavbar() {

    const {

        toggleMobileSidebar,

    } = useAdmin();

    return (

        <header className={styles.navbar}>

            <div className={styles.left}>

                <button

                    className={styles.menuBtn}

                    onClick={toggleMobileSidebar}

                >

                    <Menu size={22} />

                </button>

                <div>

                    <h2>

                        Dashboard

                    </h2>

                    <span>

                        Welcome back 👋

                    </span>

                </div>

            </div>

            <div className={styles.center}>

                <div className={styles.search}>

                    <Search size={18} />

                    <input

                        placeholder="Search..."

                    />

                </div>

            </div>

            <div className={styles.right}>

                <button className={styles.iconBtn}>

                    <Bell size={20} />

                </button>

                <ProfileDropdown />

            </div>

        </header>

    );

}