// import { useEffect, useState, useRef, useCallback, useMemo } from "react";
// import { motion } from "framer-motion";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { formatDate } from "../../utils/formatters";
// import {
//   getAcceptedConnections,
//   getMessages,
//   sendMessage as sendMessageApi,
// } from "../../api/message.api";
// import {
//   initSocket,
//   onSocketEvent,
//   offSocketEvent,
//   sendMessage,
//   joinConversation,
//   leaveConversation,
//   sendTypingIndicator,
//   markMessagesAsRead as markMessagesAsReadSocket,
// } from "../../lib/socket";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { FiEye, FiCheck, FiCheckCircle } from "react-icons/fi";
// import { toast } from "react-toastify";

// const Messages = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const scrollRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const baseurl = import.meta.env.VITE_BASE_URL;

//   const selectedConversationId = selectedConversation?.id;

//   /* ------------------ CONNECTIONS ------------------ */
//   const {
//     data: connectionsData = { profiles: [] },
//     isLoading,
//     isError,
//     error,
//     refetch: refetchConnections,
//   } = useQuery({
//     queryKey: ["accepted-connections", user?.profile_id],
//     queryFn: getAcceptedConnections,
//     enabled: !!user?.profile_id,
//     refetchInterval: 30000,
//   });

//   console.log(user?.profile_id)

//   /* ------------------ MESSAGES ------------------ */
//   const { data: fetchedMessages = [] } = useQuery({
//     queryKey: ["messages", user?.profile_id, selectedConversationId],
//     queryFn: () =>
//       selectedConversationId
//         ? getMessages(user.profile_id, selectedConversationId)
//         : [],
//     enabled: !!selectedConversationId,
//   });

//   /* ------------------ SOCKET HANDLERS ------------------ */
//   const handleNewMessage = useCallback(
//     (data) => {
//       setMessages((prev) => {
//         if (prev.some((m) => m._id === data._id)) return prev;
//         return [...prev, data];
//       });
//     },
//     []
//   );

//   const handleTypingIndicator = useCallback(
//     (data) => {
//       if (data.userId === selectedConversationId) {
//         setIsTyping(data.isTyping);
//       }
//     },
//     [selectedConversationId]
//   );

//   const handleMessagesRead = useCallback((data) => {
//     setMessages((prev) =>
//       prev.map((msg) =>
//         data.messageIds?.includes(msg._id)
//           ? { ...msg, read_status: true }
//           : msg
//       )
//     );
//   }, []);

//   const handleInterestAccepted = useCallback(() => {
//     refetchConnections();
//   }, [refetchConnections]);

//   /* ------------------ SOCKET INIT ------------------ */
//   useEffect(() => {
//     if (!user?.profile_id) return;

//     initSocket(user.profile_id);

//     onSocketEvent("receive_message", handleNewMessage);
//     onSocketEvent("user_typing", handleTypingIndicator);
//     onSocketEvent("messages_read", handleMessagesRead);
//     onSocketEvent("interest_accepted", handleInterestAccepted);

//     return () => {
//       offSocketEvent("receive_message", handleNewMessage);
//       offSocketEvent("user_typing", handleTypingIndicator);
//       offSocketEvent("messages_read", handleMessagesRead);
//       offSocketEvent("interest_accepted", handleInterestAccepted);
//     };
//   }, [
//     user?.profile_id,
//     handleNewMessage,
//     handleTypingIndicator,
//     handleMessagesRead,
//     handleInterestAccepted,
//   ]);

//   /* ------------------ UPDATE MESSAGES ------------------ */
// useEffect(() => {
//   if (!Array.isArray(fetchedMessages)) return;

//   setMessages((prev) => {
//     // prevent infinite loop by deep check
//     if (prev.length === fetchedMessages.length) {
//       const same = prev.every((msg, i) => msg._id === fetchedMessages[i]?._id);
//       if (same) return prev;
//     }
//     return fetchedMessages;
//   });
// }, [fetchedMessages]);

//   /* ------------------ JOIN / LEAVE ROOM ------------------ */
//   useEffect(() => {
//     if (!user?.profile_id || !selectedConversationId) return;

//     joinConversation(user.profile_id, selectedConversationId);

//     return () => {
//       leaveConversation(user.profile_id, selectedConversationId);
//     };
//   }, [user?.profile_id, selectedConversationId]);

