"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Clock, Calendar } from "lucide-react";

import { getBlogs } from "@/services/blog.service";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  category: string;
  readingTime: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
  });

  // Initial loader only
  const [initialLoading, setInitialLoading] = useState(true);

  // Used while changing search/filter or loading more
  const [loadingMore, setLoadingMore] = useState(false);

  // Prevent duplicate API calls
  const loadingRef = useRef(false);

  // ----------------------------
  // Search Debounce
  // ----------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // ----------------------------
  // Reload on Search / Category
  // ----------------------------
  useEffect(() => {
    loadBlogs(true);
  }, [debouncedSearch, category]);

  // ----------------------------
  // Fetch Blogs
  // ----------------------------
  const loadBlogs = async (reset = false) => {
    if (loadingRef.current) return;

    loadingRef.current = true;

    try {
      if (reset) {
        if (blogs.length === 0) {
          setInitialLoading(true);
        } else {
          setLoadingMore(true);
        }
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;

      const data = await getBlogs({
        page: currentPage,
        limit: 6,
        search: debouncedSearch,
        category,
      });

      if (reset) {
        setBlogs(data.blogs);
        setPage(2);
      } else {
        setBlogs((prev) => [...prev, ...data.blogs]);
        setPage((prev) => prev + 1);
      }

      setCategories(
        data.categories?.length
          ? ["All", ...data.categories.filter((c: string) => c !== "All")]
          : ["All"]
      );

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  // ----------------------------
  // Initial Loader
  // ----------------------------
  if (initialLoading) {
    return (
      <section className="pt-12 pb-24">
        <div className="container flex min-h-[350px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="text-slate-500">Loading Blogs...</p>
          </div>
        </div>
      </section>
    );
  }
    return (
    <section className="pt-12 pb-24">
      <div className="container">

        {/* Search & Filter */}

        <div className="mb-12 flex flex-col gap-5">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            {loadingMore && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
              </div>
            )}

          </div>

          {/* Categories */}

          <div className="flex flex-wrap gap-3">

            {categories.map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => {
                  if (item === category) return;
                  setCategory(item);
                }}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  category === item
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Empty */}

        {!loadingMore && blogs.length === 0 ? (

          <div className="py-24 text-center">

            <h3 className="text-3xl font-bold text-slate-900">
              No Blogs Found
            </h3>

            <p className="mt-3 text-slate-500">
              Try another keyword or category.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {blogs.map((blog) => (

              <article
                key={blog._id}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                <Link href={`/blogs/${blog.slug}`}>

                  {/* Image */}

                  <div className="relative h-64 overflow-hidden bg-slate-100">

                    <img
                      src={
                        blog.thumbnail?.startsWith("http")
                          ? blog.thumbnail
                          : `${API}/${blog.thumbnail}`
                      }
                      alt={blog.title}
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                      {blog.category}
                    </div>

                  </div>

                  {/* Content */}

                  <div className="p-7">

                    <h3 className="line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
                      {blog.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-slate-600">
                      {blog.shortDescription}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm text-slate-500">

                      <div className="flex items-center gap-2">
                        <Calendar size={15} />
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={15} />
                        {blog.readingTime || "5 min read"}
                      </div>

                    </div>

                  </div>

                </Link>

              </article>

            ))}
                      </div>
        )}

        {/* Load More */}

        {pagination.hasNext && (
          <div className="mt-16 flex justify-center">

            <button
              type="button"
              disabled={loadingMore}
              onClick={() => loadBlogs(false)}
              className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? (
                <>
                  <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>

          </div>
        )}

        {/* Results */}

        {blogs.length > 0 && (
          <div className="mt-10 text-center text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {blogs.length}
            </span>{" "}
            blog{blogs.length > 1 ? "s" : ""}
            {pagination.totalPages > 1 && (
              <>
                {" "}
                • Page{" "}
                <span className="font-semibold text-slate-700">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {pagination.totalPages}
                </span>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}