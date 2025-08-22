import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import {
  fetchReceivedInterests,
  fetchSentInterests,
  respondToInterest,
  // acceptInterest,
  // declineInterest,
  withdrawInterest,
} from "../../api/interest.api";

const Interests = () => {
  const { user } = useAuth();
  const pid = user?.profile_id;
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("received");
  const [pageReceived, setPageReceived] = useState(1);
  const [pageSent, setPageSent] = useState(1);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [currentInterestId, setCurrentInterestId] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState(""); // "accepted" or "declined"

  useEffect(() => {
    document.title = "Interests | Guthandhan";
  }, []);

  const {
    data: receivedData,
    isLoading: loadingReceived,
    isError: errorReceived,
  } = useQuery({
    queryKey: ["interests", "received", pid, pageReceived],
    queryFn: () => fetchReceivedInterests(pid, pageReceived),
    enabled: !!pid,
  });

  const {
    data: sentData,
    isLoading: loadingSent,
    isError: errorSent,
  } = useQuery({
    queryKey: ["interests", "sent", pid, pageSent],
    queryFn: () => fetchSentInterests(pid, pageSent),
    enabled: !!pid,
  });

  const withdrawInterestMutation = useMutation({
    mutationFn: ({ id, requester_profile_id }) =>
      withdrawInterest(id, requester_profile_id),
    onSuccess: () => {
      toast.success("Interest withdrawn");
      queryClient.invalidateQueries({
        queryKey: ["interests", "sent", pid, pageSent],
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
      toast.success("Response submitted successfully");

      // REMOVE interest from cache immediately
      queryClient.setQueryData(
        ["interests", "received", pid, pageReceived],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((item) => item._id !== variables.id),
          };
        }
      );

      // Close modal and reset
      setShowRespondModal(false);
      setResponseMsg("");
      setResponseStatus("");
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to respond to interest"
      ),
  });

  const handleAccept = (id) => {
    setCurrentInterestId(id);
    setResponseStatus("A");
    setShowRespondModal(true);
  };

  const handleDecline = (id) => {
    setCurrentInterestId(id);
    setResponseStatus("D");
    setShowRespondModal(true);
  };


  const renderInterestCard = (interest, tab) => {
    const profile =
      tab === "received" ? interest.from_profile : interest.to_profile;

    return (
      <div
        key={interest._id}
        className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between"
      >
        <div className="flex items-center">
          <img
            src={profile?.photos?.[0]}
            alt={profile?.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="font-semibold">{profile?.full_name}</h3>
            <p className="text-neutral-600">{profile?.residing_city}</p>
          </div>
        </div>

        {tab === "received" ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleAccept(interest._id)}
              className="btn-primary"
            >
              Accept
            </button>
            <button
              onClick={() => handleDecline(interest._id)}
              className="btn-outline"
            >
              Decline
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              withdrawInterestMutation.mutate({
                id: interest._id,
                requester_profile_id: user.profile_id,
              })
            }
            className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
          >
            Withdraw Interest
          </button>
        )}
      </div>
    );
  };

  const renderTabContent = (tab) => {
    const isLoading = tab === "received" ? loadingReceived : loadingSent;
    const isError = tab === "received" ? errorReceived : errorSent;
    const data = tab === "received" ? receivedData : sentData;
    const page = tab === "received" ? pageReceived : pageSent;
    const setPage = tab === "received" ? setPageReceived : setPageSent;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">Error loading interests.</p>
        </div>
      );
    }


    if (!data?.data?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-neutral-600">
            {tab === "received"
              ? "No received interests yet."
              : "You haven't sent any interests yet."}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-6">
          {data.data
            .filter((interest) => interest.interest_status == "P")
            .map((interest) => renderInterestCard(interest, tab))}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn-outline px-4 py-2"
          >
            Previous
          </button>
          <span>
            Page {data.currentPage} of {data.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((prev) =>
                data.totalPages ? Math.min(prev + 1, data.totalPages) : prev
              )
            }
            disabled={page === data.totalPages}
            className="btn-outline px-4 py-2"
          >
            Next
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Interests</h1>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 mb-8">
          <button
            onClick={() => setActiveTab("received")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "received"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Received (
            {receivedData?.data?.filter(
              (interest) => interest.interest_status === "P"
            ).length ?? 0}
            )
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "sent"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Sent ({sentData?.count ?? 0})
          </button>
        </div>

        {renderTabContent(activeTab)}
      </motion.div>
      {showRespondModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Respond to Interest</h2>

            <textarea
              rows={4}
              value={responseMsg}
              onChange={(e) => setResponseMsg(e.target.value)}
              placeholder="Write your response message here..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                className="btn-outline"
                onClick={() => setShowRespondModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                disabled={respondToInterestMutation.isLoading}
                onClick={() => {
                  if (!responseStatus) {
                    toast.error("Please select accept or decline");
                    return;
                  }
                  respondToInterestMutation.mutate({
                    id: currentInterestId,
                    response_msg: responseMsg,
                    interest_status: responseStatus,
                    responding_profile_id: pid,
                  });
                  setShowRespondModal(false);
                  setResponseMsg("");
                  setResponseStatus("");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interests;
