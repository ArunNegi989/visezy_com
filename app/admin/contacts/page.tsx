"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Filter,
    Eye,
    Mail,
    Trash2,
    RefreshCw,
    Users,
    Inbox,
    Calendar,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import styles from "./page.module.css";
import { getContacts, markAsRead } from "@/services/contact.service";

interface Contact {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    const [selectedContact, setSelectedContact] =
        useState<Contact | null>(null);

    const [showViewModal, setShowViewModal] = useState(false);

    const [showReplyModal, setShowReplyModal] = useState(false);

    const [replySubject, setReplySubject] = useState("");

    const [replyMessage, setReplyMessage] = useState("");

    const [sending, setSending] = useState(false);

    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    const fetchContacts = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setContacts(data.contacts || []);
            setFilteredContacts(data.contacts || []);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const totalContacts = contacts.length;

    const unreadContacts = contacts.filter(
        (item) => !item.isRead
    ).length;

    const todayContacts = contacts.filter((item) => {
        const today = new Date().toDateString();
        return (
            new Date(item.createdAt).toDateString() === today
        );
    }).length;

    const thisWeekContacts = contacts.filter((item) => {
        const now = new Date();

        const created = new Date(item.createdAt);

        const diff =
            (now.getTime() - created.getTime()) /
            (1000 * 60 * 60 * 24);

        return diff <= 7;
    }).length;

