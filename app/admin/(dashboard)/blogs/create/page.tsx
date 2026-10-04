"use client";

import { useMemo, useState } from "react";

import styles from "./page.module.css";
import { createBlog } from "@/services/blog.service";

import { toast } from "react-toastify";
import {
    ArrowLeft,
    Upload,
    Save,
    Send,
    Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBlogPage() {
const router = useRouter();
const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [form, setForm] = useState({

        title: "",

        slug: "",

        category: "",

        author: "",

        shortDescription: "",

        readingTime: "",

        seoTitle: "",

        seoDescription: "",

        status: "Draft",
        content: "",
        featured: false,
    });

    const [thumbnail, setThumbnail] =
        useState<File | null>(null);

    const slug = useMemo(() => {

        if (form.slug.trim()) return form.slug;

        return form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

    }, [form.title, form.slug]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

  const handleSubmit = async (
    status: "Draft" | "Published"
) => {
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
            "content",
            form.content
        );
        formData.append(
            "status",
            status
        );

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }
if (thumbnailUrl.trim()) {
  formData.append("thumbnailUrl", thumbnailUrl.trim());
}
        await createBlog(formData);

        toast.success("Blog Created Successfully");

        setTimeout(() => {
            router.push("/admin/blogs");
        }, 1000);

    } catch (error: any) {
        toast.error(
            error.response?.data?.message ||
            "Something went wrong."
        );
    }
};

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

                    <h1>Create Blog</h1>

                    <p>

                        Create a new blog article for Visezy.

                    </p>

                </div>

                <div className={styles.actions}>

                    <button
                        className={styles.draftBtn}
                        onClick={() => handleSubmit("Draft")}
                        type="button"
                    >

                        <Save size={18} />

                        Save Draft

                    </button>

                  <button
className={styles.publishBtn}
onClick={() => handleSubmit("Published")}
type="button"
>

                        <Send size={18} />

                        Publish

                    </button>

                </div>

            </div>

            <div className={styles.grid}>

                <div className={styles.left}>

                    {/* BASIC INFO */}

                    <div className={styles.card}>

                        <h3>Basic Information</h3>

                        <div className={styles.field}>

                            <label>

                                Blog Title

                            </label>

                            <input

                                name="title"

                                value={form.title}

                                onChange={handleChange}

                                placeholder="Enter blog title"

                            />

                        </div>

                        <div className={styles.field}>

                            <label>

                                Slug

                            </label>

                            <input

                                name="slug"

                                value={slug}

                                onChange={handleChange}

                            />

                        </div>

                        <div className={styles.row}>

                            <div className={styles.field}>

                                <label>

                                    Category

                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                >

                                    <option>

                                        Select

                                    </option>

                                    <option>

                                        Recruitment

                                    </option>

                                    <option>

                                        AI

                                    </option>

                                    <option>

                                        Staffing

                                    </option>

                                </select>

                            </div>

                            <div className={styles.field}>

                                <label>

                                    Author

                                </label>

                                <input

                                    name="author"

                                    value={form.author}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <div className={styles.field}>

                            <label>

                                Short Description

                            </label>

                            <textarea

                                rows={5}

                                name="shortDescription"

                                value={form.shortDescription}

                                onChange={handleChange}

                            />

                        </div>

                    </div>
                    {/* CONTENT */}

                    <div className={styles.card}>

                        <h3>Blog Content</h3>

                        <div className={styles.editor}>

                            

                            <textarea
                                className={styles.editorArea}
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Write your blog content here..."
                            />

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDEBAR */}

                <div className={styles.right}>

                    {/* THUMBNAIL */}
<div className={styles.card}>
  <h3>Thumbnail</h3>

  {/* Upload */}

  <label className={styles.uploadBox}>
    <ImageIcon size={40} />

    <span>
      {thumbnail ? "Change Thumbnail" : "Upload Thumbnail"}
    </span>

    <input
      type="file"
      hidden
      accept="image/*"
      onChange={(e) => {
        setThumbnail(e.target.files?.[0] || null);
        setThumbnailUrl("");
      }}
    />
  </label>

  {thumbnail && (
    <>
      <p className={styles.fileName}>{thumbnail.name}</p>

      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => setThumbnail(null)}
      >
        Remove Upload
      </button>
    </>
  )}

  <div className={styles.or}>OR</div>

  {/* URL */}

  <div className={styles.field}>
    <label>Image URL</label>

    <input
      type="url"
      placeholder="https://images.unsplash.com/..."
      value={thumbnailUrl}
      onChange={(e) => {
        setThumbnailUrl(e.target.value);
        setThumbnail(null);
      }}
    />
  </div>

  {/* Preview */}

  {thumbnailUrl && (
    <div className={styles.preview}>
      <img
        src={thumbnailUrl}
        alt="Preview"
        onError={(e) => {
          e.currentTarget.src = "/images/blog-placeholder.jpg";
        }}
      />
    </div>
  )}

  {thumbnailUrl && (
    <div className={styles.actionsRow}>
      <button
        type="button"
        className={styles.updateBtn}
      >
        Update
      </button>

      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => setThumbnailUrl("")}
      >
        Remove
      </button>
    </div>
  )}
</div>


                    {/* BLOG SETTINGS */}

                    <div className={styles.card}>

                        <h3>Blog Settings</h3>

                        <div className={styles.field}>

                            <label>

                                Reading Time

                            </label>

                            <input

                                name="readingTime"

                                value={form.readingTime}

                                onChange={handleChange}

                                placeholder="5 min read"

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