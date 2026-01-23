// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import {
//   FiEye,
//   FiMessageCircle,
//   FiHeart,
//   FiUser,
//   FiUsers,
//   FiAlertCircle,
//   FiInstagram,
//   FiMail,
//   FiCheckCircle,
//   FiClock,
//   FiInfo,
// } from "react-icons/fi";
// import { toast } from "react-toastify";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { fetchReceivedInterests, expressInterest } from "../../api/interest.api";


// function Dashboard() {
//   const { user } = useAuth();
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [message, setMessage] = useState("");

//   // Fetch interests received
//   const { data: interestsData, isLoading: interestsLoading, refetch } = useQuery({
//     queryKey: ["interestsReceived", user?.profile_id],
//     queryFn: () => fetchReceivedInterests(user?.profile_id),
//     enabled: !!user?.profile_id,
//   });

//   // Express interest mutation
//   const expressInterestMutation = useMutation({
//     mutationFn: (data) => expressInterest(data),
//     onSuccess: (data) => {
//       toast.success("Interest expressed successfully!");
//       refetch();
//       setShowMessageModal(false);
//       setMessage("");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Failed to express interest");
//     },
//   });

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1 },
//     }),
//   };

//   // Handle expressing interest
//   const handleExpressInterest = () => {
//     if (!user?.paid_member || user.paid_member !== "Y") {
//       toast.error("This feature is only available for paid members");
//       return;
//     }

//     if (!message.trim()) {
//       toast.error("Please enter a message");
//       return;
//     }

//     expressInterestMutation.mutate({
//       interest_from_pid: user.profile_id,
//       interested_in_pid: selectedProfile.profile_id,
//       interest_msg: message,
//     });
//   };

//   // Open message modal
//   const openMessageModal = (profile) => {
//     if (!user?.paid_member || user.paid_member !== "Y") {
//       toast.error("Please upgrade to premium to send messages");
//       return;
//     }
//     setSelectedProfile(profile);
//     setShowMessageModal(true);
//   };


//   useEffect(() => {
//   // Listen for new interests
//   socket.on('new-interest', (data) => {
//     if (data.receiver_id === user?.profile_id) {
//       toast.info(`New interest from ${data.sender_name}`);
//       refetch();
//     }
//   });

//   // Listen for interest acceptances
//   socket.on('interest-accepted', (data) => {
//     if (data.from === user?.profile_id) {
//       toast.success(`${data.profile.full_name} accepted your interest!`);
//       refetch();
      
//       // Update stats
//       queryClient.setQueryData(["interestsReceived"], (old) => {
//         if (!old) return old;
//         return {
//           ...old,
//           accepted: (old.accepted || 0) + 1,
//           pending: Math.max(0, (old.pending || 0) - 1),
//         };
//       });
//     }
//   });

//   return () => {
//     socket.off('new-interest');
//     socket.off('interest-accepted');
//   };
// }, [user, refetch, queryClient]);

// // Update the stats grid to show real-time counts
// const totalInterests = interestsData?.count || 0;
// const acceptedInterests = interestsData?.data?.filter(i => i.interest_status === 'A').length || 0;
// const pendingInterests = interestsData?.data?.filter(i => i.interest_status === 'P').length || 0;

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-8
//           bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
//           text-white shadow-xl"
//         >
//           <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

