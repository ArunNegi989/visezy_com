"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import {
    ArrowLeft,
    Upload,
    Save,
    Image as ImageIcon,
} from "lucide-react";

import { toast } from "react-toastify";

import styles from "./page.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EditBlogPage() {

    const { id } = useParams();

    const router = useRouter();
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const [thumbnail, setThumbnail] =
        useState<File | null>(null);

    const [banner, setBanner] =
        useState<File | null>(null);

    const [thumbnailPreview, setThumbnailPreview] =
        useState("");

    const [bannerPreview, setBannerPreview] =
        useState("");

    const [form, setForm] = useState({

        title: "",

        slug: "",

        category: "",

        author: "",

        shortDescription: "",

        content: "",

        readingTime: "",

        seoTitle: "",

        seoDescription: "",

        status: "Draft",

    });

    const slug = useMemo(() => {

        if (form.slug) return form.slug;

        return form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

    }, [form.title, form.slug]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    useEffect(() => {

        fetchBlog();

    }, []);

    const fetchBlog = async () => {

        try {

            const { data } = await axios.get(

                `${API}/api/blogs/admin/${id}`

            );

            const blog = data.blog;

            setForm({

                title: blog.title,

                slug: blog.slug,

                category: blog.category,

                author: blog.author,

                shortDescription: blog.shortDescription,

                content: blog.content,

                readingTime: blog.readingTime,

                seoTitle: blog.seoTitle,

                seoDescription: blog.seoDescription,

                status: blog.status,

            });

            const image =
                blog.thumbnail?.startsWith("http")
                    ? blog.thumbnail
                    : `${API}/${blog.thumbnail}`;

            setThumbnailPreview(image);
            setThumbnailUrl(
                blog.thumbnail?.startsWith("http")
                    ? blog.thumbnail
                    : ""
            );
        } catch (error) {

            toast.error("Unable to fetch blog.");

            router.push("/admin/blogs");

        } finally {

            setLoading(false);

        }

    };

    const handleUpdate = async () => {

        try {

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("category", form.category);
            formData.append("author", form.author);
            formData.append(
                "shortDescription",
                form.shortDescription
            );

            formData.append(
                "content",
                form.content
            );

            formData.append(
                "readingTime",
                form.readingTime
            );

            formData.append(
                "seoTitle",
                form.seoTitle
            );

            formData.append(
                "seoDescription",
                form.seoDescription
            );

            formData.append(
                "status",
                form.status
            );

            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            if (
                thumbnailUrl &&
                thumbnailUrl.trim().startsWith("http")
            ) {
                formData.append(
                    "thumbnailUrl",
                    thumbnailUrl.trim()
                );
            }

            await axios.put(

                `${API}/api/blogs/${id}`,

                formData,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data",

                    },

                }

            );

            toast.success(
                "Blog updated successfully."
            );

            router.push("/admin/blogs");

        } catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Unable to update blog."

            );

        }

    };

    if (loading) {

        return (

            <div className={styles.loading}>

                Loading...

            </div>

        );

    }

    return (

        <div className={styles.wrapper}>

            <div className={styles.header}>

                <div>

                    <Link
                        href="/admin/blogs"
                        className={styles.back}
                    >

                        <ArrowLeft size={18} />

                        Back to Blogs

                    </Link>

                    <h1>Edit Blog</h1>

                    <p>

                        Update your blog information.

                    </p>

                </div>

                <button

                    className={styles.publishBtn}

                    onClick={handleUpdate}

                    type="button"

                >

                    <Save size={18} />

                    Update Blog

                </button>

            </div>

            <div className={styles.grid}>

                <div className={styles.left}>
                    {/* Basic Information */}

                    <div className={styles.card}>

                        <h3>Basic Information</h3>

                        <div className={styles.field}>

                            <label>Blog Title</label>

                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className={styles.field}>

                            <label>Slug</label>

                            <input
                                value={slug}
                                readOnly
                            />

                        </div>

                        <div className={styles.row}>

                            <div className={styles.field}>

                                <label>Category</label>

                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className={styles.field}>

                                <label>Author</label>

                                <input
                                    name="author"
                                    value={form.author}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className={styles.field}>

                            <label>Short Description</label>

                            <textarea
                                rows={5}
                                name="shortDescription"
                                value={form.shortDescription}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Content */}

                    <div className={styles.card}>

                        <h3>Blog Content</h3>

                        <textarea
                            className={styles.editorArea}
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className={styles.right}>

                    {/* Thumbnail */}

                    <div className={styles.card}>
                        <h3>Thumbnail</h3>

                        {thumbnailPreview && (
                            <img
                                src={thumbnailPreview}
                                alt="Thumbnail Preview"
                                className={styles.preview}
                            />
                        )}

                        <label className={styles.uploadBox}>
                            <ImageIcon size={34} />

                            <span>
                                Replace Thumbnail
                            </span>

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (!e.target.files?.length) return;

                                    const file = e.target.files[0];

                                    setThumbnail(file);
                                    setThumbnailUrl("");

                                    setThumbnailPreview(
                                        URL.createObjectURL(file)
                                    );
                                }}
                            />
                        </label>

                        <div className={styles.field}>
                            <label>Image URL</label>

                            <input
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                value={thumbnailUrl}
                                onChange={(e) => {
                                    setThumbnail(null);
                                    setThumbnailUrl(e.target.value);
                                    setThumbnailPreview(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* Settings */}

                    <div className={styles.card}>

                        <h3>Settings</h3>

                        <div className={styles.field}>

                            <label>

                                Reading Time

                            </label>

                            <input
                                name="readingTime"
                                value={form.readingTime}
                                onChange={handleChange}
                            />

                        </div>

                        <div className={styles.field}>

                            <label>

                                Status

                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >

                                <option>

                                    Draft

                                </option>

                                <option>

                                    Published

                                </option>

                            </select>

                        </div>

                    </div>

                    {/* SEO */}

                    <div className={styles.card}>

                        <h3>SEO</h3>

                        <div className={styles.field}>

                            <label>

                                SEO Title

                            </label>

                            <input
                                name="seoTitle"
                                value={form.seoTitle}
                                onChange={handleChange}
                            />

                        </div>

                        <div className={styles.field}>

                            <label>

                                SEO Description

                            </label>

                            <textarea
                                rows={4}
                                name="seoDescription"
                                value={form.seoDescription}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
} 