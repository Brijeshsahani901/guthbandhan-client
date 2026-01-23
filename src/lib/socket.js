// // import { io } from 'socket.io-client';
// // export const socket = io('http://localhost:5173');


// import { io } from "socket.io-client";

// // Socket connection state
// let socket = null;
// let isConnected = false;
// let profileId = null;

// // Event listeners storage
// const listeners = {
//   connect: [],
//   disconnect: [],
//   receive_message: [],
//   message_sent: [],
//   interest_accepted: [],
//   user_typing: [],
//   messages_read: [],
//   error: [],
//   registered: []
// };

// // Initialize socket connection
// export const initSocket = (userProfileId) => {
//   if (socket && isConnected) {
//     console.log("Socket already connected");
//     return socket;
//   }

//   if (!userProfileId) {
//     console.error("Profile ID is required");
//     return null;
//   }

//   profileId = userProfileId;
  
//   const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;
  
//   socket = io(SOCKET_URL, {
//     path: "/socket.io/",
//     transports: ["websocket", "polling"],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//     timeout: 20000,
//     autoConnect: true
//   });

//   // Setup event listeners
//   setupSocketListeners();
  
//   return socket;
// };

// // Setup all socket event listeners
// const setupSocketListeners = () => {
//   if (!socket) return;

//   socket.on("connect", () => {
//     console.log("✅ Socket connected:", socket.id);
//     isConnected = true;
    
//     // Register user with server
//     socket.emit("register", profileId);
    
//     // Trigger connect listeners
//     listeners.connect.forEach(callback => callback({ socketId: socket.id, profileId }));
//   });

//   socket.on("registered", (data) => {
//     console.log("🔗 Registered with server:", data);
//     listeners.registered.forEach(callback => callback(data));
//   });

//   socket.on("receive_message", (message) => {
//     console.log("📩 Received message:", message);
//     listeners.receive_message.forEach(callback => callback(message));
//   });

//   socket.on("message_sent", (confirmation) => {
//     console.log("✅ Message sent confirmation:", confirmation);
//     listeners.message_sent.forEach(callback => callback(confirmation));
//   });

//   socket.on("interest_accepted", (data) => {
//     console.log("💖 Interest accepted:", data);
//     listeners.interest_accepted.forEach(callback => callback(data));
//   });

//   socket.on("user_typing", (data) => {
//     listeners.user_typing.forEach(callback => callback(data));
//   });

//   socket.on("messages_read", (data) => {
//     console.log("👁️ Messages read:", data);
//     listeners.messages_read.forEach(callback => callback(data));
//   });

//   socket.on("user_offline", (data) => {
//     console.log("📴 User went offline:", data);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log("🔴 Socket disconnected:", reason);
//     isConnected = false;
//     listeners.disconnect.forEach(callback => callback({ reason }));
//   });

//   socket.on("error", (error) => {
//     console.error("Socket error:", error);
//     listeners.error.forEach(callback => callback(error));
//   });

//   socket.on("connect_error", (error) => {
//     console.error("Connection error:", error);
//     listeners.error.forEach(callback => callback(error));
//   });
// };

// // Send message function

const sendMessage = (messageData) => {
  if (!socket || !isConnected) {
    console.error("Socket not connected");
    return false;
  }

  const { senderId, receiverId, text } = messageData;
  
  if (!senderId || !receiverId || !text) {
    console.error("Invalid message data");
    return false;
  }

  const data = {
    senderId,
    receiverId,
    text,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };

  socket.emit("send_message", data);
  return true;
};




// // Join conversation room
// export const joinConversation = (userId, otherUserId) => {
//   if (!socket || !isConnected) return;
  
//   socket.emit("join_conversation", { userId, otherUserId });
// };

// // Leave conversation room
// export const leaveConversation = (userId, otherUserId) => {
//   if (!socket || !isConnected) return;
  
//   socket.emit("leave_conversation", { userId, otherUserId });
// };

// // Send typing indicator
// export const sendTypingIndicator = (userId, otherUserId, isTyping) => {
//   if (!socket || !isConnected) return;
  