//           <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name || "User"}! 👋</h1>
//               <p className="text-white/80 mt-2 text-sm sm:text-base">
//                 Manage your matrimony profile and connect with potential matches
//               </p>
//               {!user?.paid_member || user.paid_member !== "Y" ? (
//                 <div className="mt-4 flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg max-w-max">
//                   <FiAlertCircle className="text-yellow-300" />
//                   <span className="text-yellow-100 text-sm">
//                     Upgrade to Premium for unlimited messaging
//                   </span>
//                 </div>
//               ) : (
//                 <div className="mt-4 flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg max-w-max">
//                   <FiCheckCircle className="text-green-300" />
//                   <span className="text-green-100 text-sm">
//                     Premium Member - All features unlocked
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
//                 <FiUser size={20} />
//                 <span className="font-medium text-sm">Dashboard</span>
//               </div>
//               {user?.profile_id && (
//                 <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
//                   <span className="font-medium text-sm">ID: {user.profile_id}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Grid */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          
//           {/* Profile Views */}
//           <motion.div
//             custom={0}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
//                 <p className="text-3xl font-bold mt-1">0</p>
//                 <p className="text-gray-400 text-xs mt-1">+0 this week</p>
//               </div>
//               <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
//                 <FiEye size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Messages */}
//           <motion.div
//             custom={1}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Messages</h3>
//                 <p className="text-3xl font-bold mt-1">0</p>
//                 <p className="text-gray-400 text-xs mt-1">Unread: 0</p>
//               </div>
//               <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
//                 <FiMessageCircle size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Interests Received */}
//           <motion.div
//             custom={2}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Interests Received</h3>
//                 <p className="text-3xl font-bold mt-1">
//                   {interestsData?.count || 0}
//                 </p>
//                 <p className="text-gray-400 text-xs mt-1">Pending: {interestsData?.pending || 0}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-green-100 text-green-600">
//                 <FiHeart size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Saved Profiles */}
//           <motion.div
//             custom={3}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Saved Profiles</h3>
//                 <p className="text-3xl font-bold mt-1">0</p>
//                 <p className="text-gray-400 text-xs mt-1">Recently added: 0</p>
//               </div>
//               <div className="p-3 rounded-xl bg-red-100 text-red-600">
//                 <FiUsers size={24} />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Profiles Interested in You */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Profiles Interested in You
//                   </h2>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <FiClock size={16} />
//                     <span>Recent</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1">
//                   These users have shown interest in your profile
//                 </p>
//               </div>

//               <div className="p-6">
//                 {interestsLoading ? (
//                   <div className="flex justify-center items-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
//                   </div>
//                 ) : interestsData?.data?.length > 0 ? (
//                   <div className="space-y-4">
//                     {interestsData.data.map((interest) => (
//                       <motion.div
//                         key={interest._id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
//                             {interest.from_profile?.full_name?.charAt(0) || "U"}
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {interest.from_profile?.full_name || "Unknown User"}
//                             </h3>
//                             <p className="text-sm text-gray-500">
//                               {interest.from_profile?.residing_city || "Location not specified"}
//                             </p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               Message: "{interest.interest_msg}"
//                             </p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <span className={`px-2 py-1 rounded text-xs ${
//                                 interest.interest_status === 'P' 
//                                   ? 'bg-yellow-100 text-yellow-800' 
//                                   : interest.interest_status === 'A'
//                                   ? 'bg-green-100 text-green-800'
//                                   : 'bg-red-100 text-red-800'
//                               }`}>
//                                 {interest.interest_status === 'P' ? 'Pending' : 
//                                  interest.interest_status === 'A' ? 'Accepted' : 'Declined'}
//                               </span>
//                               <span className="text-xs text-gray-400">
//                                 {new Date(interest.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => openMessageModal(interest.from_profile)}
//                             disabled={!user?.paid_member || user.paid_member !== "Y"}
//                             className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
//                               user?.paid_member === "Y"
//                                 ? "bg-primary-500 text-white hover:bg-primary-600"
//                                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                             }`}
//                             title={user?.paid_member !== "Y" ? "Upgrade to send messages" : ""}
//                           >
//                             <FiMessageCircle className="inline mr-2" />
//                             Message
//                           </button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <FiUsers className="text-gray-400 text-2xl" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                       No interests yet
//                     </h3>
//                     <p className="text-gray-500 max-w-md mx-auto">
//                       Complete your profile and upload photos to increase visibility and receive interests from potential matches.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Quick Actions & Info */}
//           <div className="space-y-8">
//             {/* Profile Completion */}
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//               <h3 className="font-bold text-gray-800 mb-4">Profile Completion</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Basic Information</span>
//                   <span className="text-sm font-semibold text-green-600">100%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-full bg-green-500 rounded-full"></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Photos (4 required)</span>
//                   <span className="text-sm font-semibold text-yellow-600">50%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-1/2 bg-yellow-500 rounded-full"></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Family Details</span>
//                   <span className="text-sm font-semibold text-red-600">30%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//               <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <FiUser size={20} />
//                     <span className="font-medium">Edit Profile</span>
//                   </div>
//                 </button>
                
//                 <button className="w-full text-left p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <FiEye size={20} />
//                     <span className="font-medium">View My Profile</span>
//                   </div>
//                 </button>
                
