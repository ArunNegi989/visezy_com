"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="container py-16">
        {/* Top Section */}
        <div className="mb-12 flex flex-col gap-8 border-b border-slate-200 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              VISEZY
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Staffing Solutions
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
            >
              <FaLinkedinIn size={18} />
            </Link>

            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram size={18} />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <p className="max-w-xs text-slate-600">
              We make hiring simple, fast and effective with AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900">
              Quick Links
            </h4>

            <div className="space-y-4">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Job Seeker
                </p>

                <Link
                  href="/employees"
                  className="block text-slate-600 transition-colors hover:text-blue-600"
                >
                  Submit Resume
                </Link>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  For Businesses
                </p>

                <Link
                  href="/employees"
                  className="block text-slate-600 transition-colors hover:text-blue-600"
                >
                  Find Employees
                </Link>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900">
              Help & Support
            </h4>

            <div className="space-y-3">
              <Link
                href="/#faq"
                className="block text-slate-600 transition-colors hover:text-blue-600"
              >
                FAQ
              </Link>

              <Link
                href="/blogs"
                className="block text-slate-600 transition-colors hover:text-blue-600"
              >
                Blogs
              </Link>

              <Link
                href="/privacy-policy"
                className="block text-slate-600 transition-colors hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/contact"
                className="block text-slate-600 transition-colors hover:text-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900">
              Connect With Us
            </h4>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Call Us
                </p>

                <a
                  href="tel:+917453852331"
                  className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
                >
                  +91 7453-852-331
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Email Us
                </p>

                <a
                  href="mailto:info@visezy.com"
                  className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
                >
                  info@visezy.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Our Address
                </p>

                <p className="font-semibold text-slate-900">
                  Nehru Colony, Dehradun (U.K.), India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VISEZY. All rights reserved.</p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="inline-flex items-center gap-2 transition-colors hover:text-blue-600"
          >
            <FaArrowUp size={14} />
            Scroll To Top
          </button>
        </div>
      </div>
    </footer>
  );
}