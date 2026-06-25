"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Filter,
  Briefcase,
  Clock3,
  Eye,
  Mail,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

import { toast } from "react-toastify";

import {
  getCareers,
  deleteCareer,
  updateCareerStatus,
} from "@/services/career.service";

import CareerViewModal from "@/components/admin/careers/CareerViewModal";
import CareerReplyModal from "@/components/admin/careers/CareerReplyModal";
import DeleteCareerModal from "@/components/admin/careers/DeleteCareerModal";

import styles from "./page.module.css";

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

  isRead: boolean;

  createdAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] =
    useState<Career[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [page, setPage] =
    useState(1);

  const perPage = 10;

  const [selectedCareer, setSelectedCareer] =
    useState<Career | null>(null);

  const [replyCareer, setReplyCareer] =
    useState<Career | null>(null);

  const [deleteId, setDeleteId] =
    useState("");

  // ==========================================
  // FETCH CAREERS
  // ==========================================

  const fetchCareers = async () => {
    try {
      setLoading(true);

      const data = await getCareers();

      if (!data.success) {
        throw new Error(data.message);
      }

      setCareers(data.careers);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // ==========================================
  // FILTER
  // ==========================================

  const filtered = useMemo(() => {
    return careers.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.firstName.toLowerCase().includes(keyword) ||
        item.lastName.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.phone.toLowerCase().includes(keyword) ||
        item.currentPosition
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [careers, search, status]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // ==========================================
  // STATS
  // ==========================================

  const stats = {
    total: careers.length,

    pending: careers.filter(
      (x) => x.status === "Pending"
    ).length,

    reviewed: careers.filter(
      (x) => x.status === "Reviewed"
    ).length,

    shortlisted: careers.filter(
      (x) => x.status === "Shortlisted"
    ).length,

    rejected: careers.filter(
      (x) => x.status === "Rejected"
    ).length,
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async () => {
    try {
      const data =
        await deleteCareer(deleteId);

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      setDeleteId("");

      fetchCareers();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ==========================================
  // STATUS
  // ==========================================

  const handleStatus = async (
    id: string,
    value: string
  ) => {
    try {
      const data =
        await updateCareerStatus(
          id,
          value
        );

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      fetchCareers();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>      {/* ===========================
          HEADER
      ============================ */}

      <div className={styles.header}>
        <div>
          <h1>Career Applications</h1>
          <p>
            Manage job applications, review resumes and
            communicate with candidates.
          </p>
        </div>
      </div>

      {/* ===========================
          STATS
      ============================ */}

      <div className={styles.statsGrid}>
        <motion.div
          whileHover={{ y: -5 }}
          className={styles.statCard}
        >
          <div className={styles.statIcon}>
            <Users size={26} />
          </div>

          <div>
            <span>Total Applications</span>
            <h2>{stats.total}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={styles.statCard}
        >
          <div className={`${styles.statIcon} ${styles.pending}`}>
            <Clock3 size={26} />
          </div>

          <div>
            <span>Pending</span>
            <h2>{stats.pending}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={styles.statCard}
        >
          <div className={`${styles.statIcon} ${styles.reviewed}`}>
            <Eye size={26} />
          </div>

          <div>
            <span>Reviewed</span>
            <h2>{stats.reviewed}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={styles.statCard}
        >
          <div className={`${styles.statIcon} ${styles.shortlisted}`}>
            <CheckCircle2 size={26} />
          </div>

          <div>
            <span>Shortlisted</span>
            <h2>{stats.shortlisted}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={styles.statCard}
        >
          <div className={`${styles.statIcon} ${styles.rejected}`}>
            <XCircle size={26} />
          </div>

          <div>
            <span>Rejected</span>
            <h2>{stats.rejected}</h2>
          </div>
        </motion.div>
      </div>

      {/* ===========================
          FILTER BAR
      ============================ */}

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className={styles.filterBox}>
          <Filter size={18} />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>Reviewed</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* ===========================
          TABLE
      ============================ */}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className={styles.loading}
                >
                  Loading applications...
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className={styles.empty}
                >
                  <Briefcase
                    size={42}
                    strokeWidth={1.5}
                  />

                  <h3>No Applications Found</h3>

                  <p>
                    There are no career
                    applications matching
                    your search.
                  </p>
                </td>
              </tr>
            ) : (
              paginated.map((career) => (
                <tr key={career._id}>
                  {/* Candidate */}

                  <td>
                    <div
                      className={
                        styles.userCell
                      }
                    >
                      <div
                        className={
                          styles.avatar
                        }
                      >
                        {career.firstName
                          .charAt(0)}
                        {career.lastName.charAt(
                          0
                        )}
                      </div>

                      <div>
                        <h4>
                          {
                            career.firstName
                          }{" "}
                          {
                            career.lastName
                          }
                        </h4>

                        <span>
                          {career.email}
                        </span>

                        <small>
                          {career.phone}
                        </small>
                      </div>
                    </div>
                  </td>

                  {/* Position */}

                  <td>
                    {
                      career.currentPosition
                    }
                  </td>

                  {/* Resume */}

                  <td>
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}${career.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        styles.resumeBtn
                      }
                    >
                      <Download size={16} />
                      Resume
                    </a>
                  </td>

                  {/* Status */}

                  <td>
                    <select
                      value={career.status}
                      onChange={(e) =>
                        handleStatus(
                          career._id,
                          e.target.value
                        )
                      }
                      className={`${styles.statusSelect} ${
                        styles[
                          career.status.toLowerCase()
                        ]
                      }`}
                    >
                      <option>
                        Pending
                      </option>

                      <option>
                        Reviewed
                      </option>

                      <option>
                        Shortlisted
                      </option>

                      <option>
                        Rejected
                      </option>
                    </select>
                  </td>

                  {/* Date */}

                  <td>
                    {new Date(
                      career.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* Actions */}

                  <td>
                    <div
                      className={
                        styles.actions
                      }
                    >
                      <button
                        onClick={() =>
                          setSelectedCareer(
                            career
                          )
                        }
                        className={
                         `${styles.iconBtn} ${styles.viewBtn}`
                        }
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setReplyCareer(
                            career
                          )
                        }
                        className={
                          `${styles.iconBtn} ${styles.replyBtn}`
                        }
                        title="Reply"
                      >
                        <Mail size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteId(
                            career._id
                          )
                        }
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        title="Delete"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>      {/* ===========================
          PAGINATION
      ============================ */}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={styles.pageBtn}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPage(index + 1)
                }
                className={`${styles.pageBtn} ${
                  page === index + 1
                    ? styles.activePage
                    : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((p) => p + 1)
            }
            className={styles.pageBtn}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ===========================
          VIEW MODAL
      ============================ */}

      {selectedCareer && (
        <CareerViewModal
          career={selectedCareer}
          onClose={() =>
            setSelectedCareer(null)
          }
        />
      )}

      {/* ===========================
          EMAIL MODAL
      ============================ */}

      {replyCareer && (
        <CareerReplyModal
          career={replyCareer}
          onClose={() =>
            setReplyCareer(null)
          }
          onSuccess={() => {
            toast.success(
              "Email sent successfully."
            );

            setReplyCareer(null);
          }}
        />
      )}

      {/* ===========================
          DELETE MODAL
      ============================ */}

      {!!deleteId && (
        <DeleteCareerModal
          onCancel={() =>
            setDeleteId("")
          }
          onConfirm={handleDelete}
        />
      )}
  
      </div></div>
  );
}