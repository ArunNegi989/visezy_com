"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { getBlogFilters } from "../../../../services/blog.service"

import styles from "./page.module.css";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    author: string;
    status: string;
    views: number;
    createdAt: string;
    thumbnail: string;
}

interface Pagination {
    currentPage: number;
    perPage: number;
    totalBlogs: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [status, setStatus] = useState("");

    const [sort, setSort] = useState("newest");

    const [page, setPage] = useState(1);

    const [categories, setCategories] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    const fetchFilters = async () => {
        try {
            const { categories, statuses } =
                await getBlogFilters();

            setCategories(categories);
            setStatuses(statuses);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFilters();
    }, []);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        perPage: 10,
        totalBlogs: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/blogs/admin/all", {
                params: {
                    page,
                    limit: 10,
                    search,
                    category,
                    status,
                    sort,
                },
            });

            setBlogs(data.blogs);

            setPagination(data.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 700);

        return () => clearTimeout(timer);
    }, [page, search, category, status, sort]);
    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/blogs/${id}`);

            setBlogs((prev) =>
                prev.filter((blog) => blog._id !== id)
            );

            setPagination((prev) => ({
                ...prev,
                totalBlogs: prev.totalBlogs - 1,
            }));

            toast.success("Blog deleted successfully.");

            if (blogs.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            } else {
                fetchBlogs();
            }

        } catch (error: any) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete blog."
            );
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Header */}

            <div className={styles.header}>
                <div>
                    <h1>Blogs</h1>

                    <p>Manage all blog posts from one place.</p>
                </div>

                <Link
                    href="/admin/blogs/create"
                    className={styles.addBtn}
                >
                    <Plus size={18} />
                    Add Blog
                </Link>
            </div>

            {/* Toolbar */}

            <div className={styles.toolbar}>
                <div className={styles.search}>
                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search blog..."
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>

                <select
                    className={styles.filterBtn}
                    value={category}
                    onChange={(e) => {
                        setPage(1);
                        setCategory(e.target.value);
                    }}
                >
                    <option value="">All Categories</option>

                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    className={styles.filterBtn}
                    value={status}
                    onChange={(e) => {
                        setPage(1);
                        setStatus(e.target.value);
                    }}
                >
                    <option value="">All Status</option>

                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    className={styles.filterBtn}
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="title">Title</option>
                    <option value="views">Views</option>
                </select>
            </div>

            {/* Table */}

            <div className={styles.tableCard}>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Views</th>
                            <th>Date</th>
                            <th align="center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7}>
                                    <div className={styles.loadingWrapper}>
                                        {[...Array(6)].map((_, index) => (
                                            <div
                                                key={index}
                                                className={styles.loadingRow}
                                            />
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ) : blogs.length === 0 ? (
                            <tr>
                                <td colSpan={7}>
                                    <div className={styles.empty}>
                                        <h3>No Blogs Found</h3>
                                        <p>
                                            Create your first blog to see it here.
                                        </p>

                                        <Link
                                            href="/admin/blogs/create"
                                            className={styles.addBtn}
                                        >
                                            <Plus size={18} />
                                            Add Blog
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td><img src={blog.thumbnail}
                                        height={100}
                                        width={150}
                                        alt={blog.title}
                                        className={styles.image} />
                                    </td>
                                    <td>
                                        <strong>{blog.title}</strong>
                                    </td>

                                    <td>{blog.category}</td>

                                    <td>{blog.author}</td>

                                    <td>
                                        <span
                                            className={
                                                blog.status === "Published"
                                                    ? styles.publish
                                                    : styles.draft
                                            }
                                        >
                                            {blog.status}
                                        </span>
                                    </td>

                                    <td>{blog.views}</td>

                                    <td>
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/blogs/${blog.slug}`}
                                                target="_blank"
                                                className={styles.actionBtn}
                                            >
                                                <Eye size={18} />
                                            </Link>

                                            <Link
                                                href={`/admin/blogs/edit/${blog._id}`}
                                                className={styles.actionBtn}
                                            >
                                                <Pencil size={18} />
                                            </Link>

                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(blog._id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Footer */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "24px",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <p
                    style={{
                        color: "var(--muted)",
                        fontWeight: 500,
                    }}
                >
                    Total Blogs : <strong>{pagination.totalBlogs}</strong>
                </p>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <button
                        className={styles.filterBtn}
                        disabled={!pagination.hasPrev}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        <ChevronLeft size={18} />
                        Previous
                    </button>

                    {Array.from(
                        { length: pagination.totalPages },
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                style={{
                                    width: 42,
                                    height: 42,
                                    border: "1px solid var(--border)",
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    background:
                                        page === index + 1
                                            ? "var(--primary)"
                                            : "#fff",
                                    color:
                                        page === index + 1
                                            ? "#fff"
                                            : "var(--foreground)",
                                    fontWeight: 600,
                                }}
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        className={styles.filterBtn}
                        disabled={!pagination.hasNext}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}