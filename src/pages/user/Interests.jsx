import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  fetchReceivedInterests,
  fetchSentInterests,
  respondToInterest,
  withdrawInterest,
} from "../../api/interest.api";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  Inbox,
  Send,
  Heart,
  HeartOff,
  ExternalLink,
} from "lucide-react";

const Interests = () => {
  const { user } = useAuth();
  const pid = user?.profile_id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("received");
  const [pageReceived, setPageReceived] = useState(1);
  const [pageSent, setPageSent] = useState(1);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [currentInterest, setCurrentInterest] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    document.title = "Interests | Guthandhan";
  }, []);

  const {
    data: receivedData,
    isLoading: loadingReceived,
    isError: errorReceived,
    refetch: refetchReceived,
  } = useQuery({
    queryKey: ["interests", "received", pid, pageReceived, filterStatus],
    queryFn: () =>
      fetchReceivedInterests(
        pid,
        pageReceived,
        10,
        filterStatus !== "all" ? filterStatus : undefined
      ),
    enabled: !!pid,
    staleTime: 30000, // Cache for 30 seconds
  });

  const {
    data: sentData,
    isLoading: loadingSent,
    isError: errorSent,
    refetch: refetchSent,
  } = useQuery({
    queryKey: ["interests", "sent", pid, pageSent],
    queryFn: () => fetchSentInterests(pid, pageSent),
    enabled: !!pid,
    staleTime: 30000,
  });

  const withdrawInterestMutation = useMutation({
    mutationFn: ({ id, requester_profile_id }) =>
      withdrawInterest(id, requester_profile_id),
    onSuccess: () => {
      toast.success("Interest withdrawn successfully");
      queryClient.invalidateQueries({
        queryKey: ["interests", "sent", pid],
      });
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to withdraw interest"
      ),
  });

  const respondToInterestMutation = useMutation({
    mutationFn: respondToInterest,
    onSuccess: (_, variables) => {
      toast.success(
        variables.interest_status === "A"
          ? "Interest accepted successfully"
          : "Interest declined"
      );

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ["interests", "received", pid],
      });
      queryClient.invalidateQueries({
        queryKey: ["interests", "sent", pid],
      });

      // Close modal and reset
      setShowRespondModal(false);
      setResponseMsg("");
      setResponseStatus("");
      setCurrentInterest(null);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to respond to interest"
      );
    },
  });

  // Memoized handlers
  const handleAccept = useCallback((interest) => {
    setCurrentInterest(interest);
    setResponseStatus("A");
    setShowRespondModal(true);
  }, []);

  const handleDecline = useCallback((interest) => {
    setCurrentInterest(interest);
    setResponseStatus("D");
    setShowRespondModal(true);
  }, []);

  const handleImageError = useCallback((profileId) => {
    setImageErrors((prev) => ({
      ...prev,
      [profileId]: true,
    }));
  }, []);

  // Memoized status badge component
  const getStatusBadge = useCallback((status) => {
    const badges = {
      P: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
          <Clock size={12} className="flex-shrink-0" /> Pending
        </span>
      ),
      A: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
          <CheckCircle size={12} className="flex-shrink-0" /> Accepted
        </span>
      ),
      D: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-medium border border-rose-200">
          <XCircle size={12} className="flex-shrink-0" /> Declined
        </span>
      ),
    };
    return badges[status] || null;
  }, []);

  // Memoized interest card renderer
  const renderInterestCard = useCallback(
    (interest, tab) => {
      const profile =
        tab === "received" ? interest.from_profile : interest.to_profile;
      const profileId = profile?._id;

      if (!profile) {
        console.warn("Profile data missing for interest:", interest);
        return null;
      }

      const profileImage = imageErrors[profileId]
        ? "/default-avatar.png"
        : profile?.photos?.[0] || "/default-avatar.png";

      return (
        <motion.div
          key={interest._id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-start gap-5">
              <div className="relative flex-shrink-0">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-md">
                  <img
                    src={profileImage}
                    alt={profile?.full_name || "User"}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(profileId)}
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-full shadow-lg">
                  <User size={14} className="text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 truncate">
                    {profile?.full_name || "Unknown User"}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(interest.interest_status)}
                    {tab === "received" && interest.interest_status === "P" && (
                      <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </div>
                </div>

                {profile?.residing_city && (
                  <p className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="font-medium">{profile.residing_city}</span>
                  </p>
                )}

                {/* Interest Message */}
                <div className="space-y-3">
                  {interest.interest_msg && tab === "received" && (
                    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">
                          Their Message
                        </span>
                      </div>
                      <p className="text-blue-800 text-sm leading-relaxed pl-6">
                        "{interest.interest_msg}"
                      </p>
                    </div>
                  )}

                  {interest.response_msg &&
                    interest.interest_status !== "P" && (
                      <div
                        className={`relative rounded-xl p-4 border ${
                          interest.interest_status === "A"
                            ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100"
                            : "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {interest.interest_status === "A" ? (
                            <CheckCircle
                              size={16}
                              className="text-emerald-600"
                            />
                          ) : (
                            <XCircle size={16} className="text-rose-600" />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              interest.interest_status === "A"
                                ? "text-emerald-700"
                                : "text-rose-700"
                            }`}
                          >
                            Your Response
                          </span>
                        </div>
                        <p
                          className={`text-sm leading-relaxed pl-6 ${
                            interest.interest_status === "A"
                              ? "text-emerald-800"
                              : "text-rose-800"
                          }`}
                        >
                          "{interest.response_msg}"
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              {tab === "received" && interest.interest_status === "P" ? (
                <>
                  <button
                    onClick={() => handleAccept(interest)}
                    className="group relative flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <CheckCircle
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Accept Interest
                  </button>
                  <button
                    onClick={() => handleDecline(interest)}
                    className="group relative flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <XCircle
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Decline
                  </button>
                </>
              ) : tab === "sent" && interest.interest_status === "P" ? (
                <button
                  onClick={() =>
                    withdrawInterestMutation.mutate({
                      id: interest._id,
                      requester_profile_id: pid,
                    })
                  }
                  disabled={withdrawInterestMutation.isLoading}
                  className="group relative flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-rose-500 text-rose-600 rounded-xl hover:bg-rose-50 transition-all duration-300 font-semibold hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {withdrawInterestMutation.isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                      Withdrawing...
                    </>
                  ) : (
                    <>
                      <HeartOff
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                      Withdraw Interest
                    </>
                  )}
                </button>
              ) : null}

              {/* View Profile Button */}
              <button
                onClick={() => {
                  const profileId =
                    tab === "received"
                      ? interest.interest_from_pid
                      : interest.interested_in_pid;

                  if (profileId) {
                    navigate(`/profile/${profileId}`);
                  }
                }}
                className="group relative flex items-center justify-center gap-3 px-6 py-3.5 
             border-2 border-primary-500 text-primary-600 rounded-xl 
             hover:bg-primary-50 transition-all duration-300 
             font-semibold hover:-translate-y-0.5"
              >
                <ExternalLink
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                View Profile
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  Sent:{" "}
                  {new Date(interest.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {interest.updatedAt !== interest.createdAt && (
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    Updated:{" "}
                    {new Date(interest.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <div className="text-primary-600 font-medium">
                Interest ID: {interest._id.slice(-8)}
              </div>
            </div>
          </div>
        </motion.div>
      );
    },
    [
      getStatusBadge,
      handleAccept,
      handleDecline,
      handleImageError,
      imageErrors,
      pid,
      withdrawInterestMutation,
    ]
  );

  const renderTabContent = useCallback(
    (tab) => {
      const isLoading = tab === "received" ? loadingReceived : loadingSent;
      const isError = tab === "received" ? errorReceived : errorSent;
      const data = tab === "received" ? receivedData : sentData;

      if (isLoading) {
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-primary-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">
              Loading your interests...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This will just take a moment
            </p>
          </div>
        );
      }

      if (isError) {
        return (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Unable to Load Interests
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              There was an issue fetching your interests. Please check your
              connection and try again.
            </p>
            <button
              onClick={() =>
                tab === "received" ? refetchReceived() : refetchSent()
              }
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        );
      }

      const interests = data?.data || [];
      const totalItems = data?.total || 0;
      const totalPages = data?.totalPages || 1;
      const currentPage = data?.currentPage || 1;

      if (interests.length === 0) {
        return (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center">
              {tab === "received" ? (
                <Inbox className="w-16 h-16 text-gray-400" />
              ) : (
                <Send className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {tab === "received" ? "No Interests Yet" : "No Sent Interests"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
              {tab === "received"
                ? "When someone shows interest in your profile, you'll see it here. Stay tuned!"
                : "You haven't sent any interests yet. Discover amazing profiles and make connections."}
            </p>
            {tab === "sent" && (
              <button
                onClick={() => navigate("/browse")}
                className="group px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <Heart className="group-hover:scale-110 transition-transform" />
                  Browse Profiles
                </span>
              </button>
            )}
          </div>
        );
      }

      return (
        <>
          {/* Interest Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${filterStatus}-${pageReceived}-${pageSent}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {interests.map((interest) => renderInterestCard(interest, tab))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    {(currentPage - 1) * 10 + 1}-
                    {Math.min(currentPage * 10, totalItems)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {totalItems}
                  </span>{" "}
                  interests
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      tab === "received"
                        ? setPageReceived((prev) => Math.max(prev - 1, 1))
                        : setPageSent((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() =>
                            tab === "received"
                              ? setPageReceived(pageNum)
                              : setPageSent(pageNum)
                          }
                          className={`w-11 h-11 rounded-xl transition-all duration-300 font-medium ${
                            (tab === "received" ? pageReceived : pageSent) ===
                            pageNum
                              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                              : "border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      tab === "received"
                        ? setPageReceived((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        : setPageSent((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
    [
      loadingReceived,
      loadingSent,
      errorReceived,
      errorSent,
      receivedData,
      sentData,
      filterStatus,
      pageReceived,
      pageSent,
      refetchReceived,
      refetchSent,
      renderInterestCard,
    ]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -z-10">
            <div className="w-96 h-96 bg-gradient-to-br from-primary-100/20 to-primary-200/20 rounded-full blur-3xl"></div>
          </div>

          {/* Header */}
          <div className="text-center my-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Interest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                Manager
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Manage your connections, respond to interests, and build
              meaningful relationships
            </motion.p>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <button
              onClick={() => {
                setActiveTab("received");
                setFilterStatus("all");
              }}
              className={`relative group p-6 rounded-2xl transition-all duration-500 transform ${
                activeTab === "received"
                  ? "bg-gradient-to-br from-white to-gray-50 shadow-2xl border-2 border-primary-200 scale-105"
                  : "bg-white shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-xl ${
                    activeTab === "received"
                      ? "bg-gradient-to-br from-primary-500 to-primary-600"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary-100 group-hover:to-primary-200"
                  } transition-all duration-300`}
                >
                  <Inbox
                    className={`w-8 h-8 ${
                      activeTab === "received"
                        ? "text-white"
                        : "text-gray-600 group-hover:text-primary-600"
                    }`}
                  />
                </div>
                <div className="text-left">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      activeTab === "received"
                        ? "text-primary-700"
                        : "text-gray-800"
                    }`}
                  >
                    Received Interests
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Interests others sent to you
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-gray-700">
                      {receivedData?.total || 0} total
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                      {receivedData?.data?.filter(
                        (i) => i.interest_status === "P"
                      ).length || 0}{" "}
                      pending
                    </span>
                  </div>
                </div>
              </div>
              {activeTab === "received" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("sent")}
              className={`relative group p-6 rounded-2xl transition-all duration-500 transform ${
                activeTab === "sent"
                  ? "bg-gradient-to-br from-white to-gray-50 shadow-2xl border-2 border-primary-200 scale-105"
                  : "bg-white shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-xl ${
                    activeTab === "sent"
                      ? "bg-gradient-to-br from-primary-500 to-primary-600"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary-100 group-hover:to-primary-200"
                  } transition-all duration-300`}
                >
                  <Send
                    className={`w-8 h-8 ${
                      activeTab === "sent"
                        ? "text-white"
                        : "text-gray-600 group-hover:text-primary-600"
                    }`}
                  />
                </div>
                <div className="text-left">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      activeTab === "sent"
                        ? "text-primary-700"
                        : "text-gray-800"
                    }`}
                  >
                    Sent Interests
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Interests you've sent to others
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-gray-700">
                      {sentData?.total || 0} total
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                      {sentData?.data?.filter((i) => i.interest_status === "P")
                        .length || 0}{" "}
                      pending
                    </span>
                  </div>
                </div>
              </div>
              {activeTab === "sent" && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                </div>
              )}
            </button>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            {renderTabContent(activeTab)}
          </motion.div>
        </motion.div>
      </div>

      {/* Response Modal */}
      <AnimatePresence>
        {showRespondModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    responseStatus === "A"
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                      : "bg-gradient-to-br from-rose-500 to-rose-600"
                  }`}
                >
                  {responseStatus === "A" ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {responseStatus === "A"
                      ? "Accept Interest"
                      : "Decline Interest"}
                  </h2>
                  <p className="text-gray-600">
                    {responseStatus === "A"
                      ? "Send a warm welcome message"
                      : "Provide polite feedback (optional)"}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your Message
                  </label>
                  <span className="text-sm text-gray-500">
                    {responseMsg.length}/500
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={responseMsg}
                  onChange={(e) => setResponseMsg(e.target.value)}
                  placeholder={
                    responseStatus === "A"
                      ? "Example: Hi! I'd love to connect with you. Let's chat and get to know each other better..."
                      : "Example: Thank you for your interest. While I appreciate it, I don't feel we're the right match at this time. I wish you the best in your search..."
                  }
                  className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/50 resize-none"
                  maxLength={500}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowRespondModal(false);
                    setResponseMsg("");
                    setResponseStatus("");
                    setCurrentInterest(null);
                  }}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!currentInterest) return;

                    respondToInterestMutation.mutate({
                      id: currentInterest._id,
                      response_msg: responseMsg,
                      interest_status: responseStatus,
                      responding_profile_id: pid,
                    });
                  }}
                  disabled={respondToInterestMutation.isLoading}
                  className={`group flex-1 px-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
                    responseStatus === "A"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
                >
                  {respondToInterestMutation.isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      {responseStatus === "A" ? (
                        <>
                          <CheckCircle className="group-hover:scale-110 transition-transform" />
                          Accept Interest
                        </>
                      ) : (
                        <>
                          <XCircle className="group-hover:scale-110 transition-transform" />
                          Decline Interest
                        </>
                      )}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Interests;
