import axiosInstance from "../utils/axiosInstance";

export const getMessages = async (user1, user2) => {
  try {
    const res = await axiosInstance.get(`/messages/${user1}/${user2}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const res = await axiosInstance.post("/messages", {
      sender_profile_id: senderId,
      receiver_profile_id: receiverId,
      text: content,
    });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const updateMessage = async ({ id, data }) => {
  try {
    const res = await axiosInstance.put(`/messages/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await axiosInstance.delete(`/messages/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};