//   /* ------------------ AUTO SCROLL ------------------ */
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   /* ------------------ SEND MESSAGE ------------------ */
//   const { mutate: sendMessageMutation } = useMutation({
//     mutationFn: ({ senderId, receiverId, content }) =>
//       sendMessageApi(senderId, receiverId, content),
//     onSuccess: (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);

//       sendMessage({
//         senderId: user.profile_id,
//         receiverId: selectedConversationId,
//         text: newMessage.text,
//         messageId: newMessage._id,
//       });

//       setMessage("");
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     sendMessageMutation({
//       senderId: user.profile_id,
//       receiverId: selectedConversationId,
//       content: message,
//     });
//   };

//   /* ------------------ TYPING ------------------ */
//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (!selectedConversationId) return;

//     sendTypingIndicator(user.profile_id, selectedConversationId, true);

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     typingTimeoutRef.current = setTimeout(() => {
//       sendTypingIndicator(user.profile_id, selectedConversationId, false);
//     }, 1500);
//   };

//   /* ------------------ SELECT CONVERSATION ------------------ */
//   const handleSelectConversation = (connection) => {
//     setSelectedConversation({
//       id: connection.user.profile_id,
//       user: connection.user,
//     });

//     queryClient.setQueryData(["accepted-connections"], (old) => ({
//       ...old,
//       profiles: old.profiles.map((c) =>
//         c.user.profile_id === connection.user.profile_id
//           ? { ...c, unread_count: 0 }
//           : c
//       ),
//     }));
//   };

//   /* ------------------ UI ------------------ */
//   return (
//     <div className="container-custom py-8 mt-20">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-xl shadow-sm overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
//           {/* LEFT */}
//           <div className="border-r">
//             <div className="p-4 border-b">
//               <h2 className="text-xl font-bold">Chats</h2>
//             </div>

//             {connectionsData.profiles.map((c) => (
//               <button
//                 key={c.connection_id}
//                 onClick={() => handleSelectConversation(c)}
//                 className={`w-full p-4 flex gap-3 hover:bg-gray-50 ${
//                   selectedConversationId === c.user.profile_id
//                     ? "bg-gray-100"
//                     : ""
//                 }`}
//               >
//                 <img
//                   src={`${baseurl}${c.user.photo || "/default-avatar.png"}`}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="flex-1 text-left">
//                   <p className="font-semibold">{c.user.full_name}</p>
//                   <p className="text-xs text-gray-500 truncate">
//                     {c.last_message?.text || "Connected"}
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* RIGHT */}
//           <div className="col-span-2 flex flex-col">
//             {selectedConversation ? (
//               <>
//                 <div className="p-4 border-b flex items-center gap-3">
//                   <img
//                     src={`${baseurl}${selectedConversation.user.photo}`}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">
//                       {selectedConversation.user.full_name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {isTyping ? "typing..." : "online"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex-1 p-4 overflow-y-auto space-y-3">
//                   {messages.map((msg) => (
//                     <div
//                       key={msg._id}
//                       className={`flex ${
//                         msg.sender_profile_id === user.profile_id
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div className="bg-gray-100 px-3 py-2 rounded-lg">
//                         <p>{msg.text}</p>
//                         <span className="text-xs text-gray-500">
//                           {formatDate(msg.createdAt, "HH:mm")}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={scrollRef} />
//                 </div>

//                 <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
//                   <input
//                     value={message}
//                     onChange={handleInputChange}
//                     className="flex-1 input"
//                     placeholder="Type a message..."
//                   />
//                   <button className="btn-primary px-5">Send</button>
//                 </form>
//               </>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 Select a conversation
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Messages;
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate, formatFileSize, getTimeAgo } from "../../utils/formatters";
import {
  getAcceptedConnections,
  getMessages,
  sendMessage as sendMessageApi,
  updateMessage,
  deleteMessage,
  sendTypingIndicator as sendTypingIndicatorApi,
  markMessagesAsRead,
} from "../../api/message.api";
import {
  initSocket,
  onSocketEvent,
  offSocketEvent,
  sendMessage as sendSocketMessage,
  sendTypingIndicator,
} from "../../lib/socket";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiSearch,
  FiMoreVertical,
  FiVideo,
  FiPhone,
  FiInfo,
  FiPaperclip,
  FiImage,
  FiFileText,
  FiMic,
  FiSmile,
  FiSend,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiX,
  FiCheck,
  FiCheckCircle,
  FiUser,
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";
import { MdDoneAll, MdEmojiEmotions } from "react-icons/md";
import { HiPhotograph } from "react-icons/hi";
import { BsCameraVideo, BsThreeDots } from "react-icons/bs";
import { AiOutlineFile } from "react-icons/ai";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import TypingIndicator from "../../components/message/TypingIndicator";

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const baseurl = import.meta.env.VITE_BASE_URL;

  // Get connections
  const {
    data: connectionsData = { profiles: [] },
    isLoading: isLoadingConnections,
    refetch: refetchConnections,
  } = useQuery({
    queryKey: ["accepted-connections", user?.profile_id],
    queryFn: getAcceptedConnections,
    enabled: !!user?.profile_id,
    refetchInterval: 30000,
  });

  const isMembershipValid = (profile) => {
    if (!profile) return false;

    if (profile.paid_member !== "Y") return false;

    if (!profile.membership_expired_on) return false;

    const expiryDate = new Date(profile.membership_expired_on);
    return expiryDate > new Date();
  };
  const canSendMessage = isMembershipValid(user?.profile);

  // Get messages
  const {
    data: fetchedMessages = [],
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", user?.profile_id, selectedConversation?.id],
    queryFn: () => getMessages(user.profile_id, selectedConversation?.id),
    enabled: !!selectedConversation?.id,
  });

  // Mark messages as read when conversation is selected
const lastReadRef = useRef(null);

useEffect(() => {
  if (
    selectedConversation?.id &&
    lastReadRef.current !== selectedConversation.id
  ) {
    lastReadRef.current = selectedConversation.id;
    markMessagesAsRead(selectedConversation.id);
  }
}, [selectedConversation?.id]);


  useEffect(() => {
  if (!user?.profile_id) return;

  initSocket(user.profile_id);

  return () => {
    // optional: socket cleanup agar function hai
  };
}, [user?.profile_id]);


  // Socket handlers
useEffect(() => {
  if (!selectedConversation?.id) return;

  const handleNewMessage = (newMessage) => {
    if (
      newMessage.sender_profile_id === selectedConversation.id ||
      newMessage.receiver_profile_id === selectedConversation.id
    ) {
      setMessages((prev) => [...prev, newMessage]);

      if (newMessage.sender_profile_id === selectedConversation.id) {
        markMessagesAsRead(selectedConversation.id);
      }
    }
    refetchConnections();
  };

  const handleTypingIndicator = (data) => {
    if (data.userId === selectedConversation.id) {
      setIsTyping(data.isTyping);
    }
  };

  const handleMessageUpdated = (updatedMessage) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      )
    );
  };

  const handleMessageDeleted = (data) => {
    setMessages((prev) =>
      prev.filter((msg) => msg._id !== data.messageId)
    );
  };

  onSocketEvent("receive_message", handleNewMessage);
  onSocketEvent("user_typing", handleTypingIndicator);
  onSocketEvent("message_updated", handleMessageUpdated);
  onSocketEvent("message_deleted", handleMessageDeleted);

  return () => {
    offSocketEvent("receive_message", handleNewMessage);
    offSocketEvent("user_typing", handleTypingIndicator);
    offSocketEvent("message_updated", handleMessageUpdated);
    offSocketEvent("message_deleted", handleMessageDeleted);
  };
}, [selectedConversation?.id]);

  // Update messages when fetched
