export interface DashboardStats {
  blogs: number;
  slides: number;
  contacts: number;
  careers: number;
  unreadContacts: number;
  publishedBlogs: number;
  draftBlogs: number;
  growth: number;
  views: number;
}

export interface RecentBlog {
  _id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  createdAt: string;
}

export interface Activity {
  type: "blog" | "contact" | "slider";
  title: string;
  description: string;
  createdAt: string;
}

export interface Analytics {
  blogs: {
    published: number;
    draft: number;
  };

  contacts: {
    total: number;
    unread: number;
  };

  careers: number;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentBlogs: RecentBlog[];
  activities: Activity[];
  analytics: Analytics;
}

import api from "@/lib/axios";

export const getDashboard = async () => {
  const { data } = await api.get("/api/dashboard");
  return data;
};