"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import styles from "./DeleteCareerModal.module.css";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteCareerModal({
  onCancel,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          initial={{
            scale: 0.9,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <div className={styles.icon}>
            <AlertTriangle size={44} />
          </div>

          <h2>Delete Application?</h2>

          <p>
            This action cannot be undone.
            The application and uploaded
            resume will be permanently
            deleted.
          </p>

          <div className={styles.actions}>
            <button
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className={styles.deleteBtn}
              onClick={onConfirm}
            >
              Delete Application
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}