//                 <button className="w-full text-left p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <FiHeart size={20} />
//                     <span className="font-medium">Browse Matches</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Message Modal */}
//       {showMessageModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
//           >
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Message {selectedProfile?.full_name}
//               </h3>
//               <p className="text-gray-500 text-sm mt-1">
//                 Send your interest message (max 200 characters)
//               </p>
//             </div>

//             <div className="p-6">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message here..."
//                 className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//                 maxLength={200}
//               />
//               <div className="flex justify-between items-center mt-2">
//                 <span className={`text-sm ${message.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>
//                   {message.length}/200 characters
//                 </span>
//               </div>

//               <div className="mt-6 flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowMessageModal(false);
//                     setMessage("");
//                   }}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleExpressInterest}
//                   disabled={expressInterestMutation.isPending}
//                   className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {expressInterestMutation.isPending ? (
//                     <span className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Interest"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import {
//   FiEye,
//   FiMessageCircle,
//   FiHeart,
//   FiUser,
//   FiUsers,
//   FiAlertCircle,
//   FiCheckCircle,
//   FiClock,
// } from "react-icons/fi";
// import { toast } from "react-toastify";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { fetchReceivedInterests, expressInterest } from "../../api/interest.api";
// import { 
//   initSocket, 
//   onSocketEvent, 
//   offSocketEvent,
//   sendMessage 
// } from "../../lib/socket";
// import { getAcceptedConnections } from "../../api/message.api";

// function Dashboard() {
//   const { user } = useAuth();
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [message, setMessage] = useState("");
//   const queryClient = useQueryClient();

//   // Fetch interests received
//   const { 
//     data: interestsData, 
//     isLoading: interestsLoading, 
//     refetch: refetchInterests 
//   } = useQuery({
//     queryKey: ["interestsReceived", user?.profile_id],
//     queryFn: () => fetchReceivedInterests(user?.profile_id),
//     enabled: !!user?.profile_id,
//   });

//   // Fetch accepted connections for stats
//   const { data: connectionsData } = useQuery({
//     queryKey: ["acceptedConnections", user?.profile_id],
//     queryFn: () => getAcceptedConnections(user?.profile_id),
//     enabled: !!user?.profile_id,
//   });

//   // Express interest mutation
//   const expressInterestMutation = useMutation({
//     mutationFn: (data) => expressInterest(data),
//     onSuccess: (data) => {
//       toast.success("Interest expressed successfully!");
//       refetchInterests();
//       setShowMessageModal(false);
//       setMessage("");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Failed to express interest");
//     },
//   });

//   // Initialize socket connection
//   useEffect(() => {
//     if (user?.profile_id) {
//       initSocket(user.profile_id);
      
//       // Listen for interest acceptances
//       onSocketEvent("interest_accepted", handleInterestAccepted);
      
//       // Listen for new messages
//       onSocketEvent("receive_message", handleNewMessage);
      
//       return () => {
//         offSocketEvent("interest_accepted", handleInterestAccepted);
//         offSocketEvent("receive_message", handleNewMessage);
//       };
//     }
//   }, [user?.profile_id]);

//   // Handle interest acceptance notifications
//   const handleInterestAccepted = (data) => {
//     if (data.toUserId === user?.profile_id || data.fromUserId === user?.profile_id) {
//       const otherUserName = data.fromUserId === user?.profile_id 
//         ? data.profile.full_name 
//         : "Someone";
      
//       toast.success(`${otherUserName} accepted your interest! You can now chat.`);
      
//       // Refresh interests and connections
//       refetchInterests();
//       queryClient.invalidateQueries(["acceptedConnections"]);
//     }
//   };

//   // Handle new messages
//   const handleNewMessage = (messageData) => {
//     if (messageData.receiver_profile_id === user?.profile_id) {
//       console.log(messageData)
//       toast.info(`New message from ${messageData.sender_profile_id}`);
//     }
//   };

//   // Calculate stats
//   const totalInterests = interestsData?.count || 0;
//   const pendingInterests = interestsData?.data?.filter(i => i.interest_status === 'P').length || 0;
//   const acceptedInterests = interestsData?.data?.filter(i => i.interest_status === 'A').length || 0;
//   const totalConnections = connectionsData?.count || 0;
//   const unreadMessages = 0; // You can implement this based on your message model

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1 },
//     }),
//   };

//   // Handle expressing interest
//   const handleExpressInterest = () => {
//     if (!user?.paid_member || user.paid_member !== "Y") {
//       toast.error("This feature is only available for paid members");
//       return;
//     }

