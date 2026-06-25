"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBlogs } from "@/services/blog.service";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  category: string;
}
export default function BlogHero() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs({ page: 1, limit: 5 }); // Reduced limit for better perf
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Auto-slide logic...
  useEffect(() => {
    if (blogs.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [blogs.length]);

  const blog = blogs[current];
  const imageSrc = useMemo(() => {
    if (!blog) return "";
    return blog.thumbnail?.startsWith("http") ? blog.thumbnail : `${API}/${blog.thumbnail}`;
  }, [blog]);

  if (loading || !blog) return <div className="h-[500px] animate-pulse bg-gray-100" />;

  return (
    <section className="relative overflow-hidden bg-gray-50 pt-24 pb-16">
      <div className="container relative z-10 mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            {/* Text Content */}
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700">
                {blog.category}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
                {blog.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {blog.shortDescription}
              </p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-[1.02]"
              >
                Read Article <ArrowRight size={18} />
              </Link>
            </div>

            {/* Image Content */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

       
      </div>
    </section>
  );
}