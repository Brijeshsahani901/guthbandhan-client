// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { formatDate } from "../../utils/formatters";
// import mockProfiles from "../../data/mockProfiles";

// const Messages = () => {
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     document.title = "Messages | Eternal Bonds";

//     // Simulate API call
//     setTimeout(() => {
//       const mockConversations = mockProfiles.slice(0, 3).map((profile) => ({
//         id: profile.id,
//         user: profile,
//         lastMessage: "Hey, how are you?",
//         timestamp: new Date(),
//         unread: Math.random() > 0.5,
//       }));
//       setConversations(mockConversations);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     setMessage("");
//   };

//   return (
//     <div className="container-custom py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-xl shadow-sm overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
//           {/* Conversations List */}
//           <div className="border-r border-neutral-200">
//             <div className="p-4 border-b border-neutral-200">
//               <h2 className="text-xl font-bold">Messages</h2>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
//               </div>
//             ) : conversations.length > 0 ? (
//               <div className="overflow-y-auto h-[calc(600px-65px)]">
//                 {conversations.map((conversation) => (
//                   <button
//                     key={conversation.id}
//                     onClick={() => setSelectedConversation(conversation)}
//                     className={`w-full p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors ${
//                       selectedConversation?.id === conversation.id
//                         ? "bg-neutral-100"
//                         : ""
//                     }`}
//                   >
//                     <img
//                       src={conversation.user.photos[0]}
//                       alt={conversation.user.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
// <div className="flex-1 text-left">
//   <div className="flex items-center justify-between">
//     <h3 className="font-semibold">
//       {conversation.user.name}
//     </h3>
//     <span className="text-xs text-neutral-500">
//       {formatDate(conversation.timestamp, "HH:mm")}
//     </span>
//   </div>
//   <p className="text-sm text-neutral-600 truncate">
//     {conversation.lastMessage}
//   </p>
// </div>
//                     {conversation.unread && (
//                       <div className="w-3 h-3 rounded-full bg-primary-600"></div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//                 <p className="text-neutral-600 mb-4">No messages yet</p>
//                 <a href="/browse" className="btn-primary">
//                   Find Matches
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* Chat Area */}
//           <div className="col-span-2 flex flex-col">
//             {selectedConversation ? (
//               <>
//                 {/* Chat Header */}
//                 <div className="p-4 border-b border-neutral-200 flex items-center gap-4">
//                   <img
//                     src={selectedConversation.user.photos[0]}
//                     alt={selectedConversation.user.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold">
//                       {selectedConversation.user.name}
//                     </h3>
//                     <p className="text-sm text-neutral-500">Online</p>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div className="flex-1 p-4 overflow-y-auto">
//                   <div className="space-y-4">
//                     {/* Sample messages - in a real app, these would come from the API */}
//                     <div className="flex justify-start">
//                       <div className="bg-neutral-100 rounded-lg p-3 max-w-[70%]">
//                         <p>Hey, how are you?</p>
//                         <span className="text-xs text-neutral-500 mt-1">
//                           {formatDate(new Date(), "HH:mm")}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-end">
//                       <div className="bg-primary-600 text-white rounded-lg p-3 max-w-[70%]">
//                         <p>I'm good, thanks! How about you?</p>
//                         <span className="text-xs text-white/80 mt-1">
//                           {formatDate(new Date(), "HH:mm")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Message Input */}
//                 <form
//                   onSubmit={handleSend}
//                   className="p-4 border-t border-neutral-200"
//                 >
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Type a message..."
//                       className="flex-1 input"
//                     />
//                     <button
//                       type="submit"
//                       disabled={!message.trim()}
//                       className="btn-primary px-6"
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </form>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//                 <p className="text-neutral-600">
//                   Select a conversation to start chatting
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Messages;

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
// import { formatDate } from "../../utils/formatters";
// import { fetchAcceptedProfiles } from "../../api/profile";
// import {
//   getMessages,
//   sendMessage,
//   updateMessage,
//   deleteMessage
// } from '../../api/message.api';
// import { socket } from "../../lib/socket";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Messages = () => {
//     const { user } = useAuth();
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const baseurl = import.meta.env.VITE_BASE_URL;
//   const {
//     data: conversations = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["accepted-profiles"],
//     queryFn: fetchAcceptedProfiles,
//   });

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     // 🛠️ Later: Add API call to send message
//     setMessage("");
//   };