//     if (!message.trim()) {
//       toast.error("Please enter a message");
//       return;
//     }

//     expressInterestMutation.mutate({
//       interest_from_pid: user.profile_id,
//       interested_in_pid: selectedProfile.profile_id,
//       interest_msg: message,
//     });
//   };

//   // Open message modal
//   const openMessageModal = (profile) => {
//     if (!user?.paid_member || user.paid_member !== "Y") {
//       toast.error("Please upgrade to premium to send messages");
//       return;
//     }
//     setSelectedProfile(profile);
//     setShowMessageModal(true);
//   };

//   // Navigate to messages with selected user
//   const navigateToChat = (profile) => {
//     if (!user?.paid_member || user.paid_member !== "Y") {
//       toast.error("Please upgrade to premium to send messages");
//       return;
//     }
//     // You can implement navigation logic here
//     window.location.href = `/messages/${profile.profile_id}`;
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-8
//           bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
//           text-white shadow-xl"
//         >
//           <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

//           <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name || "User"}! 👋</h1>
//               <p className="text-white/80 mt-2 text-sm sm:text-base">
//                 Manage your matrimony profile and connect with potential matches
//               </p>
//               {!user?.paid_member || user.paid_member !== "Y" ? (
//                 <div className="mt-4 flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg max-w-max">
//                   <FiAlertCircle className="text-yellow-300" />
//                   <span className="text-yellow-100 text-sm">
//                     Upgrade to Premium for unlimited messaging
//                   </span>
//                 </div>
//               ) : (
//                 <div className="mt-4 flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg max-w-max">
//                   <FiCheckCircle className="text-green-300" />
//                   <span className="text-green-100 text-sm">
//                     Premium Member - All features unlocked
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
//                 <FiUser size={20} />
//                 <span className="font-medium text-sm">Dashboard</span>
//               </div>
//               {user?.profile_id && (
//                 <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
//                   <span className="font-medium text-sm">ID: {user.profile_id}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Grid */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          
//           {/* Profile Views */}
//           <motion.div
//             custom={0}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
//                 <p className="text-3xl font-bold mt-1">0</p>
//                 <p className="text-gray-400 text-xs mt-1">+0 this week</p>
//               </div>
//               <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
//                 <FiEye size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Messages */}
//           <motion.div
//             custom={1}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Messages</h3>
//                 <p className="text-3xl font-bold mt-1">{unreadMessages}</p>
//                 <p className="text-gray-400 text-xs mt-1">Unread: {unreadMessages}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
//                 <FiMessageCircle size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Interests Received */}
//           <motion.div
//             custom={2}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Interests Received</h3>
//                 <p className="text-3xl font-bold mt-1">{totalInterests}</p>
//                 <p className="text-gray-400 text-xs mt-1">
//                   Pending: {pendingInterests} | Accepted: {acceptedInterests}
//                 </p>
//               </div>
//               <div className="p-3 rounded-xl bg-green-100 text-green-600">
//                 <FiHeart size={24} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Active Connections */}
//           <motion.div
//             custom={3}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//             className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Active Connections</h3>
//                 <p className="text-3xl font-bold mt-1">{totalConnections}</p>
//                 <p className="text-gray-400 text-xs mt-1">Chat enabled</p>
//               </div>
//               <div className="p-3 rounded-xl bg-red-100 text-red-600">
//                 <FiUsers size={24} />
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Profiles Interested in You */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Profiles Interested in You
//                   </h2>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <FiClock size={16} />
//                     <span>Recent</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1">
//                   These users have shown interest in your profile
//                 </p>
//               </div>