//   socket.emit("typing", { userId, otherUserId, isTyping });
// };

// // Mark messages as read
// export const markMessagesAsRead = (userId, otherUserId, messageIds) => {
//   if (!socket || !isConnected) return;
  
//   socket.emit("mark_read", { userId, otherUserId, messageIds });
// };

// // Notify interest acceptance
// export const notifyInterestAccepted = (fromUserId, toUserId, profileData) => {
//   if (!socket || !isConnected) return;
  
//   socket.emit("interest_accepted", {
//     fromUserId,
//     toUserId,
//     profile: profileData
//   });
// };

// // Add event listener


const onSocketEvent = (event, callback) => {
  if (listeners[event]) {
    listeners[event].push(callback);
  } else {
    console.warn(`Unknown socket event: ${event}`);
  }
};

// // Remove event listener
 const offSocketEvent = (event, callback) => {
  if (listeners[event]) {
    const index = listeners[event].indexOf(callback);
    if (index > -1) {
      listeners[event].splice(index, 1);
    }
  }
};

// // Disconnect socket

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    isConnected = false;
    profileId = null;
    
    // Clear all listeners
    Object.keys(listeners).forEach(key => {
      listeners[key] = [];
    });
    
    console.log("Socket disconnected and cleaned up");
  }
};

// // Get current socket status
// export const getSocketStatus = () => ({
//   isConnected,
//   profileId,
//   socketId: socket?.id
// });

// // Check if socket is connected
// export const isSocketConnected = () => isConnected;

// socket.js - Updated (client side)
import { io } from "socket.io-client";

let socket = null;
let isConnected = false;
let profileId = null;

const listeners = {
  connect: [],
  disconnect: [],
  receive_message: [],
  message_sent: [],
  message_updated: [],
  message_deleted: [],
  interest_accepted: [],
  user_typing: [],
  messages_read: [],
  error: [],
  registered: []
};

export const initSocket = (userProfileId) => {
  if (socket && isConnected) {
    console.log("Socket already connected");
    return socket;
  }

  if (!userProfileId) {
    console.error("Profile ID is required");
    return null;
  }

  profileId = userProfileId;
  
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;
  
  socket = io(SOCKET_URL, {
    path: "/socket.io/",
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    autoConnect: true
  });

  setupSocketListeners();
  
  return socket;
};

const setupSocketListeners = () => {
  if (!socket) return;

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
    isConnected = true;
    
    socket.emit("register", profileId);
    
    listeners.connect.forEach(callback => callback({ socketId: socket.id, profileId }));
  });

  socket.on("registered", (data) => {
    console.log("🔗 Registered with server:", data);
    listeners.registered.forEach(callback => callback(data));
  });

  socket.on("receive_message", (message) => {
    console.log("📩 Received message:", message);
    listeners.receive_message.forEach(callback => callback(message));
  });

  socket.on("message_sent", (confirmation) => {
    console.log("✅ Message sent confirmation:", confirmation);
    listeners.message_sent.forEach(callback => callback(confirmation));
  });

  socket.on("message_updated", (message) => {
    console.log("✏️ Message updated:", message);
    // Add event for message updates
  });

  socket.on("message_deleted", (data) => {
    console.log("🗑️ Message deleted:", data);
    // Add event for message deletion
  });

  socket.on("user_typing", (data) => {
    console.log("⌨️ User typing:", data);
    listeners.user_typing.forEach(callback => callback(data));
  });

  socket.on("messages_read", (data) => {
    console.log("👁️ Messages read:", data);
    listeners.messages_read.forEach(callback => callback(data));
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", reason);
    isConnected = false;
    listeners.disconnect.forEach(callback => callback({ reason }));
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
    listeners.error.forEach(callback => callback(error));
  });
};

// Send typing indicator
export const sendTypingIndicator = (userId, otherUserId, isTyping) => {
  if (!socket || !isConnected) return;
  
  socket.emit("typing", { userId, otherUserId, isTyping });
};

export { onSocketEvent, offSocketEvent, sendMessage, disconnectSocket };