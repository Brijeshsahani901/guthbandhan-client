// import axiosInstance from "../utils/axiosInstance";

// export const getMessages = async (user1, user2) => {
//   try {
//     const res = await axiosInstance.get(`/messages/${user1}/${user2}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     throw error; // Re-throw the error so the caller can handle it
//   }
// };

// export const sendMessage = async (senderId, receiverId, content) => {
//   try {
//     const res = await axiosInstance.post("/messages", {
//       sender_profile_id: senderId,
//       receiver_profile_id: receiverId,
//       text: content,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error sending message:", error);
//     throw error;
//   }
// };

// export const updateMessage = async ({ id, data }) => {
//   try {
//     const res = await axiosInstance.put(`/messages/${id}`, data);
//     return res.data;
//   } catch (error) {
//     console.error("Error updating message:", error);
//     throw error;
//   }
// };

// export const deleteMessage = async (id) => {
//   try {
//     const res = await axiosInstance.delete(`/messages/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting message:", error);
//     throw error;
//   }
// };

// export const getAcceptedConnections = async () => {
//   console.log("getaccepted run");
//   const response = await axiosInstance.get(`/messages/connections`);
//   console.log(response);
//   return response.data;
// };

// // Mark messages as read
// export const markMessagesAsRead = async (conversationId) => {
//   const response = await axiosInstance.post(
//     `/messages/${conversationId}/read`,
//     {}
//   );
//   return response.data;
// };



// message.api.js - Updated
import axiosInstance from "../utils/axiosInstance";

export const getMessages = async (user1, user2) => {
  try {
    const res = await axiosInstance.get(`/messages/${user1}/${user2}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (senderId, receiverId, content, file = null) => {
  try {
    const formData = new FormData();
    formData.append('sender_profile_id', senderId);
    formData.append('receiver_profile_id', receiverId);
    formData.append('text', content);
    
    if (file) {
      formData.append('file', file);
    }

    const res = await axiosInstance.post("/messages", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const updateMessage = async ({ id, text }) => {
  try {
    const res = await axiosInstance.put(`/messages/${id}`, { text });
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

export const getAcceptedConnections = async () => {
  const response = await axiosInstance.get(`/messages/connections`);
  return response.data;
};

export const markMessagesAsRead = async (conversationId) => {
  const response = await axiosInstance.post(
    `/messages/${conversationId}/read`,
    {}
  );
  return response.data;
};

export const sendTypingIndicator = async (senderId, receiverId, isTyping) => {
  try {
    const response = await axiosInstance.post("/messages/typing", {
      sender_profile_id: senderId,
      receiver_profile_id: receiverId,
      isTyping
    });
    return response.data;
  } catch (error) {
    console.error("Error sending typing indicator:", error);
  }
};