//               <div className="p-6">
//                 {interestsLoading ? (
//                   <div className="flex justify-center items-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
//                   </div>
//                 ) : interestsData?.data?.length > 0 ? (
//                   <div className="space-y-4">
//                     {interestsData.data.map((interest) => (
//                       <motion.div
//                         key={interest._id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
//                             {interest.from_profile?.full_name?.charAt(0) || "U"}
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {interest.from_profile?.full_name || "Unknown User"}
//                             </h3>
//                             <p className="text-sm text-gray-500">
//                               {interest.from_profile?.residing_city || "Location not specified"}
//                             </p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               Message: "{interest.interest_msg}"
//                             </p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <span className={`px-2 py-1 rounded text-xs ${
//                                 interest.interest_status === 'P' 
//                                   ? 'bg-yellow-100 text-yellow-800' 
//                                   : interest.interest_status === 'A'
//                                   ? 'bg-green-100 text-green-800'
//                                   : 'bg-red-100 text-red-800'
//                               }`}>
//                                 {interest.interest_status === 'P' ? 'Pending' : 
//                                  interest.interest_status === 'A' ? 'Accepted' : 'Declined'}
//                               </span>
//                               <span className="text-xs text-gray-400">
//                                 {new Date(interest.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           {interest.interest_status === 'A' ? (
//                             <button
//                               onClick={() => navigateToChat(interest.from_profile)}
//                               className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                             >
//                               <FiMessageCircle className="inline mr-2" />
//                               Chat Now
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => openMessageModal(interest.from_profile)}
//                               disabled={!user?.paid_member || user.paid_member !== "Y"}
//                               className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
//                                 user?.paid_member === "Y"
//                                   ? "bg-primary-500 text-white hover:bg-primary-600"
//                                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                               }`}
//                               title={user?.paid_member !== "Y" ? "Upgrade to send messages" : ""}
//                             >
//                               <FiMessageCircle className="inline mr-2" />
//                               Reply
//                             </button>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <FiUsers className="text-gray-400 text-2xl" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                       No interests yet
//                     </h3>
//                     <p className="text-gray-500 max-w-md mx-auto">
//                       Complete your profile and upload photos to increase visibility and receive interests from potential matches.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Quick Actions & Info */}
//           <div className="space-y-8">
//             {/* Profile Completion */}
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//               <h3 className="font-bold text-gray-800 mb-4">Profile Completion</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Basic Information</span>
//                   <span className="text-sm font-semibold text-green-600">100%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-full bg-green-500 rounded-full"></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Photos (4 required)</span>
//                   <span className="text-sm font-semibold text-yellow-600">50%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-1/2 bg-yellow-500 rounded-full"></div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Family Details</span>
//                   <span className="text-sm font-semibold text-red-600">30%</span>
//                 </div>
//                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//               <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button 
//                   onClick={() => window.location.href = '/profile/edit'}
//                   className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FiUser size={20} />
//                     <span className="font-medium">Edit Profile</span>
//                   </div>
//                 </button>
                
//                 <button 
//                   onClick={() => window.location.href = `/profile/${user?.profile_id}`}
//                   className="w-full text-left p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FiEye size={20} />
//                     <span className="font-medium">View My Profile</span>
//                   </div>
//                 </button>
                
//                 <button 
//                   onClick={() => window.location.href = '/messages'}
//                   className="w-full text-left p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FiMessageCircle size={20} />
//                     <span className="font-medium">My Messages</span>
//                   </div>
//                 </button>
                
//                 <button 
//                   onClick={() => window.location.href = '/browse'}
//                   className="w-full text-left p-3 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FiHeart size={20} />
//                     <span className="font-medium">Browse Matches</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Message Modal */}
//       {showMessageModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
//           >
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Message {selectedProfile?.full_name}
//               </h3>
//               <p className="text-gray-500 text-sm mt-1">
//                 Send your interest message (max 200 characters)
//               </p>
//             </div>

//             <div className="p-6">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message here..."
//                 className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//                 maxLength={200}
//               />
//               <div className="flex justify-between items-center mt-2">
//                 <span className={`text-sm ${message.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>
//                   {message.length}/200 characters
//                 </span>
//               </div>

