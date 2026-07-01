"use client";

import { useEffect, useState } from "react";

import {
  BookOpen,
  Images,
  Mail,
  Eye,
  Clock3,
  BriefcaseBusiness,
  FileText,
  BadgeAlert,
  Users,
} from "lucide-react";

import {
  getDashboard,
  DashboardStats,
  RecentBlog,
  Activity,
  Analytics,
} from "@/services/dashboard.service";

import styles from "./page.module.css";

export default function AdminDashboard() {
  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    blogs: 0,
    slides: 0,
    contacts: 0,
    careers: 0,
    unreadContacts: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    growth: 0,
    views: 0,
  });
  const [blogs, setBlogs] =
    useState<RecentBlog[]>([]);

  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const data = await getDashboard();

        setStats(data.stats);

        setBlogs(data.recentBlogs);

        setActivities(data.activities);
        setAnalytics(data.analytics);
      } catch (err) {

        console.log(err);

        setError("Unable to load dashboard.");

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  const statsData = [
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: BookOpen,
      color: "#2563eb",
      extra: `${stats.publishedBlogs} Published`,
    },

    {
      title: "Hero Slides",
      value: stats.slides,
      icon: Images,
      color: "#7c3aed",
      extra: "Live",
    },

    {
      title: "Contact Leads",
      value: stats.contacts,
      icon: Mail,
      color: "#10b981",
      extra: `${stats.unreadContacts} Unread`,
    },

    {
      title: "Website Views",
      value: stats.views.toLocaleString(),
      icon: Eye,
      color: "#f97316",
      extra:
        stats.growth >= 0
          ? `+${stats.growth}%`
          : `${stats.growth}%`,
    },
  ];


  const analyticsData = [
    {
      title: "Published Blogs",
      value: analytics?.blogs.published ?? 0,
      icon: FileText,
      color: "#2563eb",
    },
    {
      title: "Draft Blogs",
      value: analytics?.blogs.draft ?? 0,
      icon: Images,
      color: "#f59e0b",
    },
    {
      title: "Unread Contacts",
      value: analytics?.contacts.unread ?? 0,
      icon: BadgeAlert,
      color: "#ef4444",
    },
    {
      title: "Career Applications",
      value: analytics?.careers ?? 0,
      icon: BriefcaseBusiness,
      color: "#7c3aed",
    },
  ];

  if (loading) {

    return (

      <div className={styles.wrapper}>

        Loading Dashboard...

      </div>

    );

  }
  if (error) {

    return (

      <div className={styles.wrapper}>

        {error}

      </div>

    );

  }

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
      </div>

      {/* Stats */}

      <div className={styles.statsGrid}>
        {statsData.map((item) => {
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

              <small
                style={{
                  color:
                    stats.growth >= 0
                      ? "#10b981"
                      : "#ef4444",
                }}
              >
                {item.extra}
              </small>
            </div>
          );
        })}
      </div>

      <div className={styles.analyticsGrid}>
        {analyticsData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={styles.analyticsCard}
            >
              <div
                className={styles.analyticsIcon}
                style={{
                  background: item.color,
                }}
              >
                <Icon size={20} />
              </div>

              <div>
                <h4>{item.title}</h4>
                <h2>{item.value}</h2>
              </div>
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

                <tr key={blog._id}>

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

                  <td>

                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {

                      day: "2-digit",

                      month: "short",

                      year: "numeric",

                    })}

                  </td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>

        {/* Activity */}

        <div className={styles.activity}>
          <h3>Recent Activity</h3>

          {activities.map((item, index) => (

            <div
              key={index}
              className={styles.timeline}
            >

              <Clock3 size={18} />

              <div>

                <strong>

                  {item.title}

                </strong>

                <p>

                  {item.description}

                </p>

                <span>

                  {new Date(item.createdAt).toLocaleString()}

                </span>

              </div>

            </div>

          ))}

        </div>
      </div>
    </div>
  );
}