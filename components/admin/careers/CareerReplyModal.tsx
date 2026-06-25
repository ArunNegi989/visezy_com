"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { sendCareerReply } from "@/services/career.service";

import styles from "./CareerReplyModal.module.css";

interface Career {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  career: Career;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CareerReplyModal({
  career,
  onClose,
  onSuccess,
}: Props) {
  const [subject, setSubject] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!subject || !message) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await sendCareerReply({
        email: career.email,
        subject,
        message,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);

      onSuccess();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>

          <div>

            <h2>Send Email</h2>

            <p>
              {career.firstName} {career.lastName}
            </p>

          </div>

          <button
            onClick={onClose}
            className={styles.closeBtn}
          >
            <X size={22} />
          </button>

        </div>

        <div className={styles.body}>

          <div className={styles.field}>

            <label>To</label>

            <input
              value={career.email}
              readOnly
            />

          </div>

          <div className={styles.field}>

            <label>Subject</label>

            <input
              placeholder="Email Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            />

          </div>

          <div className={styles.field}>

            <label>Message</label>

            <textarea
              rows={10}
              placeholder="Write your message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

          </div>

        </div>

        <div className={styles.footer}>

          <button
            onClick={onClose}
            className={styles.cancelBtn}
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className={styles.sendBtn}
          >
            {loading ? (
              <>
                <Loader2
                  className={styles.spin}
                  size={18}
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Email
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}