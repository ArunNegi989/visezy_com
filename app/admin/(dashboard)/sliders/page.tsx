"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
    ArrowUp,
    ArrowDown,
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";

import { toast } from "react-toastify";

import {
    getSliders,
    deleteSlider,
    moveSliderUp,
    moveSliderDown,
} from "@/services/slider.service";

import styles from "./page.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SliderPage() {

    const [loading, setLoading] = useState(true);

    const [sliders, setSliders] = useState([]);

    const loadSliders = async () => {

        try {

            const { sliders } = await getSliders();

            setSliders(sliders);

        } catch {

            toast.error("Unable to load sliders.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadSliders();

    }, []);

    const handleDelete = async (id: string) => {

        if (
            !window.confirm(
                "Delete this slider?"
            )
        ) return;

        try {

            await deleteSlider(id);

            toast.success(
                "Slider deleted."
            );

            loadSliders();

        } catch {

            toast.error(
                "Delete failed."
            );

        }

    };

    const handleMoveUp = async (id: string) => {

        try {

            await moveSliderUp(id);

            await loadSliders();

        } catch (error) {

            console.error(error);

            toast.error("Unable to move.");

        }

    };

    const handleMoveDown = async (id: string) => {

        try {

            await moveSliderDown(id);

            await loadSliders();

        } catch (error) {

            console.error(error);

            toast.error("Unable to move.");

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

                    <h1>

                        Hero Sliders

                    </h1>

                    <p>

                        Manage homepage banners.

                    </p>

                </div>

                <Link
                    href="/admin/sliders/create"
                    className={styles.addBtn}
                >

                    <Plus size={18} />

                    Add Slider

                </Link>

            </div>

            <div className={styles.tableCard}>

                <table>

                    <thead>

                        <tr>

                            <th>Order</th>

                            <th>Image</th>

                            <th>Badge</th>

                            <th>Title</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {sliders.map((slider: any, index: number) => (

                            <tr key={slider._id}>

                                <td>
                                    <div className={styles.order}>

                                        {index !== 0 ? (
                                            <button
                                                onClick={() => handleMoveUp(slider._id)}
                                                title="Move Up"
                                            >
                                                <ArrowUp size={16} />
                                            </button>
                                        ) : (
                                            <div className={styles.emptyBtn}></div>
                                        )}

                                        <span>{slider.order}</span>

                                        {index !== sliders.length - 1 ? (
                                            <button
                                                onClick={() => handleMoveDown(slider._id)}
                                                title="Move Down"
                                            >
                                                <ArrowDown size={16} />
                                            </button>
                                        ) : (
                                            <div className={styles.emptyBtn}></div>
                                        )}

                                    </div>
                                </td>

                                <td>

                                  <img
    src={
        slider.image?.startsWith("http")
            ? slider.image
            : `${API}/${slider.image}`
    }
    alt={slider.title}
    className={styles.image}
/>
                                </td>

                                <td>

                                    {slider.badge}

                                </td>

                                <td>

                                    {slider.title}

                                </td>

                                <td>

                                    <span
                                        className={
                                            slider.status ===
                                                "Active"
                                                ? styles.active
                                                : styles.inactive
                                        }
                                    >

                                        {slider.status}

                                    </span>

                                </td>

                                <td>

                                    <div
                                        className={styles.actions}
                                    >

                                        <Link
                                            href={`/admin/sliders/edit/${slider._id}`}
                                        >

                                            <Pencil size={18} />

                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    slider._id
                                                )
                                            }
                                        >

                                            <Trash2 size={18} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}