    useEffect(() => {
        let temp = [...contacts];

        if (search) {
            temp = temp.filter((item) =>
                [
                    item.fullName,
                    item.email,
                    item.phone,
                    item.company,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (filter === "unread") {
            temp = temp.filter((item) => !item.isRead);
        }

        if (filter === "today") {
            temp = temp.filter((item) => {
                return (
                    new Date(item.createdAt).toDateString() ===
                    new Date().toDateString()
                );
            });
        }

        if (filter === "week") {
            temp = temp.filter((item) => {
                const diff =
                    (Date.now() -
                        new Date(item.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24);

                return diff <= 7;
            });
        }

        setFilteredContacts(temp);

        setPage(1);
    }, [contacts, search, filter]);

    const totalPages = Math.ceil(
        filteredContacts.length / ITEMS_PER_PAGE
    );

    const currentContacts = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;

        return filteredContacts.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [filteredContacts, page]);

    const refreshContacts = () => {
        fetchContacts();
    };

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Contact Enquiries</h1>
                    <p className={styles.subtitle}>
                        Manage customer enquiries, view details and reply directly from the
                        dashboard.
                    </p>
                </div>

                <button
                    onClick={refreshContacts}
                    className={styles.refreshBtn}
                >
                    <RefreshCw size={18} />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <motion.div
                    whileHover={{ y: -4 }}
                    className={styles.statCard}
                >
                    <div className={styles.statIcon}>
                        <Users size={24} />
                    </div>

                    <div>
                        <h4>Total Contacts</h4>
                        <h2>{totalContacts}</h2>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className={styles.statCard}
                >
                    <div className={styles.statIconBlue}>
                        <Inbox size={24} />
                    </div>

                    <div>
                        <h4>Unread</h4>
                        <h2>{unreadContacts}</h2>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className={styles.statCard}
                >
                    <div className={styles.statIconGreen}>
                        <Calendar size={24} />
                    </div>

                    <div>
                        <h4>Today</h4>
                        <h2>{todayContacts}</h2>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    className={styles.statCard}
                >
                    <div className={styles.statIconOrange}>
                        <Mail size={24} />
                    </div>

                    <div>
                        <h4>This Week</h4>
                        <h2>{thisWeekContacts}</h2>
                    </div>
                </motion.div>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search by name, email, phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={styles.filterBox}>
                    <Filter size={18} />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Contacts</option>

                        <option value="unread">Unread</option>

                        <option value="today">Today</option>

                        <option value="week">This Week</option>
                    </select>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className={styles.loadingWrapper}>
                    <Loader2
                        size={40}
                        className={styles.loader}
                    />

                    <p>Loading contacts...</p>
                </div>
            ) : (
                <><div className={styles.tableWrapper}>
                    {currentContacts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Inbox size={60} />
                            <h3>No Contacts Found</h3>
                            <p>No contact enquiries match your search.</p>
                        </div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentContacts.map((contact) => (
                                    <motion.tr
                                        key={contact._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{
                                            backgroundColor: "#f8fafc",
                                        }}
                                    >
                                        <td>
                                            <div className={styles.userInfo}>
                                                <strong>{contact.fullName}</strong>

                                                <small>
                                                    {contact.message.length > 45
                                                        ? contact.message.substring(0, 45) + "..."
                                                        : contact.message}
                                                </small>
                                            </div>
                                        </td>

                                        <td>{contact.email}</td>

                                        <td>{contact.phone}</td>

                                        <td>{contact.company || "-"}</td>

                                        <td>
                                            <span
                                                className={
                                                    contact.isRead
                                                        ? styles.readBadge
                                                        : styles.unreadBadge
                                                }
                                            >
                                                {contact.isRead ? "Read" : "Unread"}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(
                                                contact.createdAt
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.viewBtn}
                                                    title="View Details"
                                                   onClick={async () => {
  try {
    const data = await markAsRead(contact._id);

    if (!data.success) {
      throw new Error(data.message);
    }

    await fetchContacts();

    setSelectedContact({
      ...contact,
      isRead: true,
    });

    setShowViewModal(true);
  } catch (err: any) {
    toast.error(err.message);
  }
}}
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    className={styles.replyBtn}
                                                    title="Reply"
                                                    onClick={() => {
                                                        setSelectedContact(contact);
                                                        setReplySubject(
                                                            "Reply from Visezy"
                                                        );
                                                        setReplyMessage("");
                                                        setShowReplyModal(true);
                                                    }}
                                                >
                                                    <Mail size={18} />
                                                </button>

                                                <button
                                                    className={styles.deleteBtn}
                                                    title="Delete"
                                                    onClick={async () => {
                                                        if (
                                                            !confirm(
                                                                "Delete this contact?"
                                                            )
                                                        )
                                                            return;

                                                        try {
                                                            const res = await fetch(
                                                                `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${contact._id}`,
                                                                {
                                                                    method: "DELETE",
                                                                }
                                                            );

                                                            const data =
                                                                await res.json();

                                                            if (!res.ok)
                                                                throw new Error(
                                                                    data.message
                                                                );

                                                            toast.success(
                                                                "Contact deleted."
                                                            );

                                                            fetchContacts();
                                                        } catch (err: any) {
                                                            toast.error(
                                                                err.message
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                    {/* Mobile Cards */}

                    <div className={styles.mobileCards}>
                        {currentContacts.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Inbox size={50} />
                                <h3>No Contacts Found</h3>
                            </div>
                        ) : (
                            currentContacts.map((contact) => (
                                <motion.div
                                    key={contact._id}
                                    layout
                                    whileHover={{ y: -3 }}
                                    className={styles.mobileCard}
                                >
                                    <div className={styles.mobileHeader}>
                                        <div>
                                            <h3>{contact.fullName}</h3>
                                            <span>{contact.company || "Individual"}</span>
                                        </div>

                                        {contact.isRead ? (
                                            <span className={styles.readBadge}>
                                                Read
                                            </span>
                                        ) : (
                                            <span className={styles.unreadBadge}>
                                                Unread
                                            </span>
                                        )}
                                    </div>

                                    <div className={styles.mobileBody}>
                                        <p>
                                            <strong>Email</strong>
                                            <span>{contact.email}</span>
                                        </p>

                                        <p>
                                            <strong>Phone</strong>
                                            <span>{contact.phone}</span>
                                        </p>

                                        <p>
                                            <strong>Date</strong>
                                            <span>
                                                {new Date(contact.createdAt).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                        </p>

                                        <p>
                                            <strong>Message</strong>
                                            <span>
                                                {contact.message.length > 80
                                                    ? contact.message.substring(0, 80) + "..."
                                                    : contact.message}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={styles.mobileActions}>
                                        <button
                                            className={styles.viewBtn}
                                            onClick={async () => {
                                                try {
                                                    const data = await markAsRead(contact._id);

                                                    if (!data.success) {
                                                        throw new Error(data.message);
                                                    }

                                                    await fetchContacts();

                                                    setSelectedContact({
                                                        ...contact,
                                                        isRead: true,
                                                    });

                                                    setShowViewModal(true);
                                                } catch (err: any) {
                                                    toast.error(err.message);
                                                }
                                            }}
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            className={styles.replyBtn}

                                            onClick={() => {
                                                setSelectedContact(contact);
                                                setReplySubject("Reply from Visezy");
                                                setReplyMessage("");
                                                setShowReplyModal(true);
                                            }}
                                        >
                                            <Mail size={18} />
                                        </button>

                                        <button
                                            className={styles.deleteBtn}
                                            onClick={async () => {
                                                if (!confirm("Delete this contact?"))
                                                    return;

                                                try {
                                                    const res = await fetch(
                                                        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${contact._id}`,
                                                        {
                                                            method: "DELETE",
                                                        }
                                                    );

                                                    const data = await res.json();

                                                    if (!res.ok)
                                                        throw new Error(data.message);

                                                    toast.success("Deleted successfully");

                                                    fetchContacts();
                                                } catch (err: any) {
                                                    toast.error(err.message);
                                                }
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className={styles.pageBtn}
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPage(index + 1)}
                                        className={`${styles.pageBtn} ${page === index + 1
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
                                onClick={() => setPage((p) => p + 1)}
                                className={styles.pageBtn}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* View Contact Modal */}

                    <AnimatePresence>
                        {showViewModal && selectedContact && (
                            <motion.div
                                className={styles.modalOverlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowViewModal(false)}
                            >
                                <motion.div
                                    className={styles.modal}
                                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 40 }}
                                    transition={{ duration: 0.25 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className={styles.modalHeader}>
                                        <h2>Contact Details</h2>

                                        <button
                                            className={styles.closeBtn}
                                            onClick={() => setShowViewModal(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className={styles.modalBody}>
                                        <div className={styles.infoItem}>
                                            <label>Full Name</label>
                                            <span>{selectedContact.fullName}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <label>Email</label>
                                            <span>{selectedContact.email}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <label>Phone</label>
                                            <span>{selectedContact.phone}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <label>Company</label>
                                            <span>{selectedContact.company || "-"}</span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <label>Date</label>
                                            <span>
                                                {new Date(
                                                    selectedContact.createdAt
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        <div className={styles.messageBox}>
                                            <label>Message</label>

                                            <p>{selectedContact.message}</p>
                                        </div>
                                    </div>

                                    <div className={styles.modalFooter}>
                                        <button
                                            className={styles.modalReplyBtn}
                                            onClick={() => {
                                                setShowViewModal(false);

                                                setReplySubject("Reply from Visezy");

                                                setReplyMessage("");

                                                setShowReplyModal(true);
                                            }}
                                        >
                                            <Mail size={18} />

                                            Reply
                                        </button>

                                        <button
                                            className={styles.closeSecondary}
                                            onClick={() => setShowViewModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Reply Email Modal */}

                    <AnimatePresence>
                        {showReplyModal && selectedContact && (
                            <motion.div
                                className={styles.modalOverlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowReplyModal(false)}
                            >
                                <motion.div
                                    className={styles.emailModal}
                                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                    transition={{ duration: 0.25 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className={styles.modalHeader}>
                                        <h2>Reply to {selectedContact.fullName}</h2>

                                        <button
                                            className={styles.closeBtn}
                                            onClick={() => setShowReplyModal(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className={styles.modalBody}>
                                        <div className={styles.formGroup}>
                                            <label>To</label>

                                            <input
                                                type="email"
                                                value={selectedContact.email}
                                                readOnly
                                                className={styles.input}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Subject</label>

                                            <input
                                                type="text"
                                                value={replySubject}
                                                onChange={(e) =>
                                                    setReplySubject(e.target.value)
                                                }
                                                className={styles.input}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Message</label>

                                            <textarea
                                                rows={10}
                                                value={replyMessage}
                                                onChange={(e) =>
                                                    setReplyMessage(e.target.value)
                                                }
                                                className={styles.textarea}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.modalFooter}>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={() => setShowReplyModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className={styles.sendBtn}
                                            disabled={sending}
                                            onClick={async () => {
                                                if (!replySubject || !replyMessage) {
                                                    toast.error(
                                                        "Please fill subject and message."
                                                    );
                                                    return;
                                                }

                                                try {
                                                    setSending(true);

                                                    const response = await fetch(
                                                        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/send-email`,
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                email: selectedContact.email,
                                                                subject: replySubject,
                                                                message: replyMessage,
                                                            }),
                                                        }
                                                    );

                                                    const data = await response.json();

                                                    if (!response.ok)
                                                        throw new Error(data.message);

                                                    toast.success(
                                                        "Email sent successfully."
                                                    );

                                                    setShowReplyModal(false);

                                                    setReplySubject("");

                                                    setReplyMessage("");
                                                } catch (err: any) {
                                                    toast.error(err.message);
                                                } finally {
                                                    setSending(false);
                                                }
                                            }}
                                        >
                                            {sending ? (
                                                <>
                                                    <Loader2
                                                        size={18}
                                                        className={styles.spin}
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Mail size={18} />
                                                    Send Email
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </>
            )}
        </div>
    );
}