//   return (
//     <div className="container-custom py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-xl shadow-sm overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
//           {/* Conversation List */}
//           <div className="border-r border-neutral-200">
//             <div className="p-4 border-b border-neutral-200">
//               <h2 className="text-xl font-bold">Messages</h2>
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center items-center h-full">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
//               </div>
//             ) : isError ? (
//               <div className="p-4 text-red-500">
//                 Error: {error?.message || "Unable to load messages"}
//               </div>
//             ) : conversations.profiles.length > 0 ? (
//               <div className="overflow-y-auto h-[calc(600px-65px)]">
//                 {conversations.profiles.map((profile) => (
//                   <button
//                     key={profile._id}
//                     onClick={() =>
//                       setSelectedConversation({
//                         id: profile._id,
//                         user: profile,
//                         lastMessage: "Say Hi 👋",
//                         timestamp: new Date(),
//                       })
//                     }
//                     className={`w-full p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors ${
//                       selectedConversation?.id === profile._id
//                         ? "bg-neutral-100"
//                         : ""
//                     }`}
//                   >
//                     <img
//                       src={`${baseurl}${profile?.photos[0]?.replace(
//                         /\\/g,
//                         "/"
//                       )}`}
//                       alt={profile.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div className="flex-1 text-left">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-semibold">{profile.first_name}</h3>
//                         <span className="text-xs text-neutral-500">
//                           {formatDate(profile.updated_timestamp, "HH:mm")}
//                         </span>
//                       </div>
//                       <p className="text-sm text-neutral-600 truncate">
//                         {profile.about?.length > 30
//                           ? profile.about.slice(0, 30) + "..."
//                           : profile.about}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//                 <p className="text-neutral-600 mb-4">No messages yet</p>
//                 <button
//                   onClick={() => navigate("/browse")}
//                   className="btn-primary"
//                 >
//                   Find Matches
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Chat Area */}
//           <div className="col-span-2 flex flex-col">
//             {selectedConversation ? (
//               <>
//                 {/* Chat Header */}
//                 <div className="p-4 border-b border-neutral-200 flex items-center gap-4">
//                   <img
//                     src={selectedConversation.user.photos?.[0]}
//                     alt={selectedConversation.user.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold">
//                       {selectedConversation.user.name}
//                     </h3>
//                     <p className="text-sm text-neutral-500">Online</p>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div className="flex-1 p-4 overflow-y-auto">
//                   <div className="space-y-4">
//                     {/* Sample static messages for now */}
//                     <div className="flex justify-start">
//                       <div className="bg-neutral-100 rounded-lg p-3 max-w-[70%]">
//                         <p>Hello there!</p>
//                         <span className="text-xs text-neutral-500 mt-1">
//                           {formatDate(new Date(), "HH:mm")}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-end">
//                       <div className="bg-primary-600 text-white rounded-lg p-3 max-w-[70%]">
//                         <p>Hi! How are you?</p>
//                         <span className="text-xs text-white/80 mt-1">
//                           {formatDate(new Date(), "HH:mm")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Message Input */}
//                 <form
//                   onSubmit={handleSend}
//                   className="p-4 border-t border-neutral-200"
//                 >
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Type a message..."
//                       className="flex-1 input"
//                     />
//                     <button
//                       type="submit"
//                       disabled={!message.trim()}
//                       className="btn-primary px-6"
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </form>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//                 <p className="text-neutral-600">
//                   Select a conversation to start chatting
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Messages;

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../utils/formatters";
import { fetchAcceptedProfiles } from "../../api/profile";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  updateMessage,
} from "../../api/message.api";
import { socket } from "../../lib/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const scrollRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { profileId } = useParams();

  const baseurl = import.meta.env.VITE_BASE_URL;

  const {
    data: conversations = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["accepted-profiles"],
    queryFn: fetchAcceptedProfiles,
  });

  const {
    data: msg = [],
    refetch,
    isLoading: loadingMessages,
  } = useQuery({
    queryKey: ["messages", user?.profile_id, profileId],
    queryFn: () => getMessages(user?.profile_id, profileId),
    enabled: !!profileId,
  });

  useEffect(() => {
    if (msg) {
      setMessages(msg);
    }
  },[]);


  const { mutate: sendMsg } = useMutation({
    mutationFn: ({ senderId, receiverId, content }) =>
      sendMessage(senderId, receiverId, content),
    onSuccess: (newMessage) => {
      setMessages((prev = []) => [...prev, newMessage]);
      socket.emit("send-message", newMessage);
    },
  });

  // const loadMessages = async (receiverId) => {
  //   const initialMessages = await fetchMessages(receiverId);
  //   setMessages(initialMessages);
  // };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMsg({
      senderId: user?.profile_id,
      receiverId: profileId,
      content: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (selectedConversation) {
      // loadMessages(selectedConversation.id);
      socket.emit("join-room", selectedConversation.id);
    }
  }, [selectedConversation]);

  // useEffect(() => {
  //   socket.on("receive-message", (msg) => {
  //     console.log(msg)
  //     setMessages((prev = []) => [...prev, msg]);
  //   });
  //   return () => {
  //     socket.off("receive-message");
  //   };
  // }, []);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (
        (msg.sender_profile_id === selectedConversation?.id &&
          msg.receiver_profile_id === user?.profile_id) ||
        (msg.receiver_profile_id === selectedConversation?.id &&
          msg.sender_profile_id === user?.profile_id)
      ) {
        refetch();
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [selectedConversation, refetch]);

  // const loadMore = async () => {
  //   const newPage = page + 1;
  //   const olderMessages = await fetchMessages(selectedConversation.id, newPage);
  //   setMessages((prev = []) => [...olderMessages, ...prev]);

  //   setPage(newPage);
  // };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          <div className="border-r border-neutral-200">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500">
                Error: {error?.message || "Unable to load messages"}
              </div>
            ) : conversations.profiles.length > 0 ? (
              <div className="overflow-y-auto h-[calc(600px-65px)]">
                {conversations.profiles.map((profile) => (
                  <button
                    key={profile._id}
                    onClick={() => {
                      setSelectedConversation({
                        id: profile._id,
                        user: profile,
                      });
                      setPage(1);
                    }}
                    className={`w-full p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors ${
                      selectedConversation?.id === profile._id
                        ? "bg-neutral-100"
                        : ""
                    }`}
                  >
                    <img
                      src={`${baseurl}${profile?.photos[0]?.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{profile.first_name}</h3>
                        <span className="text-xs text-neutral-500">
                          {formatDate(profile.updated_timestamp, "HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 truncate">
                        {profile.about?.length > 30
                          ? profile.about.slice(0, 30) + "..."
                          : profile.about}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <p className="text-neutral-600 mb-4">No messages yet</p>
                <button
                  onClick={() => navigate("/browse")}
                  className="btn-primary"
                >
                  Find Matches
                </button>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-neutral-200 flex items-center gap-4">
                  <img
                    src={`${baseurl}${selectedConversation.user.photos?.[0]?.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={selectedConversation.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {selectedConversation.user.name}
                    </h3>
                    <p className="text-sm text-neutral-500">Online</p>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  <button
                    // onClick={loadMore}
                    className="text-xs text-blue-600 underline mb-2"
                  >
                    Load older messages
                  </button>
                  {messages?.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.sender_profile_id === user._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 max-w-[70%] text-sm ${
                          msg.sender === user._id
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-xs block mt-1">
                          {formatDate(msg.createdAt, "HH:mm")}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>

                <form
                  onSubmit={handleSend}
                  className="p-4 border-t border-neutral-200"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 input"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="btn-primary px-6"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <p className="text-neutral-600">
                  Select a conversation to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Messages;
