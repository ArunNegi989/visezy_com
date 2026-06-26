const API = `${process.env.NEXT_PUBLIC_API_URL}/api/contact`;

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

export interface ReplyPayload {
  email: string;
  subject: string;
  message: string;
}

// ==========================
// CREATE CONTACT
// ==========================

export const createContact = async (
  payload: ContactPayload
) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

// ==========================
// GET ALL CONTACTS
// ==========================

export const getContacts = async () => {
  const response = await fetch(API);

  return response.json();
};

// ==========================
// GET SINGLE CONTACT
// ==========================

export const getContact = async (id: string) => {
  const response = await fetch(`${API}/${id}`);

  return response.json();
};

// ==========================
// MARK AS READ
// ==========================
export const markAsRead = async (id: string) => {
  console.log("Calling:", `${API}/${id}/read`);

  const response = await fetch(`${API}/${id}/read`, {
    method: "PATCH",
  });

  console.log("Status:", response.status);

  const data = await response.json();

  console.log(data);

  return data;
};
// ==========================
// DELETE CONTACT
// ==========================

export const deleteContact = async (
  id: string
) => {
  const response = await fetch(
    `${API}/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

// ==========================
// SEND REPLY EMAIL
// ==========================

export const sendReply = async (
  payload: ReplyPayload
) => {
  const response = await fetch(
    `${API}/send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};