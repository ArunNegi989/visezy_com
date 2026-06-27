import {
  BookOpen,
  Images,
  Mail,
  Eye,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import styles from "./page.module.css";

const stats = [
  {
    title: "Total Blogs",
    value: "24",
    icon: BookOpen,
    color: "#2563eb",
    change: "+8%",
  },
  {
    title: "Hero Slides",
    value: "5",
    icon: Images,
    color: "#7c3aed",
    change: "+2",
  },
  {
    title: "Contact Leads",
    value: "31",
    icon: Mail,
    color: "#10b981",
    change: "+14%",
  },
  {
    title: "Website Views",
    value: "18.4K",
    icon: Eye,
    color: "#f97316",
    change: "+21%",
  },
];

const blogs = [
  {
    title: "Best Health Insurance",
    category: "Health",
    status: "Published",
    date: "24 Jun 2026",
  },
  {
    title: "Car Insurance Guide",
    category: "Motor",
    status: "Draft",
    date: "22 Jun 2026",
  },
  {
    title: "Life Insurance Benefits",
    category: "Life",
    status: "Published",
    date: "20 Jun 2026",
  },
];

export default function AdminDashboard() {
  return (
    <div className={styles.wrapper}>
      {/* Header */}

      <div className={styles.heading}>
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back. Here's what's happening today.
          </p>
        </div>

        <button className={styles.primaryBtn}>
          <ArrowUpRight size={18} />
          Quick Action
        </button>
      </div>

      {/* Stats */}

      <div className={styles.statsGrid}>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={styles.card}
            >
              <div
                className={styles.icon}
                style={{
                  background: item.color,
                }}
              >
                <Icon size={22} />
              </div>

              <span>{item.title}</span>

              <h2>{item.value}</h2>

              <small>{item.change} this month</small>
            </div>
          );
        })}
      </div>

      {/* Bottom */}

      <div className={styles.bottom}>
        {/* Recent Blogs */}

        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h3>Recent Blogs</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.title}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>
                    <span
                      className={
                        blog.status === "Published"
                          ? styles.publish
                          : styles.draft
                      }
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td>{blog.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity */}

        <div className={styles.activity}>
          <h3>Recent Activity</h3>

          <div className={styles.timeline}>
            <Clock3 size={18} />

            <div>
              <strong>
                New Blog Published
              </strong>

              <p>
                Health Insurance Guide
              </p>

              <span>10 mins ago</span>
            </div>
          </div>

          <div className={styles.timeline}>
            <Clock3 size={18} />

            <div>
              <strong>
                New Contact Lead
              </strong>

              <p>
                Rahul Patel submitted contact form.
              </p>

              <span>35 mins ago</span>
            </div>
          </div>

          <div className={styles.timeline}>
            <Clock3 size={18} />

            <div>
              <strong>
                Hero Banner Updated
              </strong>

              <p>
                Homepage Slider modified.
              </p>

              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}