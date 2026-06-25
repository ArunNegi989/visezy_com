"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface AdminContextType {
    collapsed: boolean;
    mobileOpen: boolean;

    toggleSidebar: () => void;

    toggleMobileSidebar: () => void;

    closeMobileSidebar: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function AdminProvider({ children }: Props) {

    const [collapsed, setCollapsed] = useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {

        const saved = localStorage.getItem("admin-sidebar");

        if (saved) {
            setCollapsed(saved === "true");
        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "admin-sidebar",
            collapsed.toString()
        );

    }, [collapsed]);

    useEffect(() => {

        const handler = (e: KeyboardEvent) => {

            if (e.key === "Escape") {

                setMobileOpen(false);

            }

        };

        window.addEventListener("keydown", handler);

        return () =>
            window.removeEventListener(
                "keydown",
                handler
            );

    }, []);

    useEffect(() => {

        if (mobileOpen) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

        return () => {

            document.body.style.overflow = "";

        };

    }, [mobileOpen]);

    const toggleSidebar = () => {

        setCollapsed((prev) => !prev);

    };

    const toggleMobileSidebar = () => {

        setMobileOpen((prev) => !prev);

    };

    const closeMobileSidebar = () => {

        setMobileOpen(false);

    };

    return (
        <AdminContext.Provider
            value={{
                collapsed,
                mobileOpen,

                toggleSidebar,

                toggleMobileSidebar,

                closeMobileSidebar,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {

    const context = useContext(AdminContext);

    if (!context) {

        throw new Error(
            "useAdmin must be used inside AdminProvider"
        );

    }

    return context;

}