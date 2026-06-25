"use client";

import { X, Download, Calendar, Briefcase } from "lucide-react";
import styles from "./CareerViewModal.module.css";

interface Career {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  experience: string;
  resume: string;
  resumeOriginalName: string;
  status: string;
  createdAt: string;
}

interface Props {
  career: Career;
  onClose: () => void;
}

export default function CareerViewModal({
  career,
  onClose,
}: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <div>
            <h2>Application Details</h2>
            <p>Review candidate information</p>
          </div>

          <button
            onClick={onClose}
            className={styles.closeBtn}
          >
            <X size={22} />
          </button>
        </div>

        <div className={styles.body}>

          <div className={styles.grid}>

            <div className={styles.item}>
              <label>First Name</label>
              <span>{career.firstName}</span>
            </div>

            <div className={styles.item}>
              <label>Last Name</label>
              <span>{career.lastName}</span>
            </div>

            <div className={styles.item}>
              <label>Email</label>
              <span>{career.email}</span>
            </div>

            <div className={styles.item}>
              <label>Phone</label>
              <span>{career.phone}</span>
            </div>

            <div className={styles.item}>
              <label>Current Position</label>
              <span>{career.currentPosition}</span>
            </div>

            <div className={styles.item}>
              <label>Status</label>

              <span
                className={`${styles.badge} ${
                  styles[
                    career.status.toLowerCase()
                  ]
                }`}
              >
                {career.status}
              </span>
            </div>

          </div>

          <div className={styles.section}>
            <h3>
              <Briefcase size={18} />
              Experience
            </h3>

            <p>{career.experience}</p>
          </div>

          <div className={styles.section}>
            <h3>
              <Calendar size={18} />
              Applied On
            </h3>

            <p>
              {new Date(
                career.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div className={styles.section}>
            <h3>Resume</h3>

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}${career.resume}`}
              target="_blank"
              rel="noreferrer"
              className={styles.resumeBtn}
            >
              <Download size={18} />

              {career.resumeOriginalName}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}