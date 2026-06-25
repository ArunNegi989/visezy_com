"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Clock, Calendar } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top Recruitment Trends In 2026",
    category: "Recruitment",
    date: "May 12, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
  },
  {
    id: 2,
    title: "AI Powered Candidate Screening",
    category: "AI",
    date: "May 18, 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
  },
  {
    id: 3,
    title: "Contract Staffing vs Direct Hiring",
    category: "Staffing",
    date: "May 21, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200",
  },
  {
    id: 4,
    title: "Building High Performance Teams",
    category: "Leadership",
    date: "May 26, 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
  },
  {
    id: 5,
    title: "Future Of Workforce Automation",
    category: "AI",
    date: "June 2, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200",
  },
  {
    id: 6,
    title: "Employee Retention Strategies",
    category: "HR",
    date: "June 8, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
  },
];

const categories = [
  "All",
  "Recruitment",
  "AI",
  "Staffing",
  "Leadership",
  "HR",
];

export default function BlogGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const searchMatch = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || blog.category === category;

      return searchMatch && categoryMatch;
    });
  }, [search, category]);

  return (
    <section className="pb-24">
      <div className="container">

        <div className="mb-10 flex flex-col gap-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 font-medium transition-all ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredBlogs.slice(0, visible).map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  fill
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-7">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  {blog.category}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900 group-hover:text-blue-600">
                  {blog.title}
                </h3>

                <div className="mt-5 flex items-center gap-5 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {blog.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {blog.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible < filteredBlogs.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisible((prev) => prev + 6)}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}