//               <div className="mt-6 flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowMessageModal(false);
//                     setMessage("");
//                   }}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleExpressInterest}
//                   disabled={expressInterestMutation.isPending}
//                   className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {expressInterestMutation.isPending ? (
//                     <span className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Interest"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  FiEye,
  FiMessageCircle,
  FiHeart,
  FiUser,
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiExternalLink,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchReceivedInterests, expressInterest } from "../../api/interest.api";
import { 
  initSocket, 
  onSocketEvent, 
  offSocketEvent
} from "../../lib/socket";
import { getAcceptedConnections } from "../../api/message.api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // Fetch interests received
  const { 
    data: interestsData, 
    isLoading: interestsLoading, 
    refetch: refetchInterests 
  } = useQuery({
    queryKey: ["interestsReceived", user?.profile_id],
    queryFn: () => fetchReceivedInterests(user?.profile_id),
    enabled: !!user?.profile_id,
  });

  // Fetch accepted connections for stats
  const { data: connectionsData } = useQuery({
    queryKey: ["acceptedConnections", user?.profile_id],
    queryFn: getAcceptedConnections,
    enabled: !!user?.profile_id,
  });

  // Express interest mutation
  const expressInterestMutation = useMutation({
    mutationFn: (data) => expressInterest(data),
    onSuccess: (data) => {
      toast.success("Interest expressed successfully!");
      refetchInterests();
      setShowMessageModal(false);
      setMessage("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to express interest");
    },
  });

  // Initialize socket connection
  useEffect(() => {
    if (user?.profile_id) {
      initSocket(user.profile_id);
      
      // Listen for interest acceptances
      onSocketEvent("interest_accepted", handleInterestAccepted);
      
      // Listen for new messages
      onSocketEvent("receive_message", handleNewMessage);
      
      return () => {
        offSocketEvent("interest_accepted", handleInterestAccepted);
        offSocketEvent("receive_message", handleNewMessage);
      };
    }
  }, [user?.profile_id]);

  // Handle interest acceptance notifications
  const handleInterestAccepted = (data) => {
    if (data.toUserId === user?.profile_id || data.fromUserId === user?.profile_id) {
      const otherUserName = data.profile?.full_name || "Someone";
      
      toast.success(`${otherUserName} accepted your interest! You can now chat.`);
      
      // Refresh interests and connections
      refetchInterests();
      queryClient.invalidateQueries(["acceptedConnections"]);
    }
  };

  // Handle new messages with user name display
  const handleNewMessage = (messageData) => {
    if (messageData.receiver_profile_id === user?.profile_id) {
      // Extract sender name from socket data or use fallback
      const senderName = messageData.senderName || messageData.sender_profile_id || "Someone";
      toast.info(`New message from ${senderName}`);
    }
  };

  // Calculate stats
  const totalInterests = interestsData?.count || 0;
  const pendingInterests = interestsData?.data?.filter(i => i.interest_status === 'P').length || 0;
  const acceptedInterests = interestsData?.data?.filter(i => i.interest_status === 'A').length || 0;
  const totalConnections = connectionsData?.count || 0;
  const unreadMessages = 0; // You can implement this based on your message model

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  // Handle expressing interest
  const handleExpressInterest = () => {
    if (!user?.paid_member || user.paid_member !== "Y") {
      toast.error("This feature is only available for paid members");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    expressInterestMutation.mutate({
      interest_from_pid: user.profile_id,
      interested_in_pid: selectedProfile.profile_id,
      interest_msg: message,
    });
  };

  // Open message modal
  const openMessageModal = (profile) => {
    if (!user?.paid_member || user.paid_member !== "Y") {
      toast.error("Please upgrade to premium to send messages");
      return;
    }
    setSelectedProfile(profile);
    setShowMessageModal(true);
  };

  // Navigate to messages with selected user
  const navigateToChat = (profile) => {
    if (!user?.paid_member || user.paid_member !== "Y") {
      toast.error("Please upgrade to premium to send messages");
      return;
    }
    navigate(`/messages/${profile.profile_id}`);
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.map(n => n.charAt(0)).join("").toUpperCase();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'P': return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'A': return { bg: 'bg-green-100', text: 'text-green-800' };
      default: return { bg: 'bg-red-100', text: 'text-red-800' };
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'P': return 'Pending';
      case 'A': return 'Accepted';
      default: return 'Declined';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-8
          bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
          text-white shadow-xl"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name || "User"}! 👋</h1>
              <p className="text-white/80 mt-2 text-sm sm:text-base">
                Manage your matrimony profile and connect with potential matches
              </p>
              {!user?.paid_member || user.paid_member !== "Y" ? (
                <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
                  <FiAlertCircle className="text-yellow-300" />
                  <span className="text-yellow-100 text-sm">
                    Upgrade to Premium for unlimited messaging
                  </span>
                </div>
              ) : (
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg">
                  <FiCheckCircle className="text-green-300" />
                  <span className="text-green-100 text-sm">
                    Premium Member - All features unlocked
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
                <FiUser size={20} />
                <span className="font-medium text-sm">Dashboard</span>
              </div>
              {user?.profile_id && (
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl">
                  <span className="font-medium text-sm">ID: {user.profile_id}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Responsive */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          
          {/* Profile Views */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Profile Views</h3>
                <p className="text-2xl sm:text-3xl font-bold mt-1">0</p>
                <p className="text-gray-400 text-xs mt-1">+0 this week</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600 ml-2">
                <FiEye size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Messages</h3>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{unreadMessages}</p>
                <p className="text-gray-400 text-xs mt-1">Unread: {unreadMessages}</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-purple-100 text-purple-600 ml-2">
                <FiMessageCircle size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>

          {/* Interests Received */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Interests Received</h3>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{totalInterests}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Pending: {pendingInterests} | Accepted: {acceptedInterests}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-green-100 text-green-600 ml-2">
                <FiHeart size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>

          {/* Active Connections */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Active Connections</h3>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{totalConnections}</p>
                <p className="text-gray-400 text-xs mt-1">Chat enabled</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-red-100 text-red-600 ml-2">
                <FiUsers size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Two Column Layout - Responsive */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Profiles Interested in You */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Profiles Interested in You
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiClock size={16} />
                    <span>Recent</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  These users have shown interest in your profile
                </p>
              </div>

              <div className="p-4 sm:p-6">
                {interestsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                  </div>
                ) : interestsData?.data?.length > 0 ? (
                  <div className="space-y-4">
                    {interestsData.data.map((interest) => {
                      const statusColor = getStatusColor(interest.interest_status);
                      const initials = getUserInitials(interest.from_profile?.full_name);
                      
                      return (
                        <motion.div
                          key={interest._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {initials}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                                  {interest.from_profile?.full_name || "Unknown User"}
                                </h3>
                                <Link
                                  to={`/profile/${interest.from_profile?.profile_id}`}
                                  className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm flex items-center gap-1"
                                  title="View Profile"
                                >
                                  <FiExternalLink size={12} />
                                </Link>
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                {interest.from_profile?.residing_city || "Location not specified"}
                              </p>
                              <p className="text-xs text-gray-400 mt-1 truncate">
                                Message: "{interest.interest_msg}"
                              </p>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className={`px-2 py-1 rounded text-xs ${statusColor.bg} ${statusColor.text}`}>
                                  {getStatusText(interest.interest_status)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {new Date(interest.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 self-end sm:self-auto">
                            {interest.interest_status === 'A' ? (
                              <button
                                onClick={() => navigateToChat(interest.from_profile)}
                                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
                              >
                                <FiMessageCircle size={16} />
                                <span className="hidden sm:inline">Chat Now</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => openMessageModal(interest.from_profile)}
                                  disabled={!user?.paid_member || user.paid_member !== "Y"}
                                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                                    user?.paid_member === "Y"
                                      ? "bg-primary-500 text-white hover:bg-primary-600"
                                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  }`}
                                  title={user?.paid_member !== "Y" ? "Upgrade to send messages" : ""}
                                >
                                  <FiMessageCircle size={16} />
                                  <span className="hidden sm:inline">Reply</span>
                                </button>
                                {interest.interest_status === 'P' && (
                                  <button
                                    onClick={() => {
                                      // Handle edit interest
                                      setSelectedProfile(interest.from_profile);
                                      setMessage(interest.interest_msg);
                                      setShowMessageModal(true);
                                    }}
                                    className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                                    title="Edit Message"
                                  >
                                    <FiEdit2 size={16} />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiUsers className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No interests yet
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto px-4">
                      Complete your profile and upload photos to increase visibility and receive interests from potential matches.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h3 className="font-bold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FiHeart className="text-green-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{totalInterests} interests</span> received
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiMessageCircle className="text-blue-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{acceptedInterests} connections</span> accepted
                    </p>
                    <p className="text-xs text-gray-500">Ready to chat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {getUserInitials(selectedProfile?.full_name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Message {selectedProfile?.full_name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedProfile?.residing_city || "Location not specified"}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Send your interest message (max 200 characters)
              </p>
            </div>

            <div className="p-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-sm ${message.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>
                  {message.length}/200 characters
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessage("");
                    setSelectedProfile(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExpressInterest}
                  disabled={expressInterestMutation.isPending || !message.trim()}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    expressInterestMutation.isPending || !message.trim()
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {expressInterestMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Sending...
                    </span>
                  ) : selectedProfile ? (
                    "Send Interest"
                  ) : (
                    "Update Message"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;