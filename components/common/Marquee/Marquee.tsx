"use client";

import { useEffect, useState } from "react";
import styles from "./Marquee.module.css";

interface MarqueeData {
  _id: string;
  text: string;
  link?: string;
  isActive: boolean;
}

export default function Marquee() {
  const [marquee, setMarquee] = useState<MarqueeData | null>(null);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/marquee`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(
            "Marquee API Error:",
            result.message || "Failed to fetch marquee"
          );
          return;
        }

        if (result.success && result.data) {
          setMarquee(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch marquee:", error);
      }
    };

    fetchMarquee();
  }, []);

  if (!marquee || !marquee.isActive) {
    return null;
  }

  const content = (
    <>
      <span>{marquee.text}</span>

      <span className={styles.separator}></span>

      <span>{marquee.text}</span>

      <span className={styles.separator}></span>

      <span>{marquee.text}</span>

      <span className={styles.separator}></span>

      <span>{marquee.text}</span>
    </>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {marquee.link ? (
          <a
            href={marquee.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}