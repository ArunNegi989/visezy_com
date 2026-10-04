"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Blog {
  _id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  shortDescription: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} satisfies Variants;

export default function LatestArticles() {
  const [articles, setArticles] = useState<Blog[]>([]);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blogs?limit=3`);

        if (!res.ok) return;

        const data = await res.json();

        setArticles(data.blogs || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadBlogs();
  }, []);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Animated Background */}
      <motion.div
        className="absolute right-0 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-blue-100/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.75, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container"
      >
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              Insights & Resources
            </span>

            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
              Latest Articles
            </h2>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 self-start rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
          >
            View All

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          className="grid gap-8 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.article
              key={article._id}
              variants={fadeUp}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
            >
              <Link href={`/blogs/${article.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={article.thumbnail}
                    alt={article.title}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-blue-600 backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {article.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-slate-600">
                    {article.shortDescription}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                    Read Article

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}