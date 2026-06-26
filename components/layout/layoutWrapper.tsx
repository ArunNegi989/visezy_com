"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

interface Props {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: Props) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  if (hideLayout) {
    return children;
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}