"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import {
    ArrowLeft,
    Upload,
    Save,
    Plus,
    Image as ImageIcon,
} from "lucide-react";

import { toast } from "react-toastify";

import {
    createSlider,
    getSliderById,
    updateSlider,
} from "@/services/slider.service";

import styles from "./SliderForm.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;

interface SliderFormProps {
    mode: "create" | "edit";
}

export default function SliderForm({
    mode,
}: SliderFormProps) {

    const router = useRouter();

    const params = useParams();

    const id = params?.id as string;

    const [loading, setLoading] = useState(
        mode === "edit"
    );

    const [image, setImage] =
        useState<File | null>(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const [form, setForm] = useState({

        badge: "",

        title: "",

        highlightText: "",

        remainingTitle: "",

        description: "",

        primaryButtonText: "Get Started",

        primaryButtonLink: "/contact-us",

        secondaryButtonText:
            "Employees Get Hired",

        secondaryButtonLink:
            "/employees",

        features: "",
        image: "",
        status: "Active",

    });

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

        if (mode === "edit") {

            fetchSlider();

        }

    }, []);

    const fetchSlider = async () => {

        try {

            const { slider } =
                await getSliderById(id);

            setForm({

                badge: slider.badge,

                title: slider.title,

                highlightText:
                    slider.highlightText,

                remainingTitle:
                    slider.remainingTitle,

                description:
                    slider.description,

                primaryButtonText:
                    slider.primaryButtonText,

                primaryButtonLink:
                    slider.primaryButtonLink,

                secondaryButtonText:
                    slider.secondaryButtonText,

                secondaryButtonLink:
                    slider.secondaryButtonLink,

                features:
                    slider.features.join(","),
                image: slider.image,
                status: slider.status,

            });
            setImagePreview(
                slider.image.startsWith("http")
                    ? slider.image
                    : `${API}/${slider.image}`
            );

        } catch {

            toast.error(
                "Unable to load slider."
            );

            router.push("/admin/sliders");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async () => {

        try {

            if (!form.badge.trim())
                return toast.error("Badge is required.");

            if (!form.title.trim())
                return toast.error("Title is required.");

            if (!form.highlightText.trim())
                return toast.error("Highlight text is required.");

            if (!form.remainingTitle.trim())
                return toast.error("Remaining title is required.");

            if (!form.description.trim())
                return toast.error("Description is required.");

            if (mode === "create" && !image)
                return toast.error("Please upload slider image.");

            const formData = new FormData();

            formData.append("badge", form.badge);

            formData.append("title", form.title);

            formData.append(
                "highlightText",
                form.highlightText
            );

            formData.append(
                "remainingTitle",
                form.remainingTitle
            );

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "primaryButtonText",
                form.primaryButtonText
            );

            formData.append(
                "primaryButtonLink",
                form.primaryButtonLink
            );

            formData.append(
                "secondaryButtonText",
                form.secondaryButtonText
            );

            formData.append(
                "secondaryButtonLink",
                form.secondaryButtonLink
            );

            formData.append(
                "features",
                form.features
            );
            formData.append("image", form.image);
            if (image) {
                formData.append("image", image);
            }
            formData.append(
                "status",
                form.status
            );



            if (mode === "create") {

                await createSlider(formData);

                toast.success(
                    "Slider created successfully."
                );

            } else {

                await updateSlider(
                    id,
                    formData
                );

                toast.success(
                    "Slider updated successfully."
                );

            }

            router.push("/admin/sliders");

        } catch (error: any) {

            toast.error(

                error.response?.data?.message ||

                "Something went wrong."

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
                        href="/admin/sliders"
                        className={styles.back}
                    >

                        <ArrowLeft size={18} />

                        Back to Sliders

                    </Link>

                    <h1>

                        {mode === "create"

                            ? "Create Slider"

                            : "Edit Slider"}

                    </h1>

                    <p>

                        Manage homepage hero slider.

                    </p>

                </div>

                <button
                    className={styles.primaryBtn}
                    type="button"
                    onClick={handleSubmit}
                >

                    {mode === "create"

                        ? <Plus size={18} />

                        : <Save size={18} />}

                    {mode === "create"

                        ? "Create Slider"

                        : "Update Slider"}

                </button>

            </div>

            <div className={styles.grid}>

                <div className={styles.left}>          {/* Basic Information */}

                    <div className={styles.card}>

                        <h3>Basic Information</h3>

                        <div className={styles.field}>

                            <label>Badge</label>

                            <input
                                name="badge"
                                value={form.badge}
                                onChange={handleChange}
                                placeholder="Top Recruitment Agency"
                            />

                        </div>

                        <div className={styles.field}>

                            <label>Title</label>

                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Hire Better Talent Faster"
                            />

                        </div>

                        <div className={styles.row}>

                            <div className={styles.field}>

                                <label>Highlight Text</label>

                                <input
                                    name="highlightText"
                                    value={form.highlightText}
                                    onChange={handleChange}
                                    placeholder="Top Talent"
                                />

                            </div>

                            <div className={styles.field}>

                                <label>Remaining Title</label>

                                <input
                                    name="remainingTitle"
                                    value={form.remainingTitle}
                                    onChange={handleChange}
                                    placeholder="For Your Company"
                                />

                            </div>

                        </div>

                        <div className={styles.field}>

                            <label>Description</label>

                            <textarea
                                rows={6}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className={styles.card}>

                        <h3>Buttons</h3>

                        <div className={styles.row}>

                            <div className={styles.field}>

                                <label>Primary Button</label>

                                <input
                                    name="primaryButtonText"
                                    value={form.primaryButtonText}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className={styles.field}>

                                <label>Primary Link</label>

                                <input
                                    name="primaryButtonLink"
                                    value={form.primaryButtonLink}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className={styles.row}>

                            <div className={styles.field}>

                                <label>Secondary Button</label>

                                <input
                                    name="secondaryButtonText"
                                    value={form.secondaryButtonText}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className={styles.field}>

                                <label>Secondary Link</label>

                                <input
                                    name="secondaryButtonLink"
                                    value={form.secondaryButtonLink}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    {/* Features */}

                    <div className={styles.card}>

                        <h3>Features</h3>

                        <div className={styles.field}>

                            <label>

                                Features (comma separated)

                            </label>

                            <textarea
                                rows={4}
                                name="features"
                                value={form.features}
                                onChange={handleChange}
                                placeholder="AI Hiring, Payroll, Recruitment..."
                            />

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className={styles.right}>

                    <div className={styles.card}>

                        <h3>Slider Image</h3>

                        {

                            imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className={styles.preview}
                                />


                            )

                        }

                        <label className={styles.uploadBox}>

                            <ImageIcon size={36} />

                            <span>

                                {

                                    mode === "create"

                                        ? "Upload Slider Image"

                                        : "Replace Slider Image"

                                }

                            </span>

                            <input

                                hidden

                                type="file"

                                accept="image/*"

                                onChange={(e) => {

                                    if (!e.target.files?.length) return;

                                    const file = e.target.files[0];

                                    setImage(file);

                                    setImagePreview(

                                        URL.createObjectURL(file)

                                    );

                                }}

                            />

                        </label>  </div>
                    <div className={styles.field}>
                        <label>Image URL</label>

                        <input
                            name="image"
                            placeholder="https://images.unsplash.com/..."
                            value={form.image}
                            onChange={(e) => {
                                handleChange(e);

                                setImage(null);

                                setImagePreview(e.target.value);
                            }}
                        />
                    </div>


                    <div className={styles.card}>

                        <h3>Status</h3>

                        <div className={styles.field}>

                            <label>Status</label>

                            <select

                                name="status"

                                value={form.status}

                                onChange={handleChange}

                            >

                                <option>

                                    Active

                                </option>

                                <option>

                                    Inactive

                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    );

}