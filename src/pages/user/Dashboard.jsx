import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
  FiChevronRight,
  FiTrendingUp,
  FiBell,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiStar,
  FiZap,
  FiMenu,
  FiX,
  FiChevronDown
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
  const queryClient = useQueryClient();
  
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Refs for animations
  const statsRef = useRef(null);

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
      toast.success("Interest sent successfully!");
      refetchInterests();
      setShowMessageModal(false);
      setMessage("");
      setSelectedProfile(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send interest");
    },
  });

  // Initialize socket connection
  useEffect(() => {
    if (user?.profile_id) {
      initSocket(user.profile_id);
      
      onSocketEvent("interest_accepted", handleInterestAccepted);
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
      
      toast.success(
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-white" size={16} />
          </div>
          <div>
            <p className="font-semibold">{otherUserName} accepted your interest!</p>
            <p className="text-sm opacity-90">You can now start chatting</p>
          </div>
        </div>
      );
      
      refetchInterests();
      queryClient.invalidateQueries(["acceptedConnections"]);
    }
  };

  // Handle new messages
  const handleNewMessage = (messageData) => {
    if (messageData.receiver_profile_id === user?.profile_id) {
      const senderName = messageData.senderName || messageData.sender_profile_id || "Someone";
      toast.info(
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <FiMessageCircle className="text-white" size={16} />
          </div>
          <div>
            <p className="font-semibold">New message from {senderName}</p>
            <p className="text-sm opacity-90 truncate max-w-xs">{messageData.message}</p>
          </div>
        </div>
      );
    }
  };

  // Calculate stats with animation data
  const stats = {
    totalViews: 0,
    totalMessages: 0,
    totalInterests: interestsData?.count || 0,
    pendingInterests: interestsData?.data?.filter(i => i.interest_status === 'P').length || 0,
    acceptedInterests: interestsData?.data?.filter(i => i.interest_status === 'A').length || 0,
    totalConnections: connectionsData?.count || 0,
    unreadMessages: 0,
  };

  // Filter interests based on active filter and search
  const filteredInterests = interestsData?.data?.filter(interest => {
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "pending" && interest.interest_status === 'P') ||
      (activeFilter === "accepted" && interest.interest_status === 'A');
    
    const matchesSearch = searchTerm === "" || 
      interest.from_profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interest.interest_msg?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  }) || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  // Handle expressing interest
  const handleExpressInterest = () => {
    if (!user?.paid_member || user.paid_member !== "Y") {
      toast.error("Please upgrade to premium to send messages");
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
    setMessage("");
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

  // Get user initials for avatar with gradient
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.map(n => n.charAt(0)).join("").toUpperCase().substring(0, 2);
  };

  // Generate gradient based on name
  const getGradientFromName = (name) => {
    const colors = [
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
      "from-pink-500 to-rose-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-blue-500",
      "from-emerald-500 to-green-500"
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  // Get status color and icon
  const getStatusConfig = (status) => {
    switch(status) {
      case 'P': 
        return { 
          bg: 'bg-yellow-50', 
          text: 'text-yellow-700', 
          border: 'border-yellow-200',
          icon: <FiClock className="text-yellow-500" />
        };
      case 'A': 
        return { 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200',
          icon: <FiCheckCircle className="text-emerald-500" />
        };
      default: 
        return { 
          bg: 'bg-red-50', 
          text: 'text-red-700', 
          border: 'border-red-200',
          icon: <FiAlertCircle className="text-red-500" />
        };
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'P': return 'Pending';
      case 'A': return 'Accepted';
      default: return 'Declined';
    }
  };

  // Stats cards data
  const statCards = [
    {
      title: "Profile Views",
      value: stats.totalViews,
      change: "+0",
      icon: <FiEye className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      trend: "flat"
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      change: "+0",
      icon: <FiMessageCircle className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-600",
      trend: "up"
    },
    {
      title: "Interests Received",
      value: stats.totalInterests,
      change: `Pending: ${stats.pendingInterests}`,
      icon: <FiHeart className="w-5 h-5" />,
      color: "text-rose-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100",
      iconBg: "bg-gradient-to-r from-rose-500 to-pink-600",
      trend: "up"
    },
    {
      title: "Active Connections",
      value: stats.totalConnections,
      change: `Accepted: ${stats.acceptedInterests}`,
      icon: <FiUsers className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 pt-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200"
      >
        <FiMenu className="w-6 h-6 text-gray-700" />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pt-20 lg:pt-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 lg:mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{user?.name || "User"}!</span> 👋
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Here's what's happening with your matrimony profile today
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              {/* Membership Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${user?.paid_member === "Y" ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200' : 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'}`}>
                {user?.paid_member === "Y" ? (
                  <>
                    <FiStar className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Premium Member</span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">Free Member</span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Stats Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Active now</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Profile visibility: Good</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              // variants={itemVariants}
              whileHover="hover"
              variants={{ ...itemVariants, hover: cardHoverVariants.hover }}
              className={`relative overflow-hidden rounded-2xl p-5 ${stat.bgColor} border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl ${stat.iconBg} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {stat.change}
                      {stat.trend === 'up' && <FiTrendingUp className="w-3 h-3" />}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="flex items-end gap-2">
                  <p className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  {stat.trend === 'up' && (
                    <span className="text-green-500 text-sm mb-1">↗</span>
                  )}
                </div>
              </div>
              
              {/* Animated background element */}
              <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8 opacity-10">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-current to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Interests */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Header with Filters */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                      Profiles Interested in You
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Manage and connect with interested profiles
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {filteredInterests.length} of {interestsData?.data?.length || 0} profiles
                    </span>
                  </div>
                </div>
                
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search profiles or messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeFilter === "all" ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveFilter("pending")}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeFilter === "pending" ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveFilter("accepted")}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeFilter === "accepted" ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      Accepted
                    </button>
                  </div>
                </div>
              </div>

              {/* Interests List */}
              <div className="p-6">
                {interestsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Loading interests...</p>
                  </div>
                ) : filteredInterests.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {filteredInterests.map((interest, index) => {
                      const statusConfig = getStatusConfig(interest.interest_status);
                      const initials = getUserInitials(interest.from_profile?.full_name);
                      const gradient = getGradientFromName(interest.from_profile?.full_name);
                      
                      return (
                        <motion.div
                          key={interest._id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.01 }}
                          className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
                        >
                          {/* Background Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/0 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          
                          <div className="relative p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                              {/* Profile Avatar */}
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                    {initials}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 text-lg">
                                      {interest.from_profile?.full_name || "Unknown User"}
                                    </h3>
                                    <Link
                                      to={`/profile/${interest.from_profile?.profile_id}`}
                                      className="text-blue-500 hover:text-blue-600 transition-colors"
                                      title="View Profile"
                                    >
                                      <FiExternalLink className="w-4 h-4" />
                                    </Link>
                                  </div>
                                  
                                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                    <span>📍 {interest.from_profile?.residing_city || "Location not specified"}</span>
                                    <span>•</span>
                                    <span>👤 {interest.from_profile?.age || "Age not specified"}</span>
                                  </div>
                                  
                                  {/* Status Badge */}
                                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border} text-xs font-medium`}>
                                    {statusConfig.icon}
                                    {getStatusText(interest.interest_status)}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Message Preview */}
                              <div className="flex-1 sm:ml-4">
                                <div className="mb-3">
                                  <p className="text-sm text-gray-500 mb-1">Message:</p>
                                  <p className="text-gray-700 line-clamp-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    "{interest.interest_msg}"
                                  </p>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400">
                                    {new Date(interest.createdAt).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                  
                                  <div className="flex items-center gap-2">
                                    {interest.interest_status === 'A' ? (
                                      <button
                                        onClick={() => navigateToChat(interest.from_profile)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                      >
                                        <FiMessageCircle className="w-4 h-4" />
                                        <span className="font-medium">Chat Now</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => openMessageModal(interest.from_profile)}
                                        disabled={!user?.paid_member || user.paid_member !== "Y"}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${user?.paid_member === "Y" 
                                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5' 
                                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                        title={user?.paid_member !== "Y" ? "Upgrade to send messages" : ""}
                                      >
                                        <FiMessageCircle className="w-4 h-4" />
                                        <span>Reply</span>
                                      </button>
                                    )}
                                    
                                    {interest.interest_status === 'P' && (
                                      <button
                                        onClick={() => {
                                          setSelectedProfile(interest.from_profile);
                                          setMessage(interest.interest_msg);
                                          setShowMessageModal(true);
                                        }}
                                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                        title="Edit Message"
                                      >
                                        <FiEdit2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 lg:py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <FiHeart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {searchTerm || activeFilter !== "all" ? 'No matching interests found' : 'No interests yet'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      {searchTerm || activeFilter !== "all" 
                        ? 'Try changing your search or filter criteria'
                        : 'Complete your profile and upload photos to increase visibility and receive interests from potential matches.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
                <FiClock className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <FiHeart className="w-4 h-4 text-rose-500" />, 
                    title: `${stats.totalInterests} interests received`,
                    description: "This month",
                    time: "2 hours ago",
                    color: "bg-rose-50",
                    border: "border-rose-100"
                  },
                  { 
                    icon: <FiMessageCircle className="w-4 h-4 text-blue-500" />, 
                    title: `${stats.acceptedInterests} connections accepted`,
                    description: "Ready to chat",
                    time: "1 day ago",
                    color: "bg-blue-50",
                    border: "border-blue-100"
                  },
                  { 
                    icon: <FiEye className="w-4 h-4 text-green-500" />, 
                    title: "Profile viewed 15 times",
                    description: "Increased visibility",
                    time: "2 days ago",
                    color: "bg-green-50",
                    border: "border-green-100"
                  },
                ].map((activity, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border ${activity.border} ${activity.color} transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Membership Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FiStar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Membership Status</h3>
                  <p className="text-sm opacity-90">Unlock premium features</p>
                </div>
              </div>
              
              {user?.paid_member === "Y" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FiCheckCircle className="w-4 h-4 text-green-300" />
                    <span>Unlimited messaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiCheckCircle className="w-4 h-4 text-green-300" />
                    <span>Advanced search filters</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiCheckCircle className="w-4 h-4 text-green-300" />
                    <span>Priority customer support</span>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm opacity-90">Premium until Dec 2024</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm opacity-90 mb-4">
                    Upgrade to premium for unlimited messaging and advanced features
                  </p>
                  <button
                    onClick={() => navigate('/user/upgrade')}
                    className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowMessageModal(false);
                setMessage("");
                setSelectedProfile(null);
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${getGradientFromName(selectedProfile?.full_name)} flex items-center justify-center text-white font-bold text-xl`}>
                    {getUserInitials(selectedProfile?.full_name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      Message {selectedProfile?.full_name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {selectedProfile?.residing_city || "Location not specified"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowMessageModal(false);
                      setMessage("");
                      setSelectedProfile(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your personalized message here... (Be specific about why you're interested)"
                      className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                      maxLength={500}
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-sm ${message.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                        {message.length}/500
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-500">
                    <p>💡 Tip: Mention something specific from their profile for better response</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowMessageModal(false);
                      setMessage("");
                      setSelectedProfile(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExpressInterest}
                    disabled={expressInterestMutation.isPending || !message.trim()}
                    className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                      expressInterestMutation.isPending || !message.trim()
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    {expressInterestMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl">
              {/* Sidebar content */}
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                {/* Add sidebar navigation items here */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;