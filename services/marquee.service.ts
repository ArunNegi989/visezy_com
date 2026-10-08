import api from "@/lib/axios";

export interface MarqueeData {
  _id: string;
  text: string;
  link?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MarqueeResponse {
  success: boolean;
  data: MarqueeData | null;
  message?: string;
}

export const getMarquee =
  async (): Promise<MarqueeData | null> => {
    const response =
      await api.get<MarqueeResponse>(
        "/marquee"
      );

    return response.data.data;
  };

export const getAdminMarquee =
  async (): Promise<MarqueeData | null> => {
    const response =
      await api.get<MarqueeResponse>(
        "/marquee/admin"
      );

    return response.data.data;
  };

export const createMarquee = async (
  data: {
    text: string;
    link?: string;
    isActive: boolean;
  }
) => {
  const response = await api.post(
    "/marquee",
    data
  );

  return response.data;
};

export const updateMarquee = async (
  id: string,
  data: {
    text: string;
    link?: string;
    isActive: boolean;
  }
) => {
  const response = await api.put(
    `/marquee/${id}`,
    data
  );

  return response.data;
};

export const deleteMarquee = async (
  id: string
) => {
  const response = await api.delete(
    `/marquee/${id}`
  );

  return response.data;
};