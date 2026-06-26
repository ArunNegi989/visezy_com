import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// ===============================
// CREATE SLIDER
// ===============================

export const createSlider = async (
  formData: FormData
) => {
  const { data } = await axios.post(
    `${API}/api/sliders`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ===============================
// GET ALL SLIDERS
// ===============================

export const getSliders = async () => {
  const { data } = await axios.get(
    `${API}/api/sliders`
  );

  return data;
};

// ===============================
// GET SLIDER BY ID
// ===============================

export const getSliderById = async (
  id: string
) => {
  const { data } = await axios.get(
    `${API}/api/sliders/id/${id}`
  );

  return data;
};

// ===============================
// UPDATE SLIDER
// ===============================

export const updateSlider = async (
  id: string,
  formData: FormData
) => {
  const { data } = await axios.put(
    `${API}/api/sliders/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ===============================
// DELETE SLIDER
// ===============================

export const deleteSlider = async (
  id: string
) => {
  const { data } = await axios.delete(
    `${API}/api/sliders/${id}`
  );

  return data;
};

// ===============================
// MOVE UP
// ===============================

export const moveSliderUp = async (
  id: string
) => {
  const { data } = await axios.patch(
    `${API}/api/sliders/${id}/move-up`
  );

  return data;
};

// ===============================
// MOVE DOWN
// ===============================

export const moveSliderDown = async (
  id: string
) => {
  const { data } = await axios.patch(
    `${API}/api/sliders/${id}/move-down`
  );

  return data;
};