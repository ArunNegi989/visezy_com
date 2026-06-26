"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog Posts", href: "/blogs" },
  { label: "For Employees", href: "/employees" },
  { label: "About Us", href: "/about-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg transition-transform duration-300 group-hover:rotate-6">
                V
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  VISEZY
                </h2>

                <p className="text-xs text-slate-500">
                  Staffing Solutions
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative font-medium text-slate-700 transition-colors duration-300 hover:text-blue-600"
              >
                {link.label}

                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {open && (
          <div className="glass mb-4 rounded-3xl p-6 lg:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-slate-700"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-center font-semibold text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}