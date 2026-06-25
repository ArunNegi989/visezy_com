const API = `${process.env.NEXT_PUBLIC_API_URL}/api/career`;

export interface ReplyPayload {
  email: string;
  subject: string;
  message: string;
}

// ==========================
// CREATE CAREER
// ==========================

export const createCareer = async (
  payload: FormData
) => {
  const response = await fetch(API, {
    method: "POST",
    body: payload,
  });

  return response.json();
};

// ==========================
// GET ALL CAREERS
// ==========================

export const getCareers = async () => {
  const response = await fetch(API);

  return response.json();
};

// ==========================
// GET SINGLE CAREER
// ==========================

export const getCareer = async (
  id: string
) => {
  const response = await fetch(
    `${API}/${id}`
  );

  return response.json();
};

// ==========================
// UPDATE STATUS
// ==========================

export const updateCareerStatus =
  async (
    id: string,
    status: string
  ) => {
    const response = await fetch(
      `${API}/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    return response.json();
  };

// ==========================
// DELETE CAREER
// ==========================

export const deleteCareer =
  async (id: string) => {
    const response = await fetch(
      `${API}/${id}`,
      {
        method: "DELETE",
      }
    );

    return response.json();
  };

// ==========================
// SEND EMAIL
// ==========================

export const sendCareerReply =
  async (
    payload: ReplyPayload
  ) => {
    const response = await fetch(
      `${API}/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return response.json();
  };