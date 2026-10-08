"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  Link as LinkIcon,
  Edit3,
  Trash2,
  RefreshCw,
  Plus,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import styles from "./page.module.css";

interface Marquee {
  _id: string;
  text: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MarqueePage() {
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchMarquee = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/marquee/admin`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch marquee.");
      }

      setMarquee(data.data || null);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch marquee.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarquee();
  }, []);

  const openCreateModal = () => {
    setText("");
    setLink("");
    setIsActive(true);
    setShowModal(true);
  };

  const openEditModal = () => {
    if (!marquee) return;

    setText(marquee.text);
    setLink(marquee.link || "");
    setIsActive(marquee.isActive);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter marquee text.");
      return;
    }

    try {
      setSaving(true);

      const isEdit = Boolean(marquee);

      const response = await fetch(
        isEdit
          ? `${API_URL}/api/marquee/${marquee?._id}`
          : `${API_URL}/api/marquee`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            text: text.trim(),
            link: link.trim(),
            isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save marquee.");
      }

      toast.success(
        isEdit
          ? "Marquee updated successfully."
          : "Marquee created successfully."
      );

      setMarquee(data.data);
      setShowModal(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!marquee) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this marquee?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/api/marquee/${marquee._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete marquee.");
      }

      toast.success("Marquee deleted successfully.");

      setMarquee(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete marquee.");
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus = async () => {
    if (!marquee) return;

    try {
      const response = await fetch(
        `${API_URL}/api/marquee/${marquee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            text: marquee.text,
            link: marquee.link || "",
            isActive: !marquee.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status.");
      }

      setMarquee(data.data);

      toast.success(
        data.data.isActive
          ? "Marquee activated successfully."
          : "Marquee deactivated successfully."
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to update status.");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Marquee Management</h1>

          <p className={styles.subtitle}>
            Manage the announcement marquee displayed below the website header.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            onClick={fetchMarquee}
            className={styles.refreshBtn}
            disabled={loading}
          >
            <RefreshCw
              size={18}
              className={loading ? styles.spin : ""}
            />
            Refresh
          </button>

          {!marquee && (
            <button
              onClick={openCreateModal}
              className={styles.addBtn}
            >
             
              Create Marquee
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <motion.div
          whileHover={{ y: -4 }}
          className={styles.statCard}
        >
          <div className={styles.statIcon}>
            <Megaphone size={24} />
          </div>

          <div>
            <h4>Total Marquee</h4>
            <h2>{marquee ? 1 : 0}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={styles.statCard}
        >
          <div className={styles.statIconGreen}>
            <CheckCircle2 size={24} />
          </div>

          <div>
            <h4>Status</h4>
            <h2>
              {marquee
                ? marquee.isActive
                  ? "Active"
                  : "Inactive"
                : "-"}
            </h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={styles.statCard}
        >
          <div className={styles.statIconBlue}>
            <LinkIcon size={24} />
          </div>

          <div>
            <h4>Link</h4>
            <h2>{marquee?.link ? "Added" : "None"}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={styles.statCard}
        >
          <div className={styles.statIconOrange}>
            <Megaphone size={24} />
          </div>

          <div>
            <h4>Visibility</h4>
            <h2>
              {marquee?.isActive ? "Live" : "Hidden"}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loader2
            size={40}
            className={styles.loader}
          />

          <p>Loading marquee...</p>
        </div>
      ) : !marquee ? (
        <div className={styles.emptyState}>
          <Megaphone size={60} />

          <h3>No Marquee Found</h3>

          <p>
            Create a marquee announcement to display it below
            the website header.
          </p>

          <button
            onClick={openCreateModal}
            className={styles.createEmptyBtn}
          >
          
            Create Marquee
          </button>
        </div>
      ) : (
        <>
          {/* Marquee Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.marqueeCard}
          >
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitleRow}>
                  <div className={styles.cardIcon}>
                    <Megaphone size={20} />
                  </div>

                  <div>
                    <h2>Website Announcement</h2>

                    <p>
                      Current marquee content shown on the website.
                    </p>
                  </div>
                </div>
              </div>

              <span
                className={
                  marquee.isActive
                    ? styles.activeBadge
                    : styles.inactiveBadge
                }
              >
                {marquee.isActive ? (
                  <>
                    <CheckCircle2 size={15} />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle size={15} />
                    Inactive
                  </>
                )}
              </span>
            </div>

            {/* Preview */}
            <div className={styles.previewSection}>
              <div className={styles.previewLabel}>
                LIVE PREVIEW
              </div>

              <div className={styles.marqueePreview}>
                <div className={styles.previewTrack}>
                  <span>{marquee.text}</span>
                  <span className={styles.separator}></span>
                  <span>{marquee.text}</span>
                  <span className={styles.separator}></span>
                  <span>{marquee.text}</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <label>Marquee Text</label>

                <div className={styles.detailBox}>
                  {marquee.text}
                </div>
              </div>

              <div className={styles.detailItem}>
                <label>Link</label>

                <div className={styles.detailBox}>
                  {marquee.link ? (
                    <a
                      href={marquee.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkValue}
                    >
                      {marquee.link}

                      <ExternalLink size={15} />
                    </a>
                  ) : (
                    <span className={styles.muted}>
                      No link added
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.detailItem}>
                <label>Created</label>

                <div className={styles.detailBox}>
                  {new Date(
                    marquee.createdAt
                  ).toLocaleString("en-IN")}
                </div>
              </div>

              <div className={styles.detailItem}>
                <label>Last Updated</label>

                <div className={styles.detailBox}>
                  {new Date(
                    marquee.updatedAt
                  ).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.cardFooter}>
              <div className={styles.footerLeft}>
                <button
                  onClick={toggleStatus}
                  className={
                    marquee.isActive
                      ? styles.deactivateBtn
                      : styles.activateBtn
                  }
                >
                  {marquee.isActive ? (
                    <>
                      <XCircle size={17} />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Activate
                    </>
                  )}
                </button>
              </div>

              <div className={styles.footerActions}>
                <button
                  onClick={openEditModal}
                  className={styles.editBtn}
                >
                  <Edit3 size={17} />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={styles.deleteBtn}
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={17}
                        className={styles.spin}
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={17} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 40,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 40,
              }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2>
                    {marquee
                      ? "Edit Marquee"
                      : "Create Marquee"}
                  </h2>

                  <p>
                    Configure the announcement displayed on
                    your website.
                  </p>
                </div>

                <button
                  className={styles.closeBtn}
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>
                    Marquee Text
                    <span>*</span>
                  </label>

                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter announcement text..."
                    maxLength={500}
                    rows={5}
                    className={styles.textarea}
                  />

                  <small>
                    {text.length}/500 characters
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Link
                    <small>Optional</small>
                  </label>

                  <div className={styles.inputWrapper}>
                    <LinkIcon size={18} />

                    <input
                      type="url"
                      value={link}
                      onChange={(e) =>
                        setLink(e.target.value)
                      }
                      placeholder="https://example.com"
                      className={styles.input}
                    />
                  </div>

                  <small>
                    Users will be redirected to this link when
                    they click the marquee.
                  </small>
                </div>

                <div className={styles.statusControl}>
                  <div>
                    <strong>Marquee Status</strong>

                    <p>
                      Enable this to display the marquee on
                      the website.
                    </p>
                  </div>

                  <button
                    type="button"
                    className={`${styles.switch} ${
                      isActive ? styles.switchActive : ""
                    }`}
                    onClick={() =>
                      setIsActive((prev) => !prev)
                    }
                  >
                    <span />
                  </button>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.cancelBtn}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className={styles.saveBtn}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className={styles.spin}
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                     
                      {marquee
                        ? "Update Marquee"
                        : "Create Marquee"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}