useEffect(() => {
  if (!Array.isArray(fetchedMessages)) return;

  setMessages((prev) => {
    // same length + same last message → no update
    if (
      prev.length === fetchedMessages.length &&
      prev[prev.length - 1]?._id ===
        fetchedMessages[fetchedMessages.length - 1]?._id
    ) {
      return prev;
    }

    return fetchedMessages;
  });
}, [fetchedMessages]);


  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send message mutation
  const { mutate: sendMessageMutation, isLoading: isSending } = useMutation({
    mutationFn: ({ senderId, receiverId, content, file }) =>
      sendMessageApi(senderId, receiverId, content, file),
    onSuccess: (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      sendSocketMessage({
        senderId: user.profile_id,
        receiverId: selectedConversation.id,
        text: newMessage.text,
        messageId: newMessage._id,
      });
      setMessage("");
      setFile(null);
      refetchConnections();
    },
    onError: (err) => toast.error(err.message),
  });

  // Update message mutation
  const { mutate: updateMessageMutation } = useMutation({
    mutationFn: ({ id, text }) => updateMessage({ id, text }),
    onSuccess: (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg,
        ),
      );
      setEditingMessage(null);
      toast.success("Message updated");
    },
    onError: (err) => toast.error(err.message),
  });

  // Delete message mutation
  const { mutate: deleteMessageMutation } = useMutation({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: () => {
      setSelectedMessage(null);
      refetchMessages();
      toast.success("Message deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  // Handle send message
  const handleSend = (e) => {
    e.preventDefault();

    // ❌ Free / expired user send nahi kar sakta
    if (!canSendMessage) {
      toast.error("Messaging is available for paid members only.");
      return;
    }

    if ((!message.trim() && !file) || !selectedConversation) return;

    sendMessageMutation({
      senderId: user.profile_id,
      receiverId: selectedConversation.id,
      content: message,
      file,
    });
  };

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!canSendMessage) return;

    sendTypingIndicator(user.profile_id, selectedConversation?.id, true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(user.profile_id, selectedConversation?.id, false);
    }, 2000);
  }, [user?.profile_id, selectedConversation?.id, canSendMessage]);

  // Handle file selection
  const handleFileSelect = (type) => {
    let inputRef;
    let acceptTypes;

    switch (type) {
      case "image":
        inputRef = imageInputRef;
        acceptTypes = "image/*";
        break;
      case "document":
        inputRef = fileInputRef;
        acceptTypes = ".pdf,.doc,.docx,.txt";
        break;
      default:
        inputRef = fileInputRef;
        acceptTypes = "*";
    }

    if (inputRef.current) {
      inputRef.current.accept = acceptTypes;
      inputRef.current.click();
    }
  };

  // Handle file input change
  const handleFileChange = (e, type = "file") => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSize = type === "image" ? 10 * 1024 * 1024 : 50 * 1024 * 1024;

      if (selectedFile.size > maxSize) {
        toast.error(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      setFile(selectedFile);
      if (type === "image") {
        setMessage("📷 Photo");
      } else {
        setMessage(`📎 ${selectedFile.name}`);
      }
    }
  };

  // Render message content based on type
  const renderMessageContent = (msg) => {
    switch (msg.message_type) {
      case "image":
        return (
          <div className="relative group">
            <img
              src={`${baseurl}${msg.media_url}`}
              alt="Shared image"
              className="max-w-xs rounded-xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onClick={() =>
                window.open(`${baseurl}${msg.media_url}`, "_blank")
              }
            />
            {msg.text && (
              <p className="mt-2 text-gray-800 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
                {msg.text}
              </p>
            )}
          </div>
        );
      case "video":
        return (
          <div className="relative">
            <video
              controls
              className="max-w-xs rounded-xl shadow-md"
              src={`${baseurl}${msg.media_url}`}
              poster={`${baseurl}${msg.media_url}?thumbnail`}
            />
            {msg.text && <p className="mt-2">{msg.text}</p>}
          </div>
        );
      case "file":
        return (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <AiOutlineFile className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 truncate">
                {msg.file_name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(msg.file_size)}
              </p>
              {msg.text && (
                <p className="mt-2 text-sm text-gray-600">{msg.text}</p>
              )}
            </div>
            <a
              href={`${baseurl}${msg.media_url}`}
              download
              className="p-2 hover:bg-blue-100 rounded-full transition-colors"
              title="Download"
            >
              <FiDownload className="w-5 h-5 text-blue-600" />
            </a>
          </div>
        );
      default:
        return <p className="whitespace-pre-wrap text-gray-800">{msg.text}</p>;
    }
  };

  // Get user avatar
  const getUserAvatar = (profile) => {
    if (profile?.photo) {
      return `${baseurl}${profile.photo}`;
    }
    return defaultAvatar;
  };

  // Filter connections based on search
  const filteredConnections = connectionsData.profiles.filter(
    (connection) =>
      connection.user.full_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      connection.user.residing_city
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Message date grouping
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16 md:pt-20 mt-10">
      <div className="container mx-auto h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-none md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden h-full flex flex-col md:flex-row"
        >
          {/* Left sidebar - Conversations - Hidden on mobile when chat is open */}
          {(showSidebar || !selectedConversation) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="md:w-80 lg:w-96 border-r border-gray-200 flex flex-col h-full absolute md:relative z-10 bg-white w-full md:w-auto"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <FiEdit2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <FiArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {isLoadingConnections ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredConnections.length > 0 ? (
                  filteredConnections.map((connection) => {
                    const isActive =
                      selectedConversation?.id === connection.user.profile_id;

                    return (
                      <motion.button
                        key={connection.connection_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => {
                          setSelectedConversation({
                            id: connection.user.profile_id,
                            user: connection.user,
                          });
                          setShowSidebar(false);
                        }}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 border-r-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={getUserAvatar(connection.user)}
                            alt={connection.user.full_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1 text-left min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-gray-800 truncate">
                              {connection.user.full_name}
                            </p>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {getTimeAgo(connection.last_message_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {connection.last_message?.text || "No messages yet"}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {connection.user.residing_city}
                            </span>
                            {connection.unread_count > 0 && (
                              <span className="ml-auto px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                                {connection.unread_count}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <FiUser className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No conversations yet
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Start a conversation with someone who accepted your
                      interest
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Main chat area */}
          <div className="flex-1 flex flex-col z-0 h-full relative">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* 🔙 Back to Conversations */}
                    <button
                      onClick={() => {
                        setShowSidebar(true);
                        setSelectedConversation(null);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Back to conversations"
                    >
                      <FiArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Profile + Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={getUserAvatar(selectedConversation.user)}
                          alt={selectedConversation.user.full_name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {selectedConversation.user.full_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {isTyping ? <TypingIndicator /> : "Online"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white"
                >
                  {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                        <FiSend className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No messages yet
                      </h3>
                      <p className="text-gray-600 text-center max-w-md">
                        Start the conversation by sending a message to{" "}
                        {selectedConversation.user.full_name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(messageGroups).map(
                        ([date, dateMessages]) => (
                          <div key={date}>
                            {/* Date Separator */}
                            <div className="flex justify-center my-6">
                              <span className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-full shadow-sm">
                                {formatDate(date, "DD MMMM YYYY")}
                              </span>
                            </div>

                            {/* Messages for this date */}
                            <div className="space-y-3">
                              {dateMessages.map((msg) => {
                                const isOwn =
                                  msg.sender_profile_id === user.profile_id;

                                return (
                                  <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}
                                    onContextMenu={(e) => {
                                      e.preventDefault();
                                      setSelectedMessage(msg);
                                    }}
                                  >
                                    <div className="relative max-w-lg">
                                      {/* Sender Info (for received messages) */}
                                      {!isOwn && (
                                        <div className="flex items-center gap-2 mb-1 ml-2">
                                          <span className="text-xs font-medium text-gray-700">
                                            {
                                              selectedConversation.user
                                                .full_name
                                            }
                                          </span>
                                          <span className="text-xs text-gray-400">
                                            {formatDate(msg.createdAt, "HH:mm")}
                                          </span>
                                        </div>
                                      )}

                                      {/* Message Bubble */}
                                      <div
                                        className={`relative rounded-2xl px-4 py-3 ${
                                          isOwn
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100"
                                        }`}
                                      >
                                        {/* Message Content */}
                                        {editingMessage?._id === msg._id ? (
                                          <div className="flex gap-2">
                                            <input
                                              defaultValue={msg.text}
                                              autoFocus
                                              className="flex-1 bg-transparent border-b border-white/30 outline-none"
                                              onBlur={() =>
                                                setEditingMessage(null)
                                              }
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  updateMessageMutation({
                                                    id: msg._id,
                                                    text: e.target.value,
                                                  });
                                                }
                                                if (e.key === "Escape") {
                                                  setEditingMessage(null);
                                                }
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          renderMessageContent(msg)
                                        )}

                                        {/* Message Status and Time */}
                                        <div
                                          className={`flex items-center justify-end gap-2 mt-2 ${
                                            isOwn
                                              ? "text-blue-200"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          {isOwn && (
                                            <>
                                              {msg.read_status ? (
                                                <MdDoneAll className="w-4 h-4" />
                                              ) : (
                                                <FiCheck className="w-4 h-4" />
                                              )}
                                            </>
                                          )}
                                          <span className="text-xs">
                                            {formatDate(msg.createdAt, "HH:mm")}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Message Actions Menu */}
                                      <AnimatePresence>
                                        {selectedMessage?._id === msg._id && (
                                          <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="absolute top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg py-1 z-50 border border-gray-200"
                                            style={{
                                              [isOwn ? "right" : "left"]:
                                                "calc(100% + 8px)",
                                            }}
                                          >
                                            {isOwn && (
                                              <button
                                                onClick={() => {
                                                  setEditingMessage(msg);
                                                  setSelectedMessage(null);
                                                }}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                                              >
                                                <FiEdit2 className="w-4 h-4" />
                                                Edit
                                              </button>
                                            )}
                                            <button
                                              onClick={() => {
                                                deleteMessageMutation(msg._id);
                                                setSelectedMessage(null);
                                              }}
                                              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
                                            >
                                              <FiTrash2 className="w-4 h-4" />
                                              Delete
                                            </button>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        ),
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input Area */}
                <div className="border-t border-gray-200 bg-white p-4">
                  {file && (
                    <div className="flex items-center justify-between mb-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3">
                        <FiPaperclip className="text-blue-500" />
                        <span className="text-sm text-gray-700 truncate">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <FiX className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSend} className="flex items-end gap-2">
                    {/* Attach Button with Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        disabled={!canSendMessage}
                        onClick={() => setShowAttachMenu(!showAttachMenu)}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPaperclip className="w-5 h-5 text-gray-600" />
                      </button>

                      <AnimatePresence>
                        {showAttachMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-[180px] z-50"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                handleFileSelect("image");
                                setShowAttachMenu(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center gap-3"
                            >
                              <HiPhotograph className="w-5 h-5 text-blue-500" />
                              <span className="text-sm">Photo & Video</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleFileSelect("document");
                                setShowAttachMenu(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center gap-3"
                            >
                              <AiOutlineFile className="w-5 h-5 text-green-500" />
                              <span className="text-sm">Document</span>
                            </button>
                            <button
                              type="button"
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center gap-3"
                            >
                              <FiMic className="w-5 h-5 text-purple-500" />
                              <span className="text-sm">Audio</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {!canSendMessage && (
                      <div className="mb-3 mt-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                        🔒 You can receive messages, but sending messages is
                        available for
                        <strong> paid members only</strong>.
                      </div>
                    )}

                    {/* Message Input */}
                    <div className="flex-1 relative">
                      <textarea
                        ref={messageInputRef}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          handleTyping();
                        }}
                        placeholder="Type a message..."
                        className="w-full p-3 pl-4 pr-12 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none min-h-[44px] max-h-[120px]"
                        disabled={isSending}
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(e);
                          }
                        }}
                      />

                      {/* Emoji Button */}
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <MdEmojiEmotions className="w-5 h-5 text-gray-500" />
                      </button>

                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <div className="absolute bottom-full right-0 mb-2 z-50">
                          <EmojiPicker
                            onEmojiClick={(emojiData) => {
                              setMessage((prev) => prev + emojiData.emoji);
                              setShowEmojiPicker(false);
                              messageInputRef.current?.focus();
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={
                        isSending ||
                        (!message.trim() && !file) ||
                        !canSendMessage
                      }
                      className={`p-3 rounded-full transition-all duration-200 ${
                        isSending ||
                        (!message.trim() && !file) ||
                        !canSendMessage
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
                      }`}
                    >
                      {isSending ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <FiSend className="w-5 h-5" />
                      )}
                    </button>
                  </form>

                  {/* Hidden file inputs */}
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={(e) => handleFileChange(e, "image")}
                    className="hidden"
                    accept="image/*"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, "document")}
                    className="hidden"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8"
                >
                  <BsThreeDots className="w-16 h-16 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Your Messages
                </h3>
                <p className="text-gray-600 max-w-md mb-8">
                  Select a conversation from the list to start messaging. You
                  can only message users who have accepted your interest.
                </p>
                <button
                  onClick={() => navigate("/browse")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
                >
                  Browse Profiles
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;
