"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { getFeaturedBlog } from "@/services/blog.service";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  category: string;
  readingTime: string;
  author: string;
  createdAt: string;
}

export default function FeaturedPost() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedBlog();
  }, []);

  const loadFeaturedBlog = async () => {
    try {
      const data = await getFeaturedBlog();
      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  if (!blog) return null;

  return (
   <section className="pb-36">
      <div className="container">
        <div className="group overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="w-full overflow-hidden bg-slate-100 lg:h-full">
  <img
  src={
    blog.thumbnail?.startsWith("https")
      ? blog.thumbnail
      : `${API}/${blog.thumbnail}`
  }
  alt={blog.title}
  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
/>
</div>

            <div className="flex flex-col justify-center p-10">
              <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                Featured
              </span>

              <h2 className="mt-5 text-4xl font-bold text-slate-900">
                {blog.title}
              </h2>

              <p className="mt-5 text-slate-600">
                {blog.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={15} />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  {blog.readingTime}
                </div>
              </div>

              <Link
                href={`/blogs/${blog.slug}`}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
              >
                Read Article
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}