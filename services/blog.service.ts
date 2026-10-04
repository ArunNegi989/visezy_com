import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// ==============================
// CREATE BLOG
// ==============================

export const createBlog = async (formData: FormData) => {
  const { data } = await axios.post(
    `${API}/api/blogs`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ==============================
// UPDATE BLOG
// ==============================

export const updateBlog = async (
  id: string,
  formData: FormData
) => {
  const { data } = await axios.put(
    `${API}/api/blogs/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ==============================
// GET ALL BLOGS (USER)
// ==============================

interface GetBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
}

export const getBlogs = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  featured = false,
}: GetBlogsParams = {}) => {
  const { data } = await axios.get(`${API}/api/blogs`, {
    params: {
      page,
      limit,
      search,
      category,
      featured,
    },
  });

  return data;
};

// ==============================
// GET FEATURED BLOG
// ==============================

export const getFeaturedBlog = async () => {
  const { data } = await axios.get(`${API}/api/blogs`, {
    params: {
      featured: true,
      limit: 1,
    },
  });

  return data.blogs?.[0] || null;
};

// ==============================
// GET BLOG BY SLUG
// ==============================

export const getBlogBySlug = async (slug: string) => {
  const { data } = await axios.get(
    `${API}/api/blogs/${slug}`
  );

  return data.blog;
};

// ==============================
// GET BLOG BY ID (ADMIN)
// ==============================

export const getBlogById = async (id: string) => {
  const { data } = await axios.get(
    `${API}/api/blogs/admin/${id}`
  );

  return data;
};

// ==============================
// DELETE BLOG
// ==============================

export const deleteBlog = async (id: string) => {
  const { data } = await axios.delete(
    `${API}/api/blogs/${id}`
  );

  return data;
};


export const getBlogFilters = async () => {
  const { data } = await axios.get(
    `${API}/api/blogs/filters`
  );

  return data;
};