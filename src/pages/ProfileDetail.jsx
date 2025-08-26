// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import Loader from "../components/common/Loader";
// import mockProfiles from "../data/mockProfiles";

// const ProfileDetail = () => {
//   const { id } = useParams();
//   const { isAuthenticated } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activePhotoIndex, setActivePhotoIndex] = useState(0);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [reportReason, setReportReason] = useState("");

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       const foundProfile = mockProfiles.find((p) => p.id === parseInt(id));
//       setProfile(foundProfile);
//       setLoading(false);
//     }, 1000);
//   }, [id]);

//   const handleInterest = () => {
//     if (!isAuthenticated) {
//       toast.info("Please sign in to express interest");
//       return;
//     }
//     toast.success("Interest expressed successfully");
//   };

//   const handleSaveProfile = () => {
//     if (!isAuthenticated) {
//       toast.info("Please sign in to save profiles");
//       return;
//     }
//     toast.success("Profile saved successfully");
//   };

//   const handleMessage = () => {
//     if (!isAuthenticated) {
//       toast.info("Please sign in to send messages");
//       return;
//     }
//     toast.success("Redirecting to messages...");
//   };

//   const handleReport = (e) => {
//     e.preventDefault();
//     if (!reportReason.trim()) {
//       toast.error("Please provide a reason for reporting");
//       return;
//     }
//     toast.success("Report submitted successfully");
//     setShowReportModal(false);
//     setReportReason("");
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (!profile) {
//     return (
//       <div className="container-custom py-12">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
//           <p className="text-neutral-600 mb-8">
//             The profile you're looking for doesn't exist or has been removed.
//           </p>
//           <Link to="/browse" className="btn-primary">
//             Browse Other Profiles
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50 pt-20 pb-12">
//       <div className="container-custom px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-5xl mx-auto"
//         >
//           {/* Profile Header */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div className="grid lg:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8">
//               {/* Photos Section */}
//               <div className="space-y-4">
//                 <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
//                   <img
//                     src={profile.photos[activePhotoIndex]}
//                     alt={`${profile.name}'s photo ${activePhotoIndex + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 gap-2 sm:gap-4">
//                   {profile.photos.map((photo, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActivePhotoIndex(index)}
//                       className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
//                         activePhotoIndex === index
//                           ? "border-primary-500"
//                           : "border-transparent hover:border-primary-300"
//                       }`}
//                     >
//                       <img
//                         src={photo}
//                         alt={`${profile.name}'s photo ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Profile Info */}
//               <div className="space-y-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//                       {profile.name}, {profile.age}
//                     </h1>
//                     <p className="text-neutral-600 flex items-center flex-wrap gap-2">
//                       <span>{profile.location}</span>
//                       {profile.verified && (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
//                           Verified
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setShowReportModal(true)}
//                     className="text-neutral-400 hover:text-neutral-600"
//                   >
//                     Report
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <h2 className="text-lg font-semibold mb-2">About Me</h2>
//                     <p className="text-neutral-600">{profile.bio}</p>
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
//                     <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <dt className="text-sm text-neutral-500">Occupation</dt>
//                         <dd className="font-medium">{profile.occupation}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm text-neutral-500">Education</dt>
//                         <dd className="font-medium">{profile.education}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm text-neutral-500">
//                           Looking For
//                         </dt>
//                         <dd className="font-medium">
//                           {profile.relationshipGoals}
//                         </dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm text-neutral-500">Height</dt>
//                         <dd className="font-medium">{profile.height} cm</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-semibold mb-2">Interests</h2>
//                     <div className="flex flex-wrap gap-2">
//                       {profile.interests.map((interest, index) => (
//                         <span
//                           key={index}
//                           className="px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
//                         >
//                           {interest}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="pt-6 flex flex-col sm:flex-row gap-4">
//                     <button
//                       onClick={handleInterest}
//                       className="btn-primary flex-1"
//                     >
//                       Express Interest
//                     </button>
//                     <button
//                       onClick={handleMessage}
//                       className="btn-outline flex-1"
//                     >
//                       Send Message
//                     </button>
//                     <button
//                       onClick={handleSaveProfile}
//                       className="btn-outline w-full sm:w-auto"
//                     >
//                       Save Profile
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Report Modal */}
//       {showReportModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl p-6 max-w-md w-full"
//           >
//             <h2 className="text-xl font-bold mb-4">Report Profile</h2>
//             <form onSubmit={handleReport}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-neutral-700 mb-1">
//                   Reason for reporting
//                 </label>
//                 <select
//                   value={reportReason}
//                   onChange={(e) => setReportReason(e.target.value)}
//                   className="input"
//                   required
//                 >
//                   <option value="">Select a reason</option>
//                   <option value="fake_profile">Fake Profile</option>
//                   <option value="inappropriate_content">
//                     Inappropriate Content
//                   </option>
//                   <option value="harassment">Harassment</option>
//                   <option value="spam">Spam</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div className="flex flex-col sm:flex-row justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowReportModal(false)}
//                   className="btn-outline w-full sm:w-auto"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-primary w-full sm:w-auto">
//                   Submit Report
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDetail;

// src/components/ProfileDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { expressInterest, searchInterestByProfiles } from "../api/interest.api";

const ProfileDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [profile, setProfile] = useState([]);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportReason, setReportReason] = React.useState("");

  const baseurl = import.meta.env.VITE_BASE_URL;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    enabled: !!id,
    staleTime: 0,
    // refetchOnMount: true,
  });

  useEffect(() => {
    if (response?.profile) setProfile(response.profile);
  }, [response?.profile]);

  const { data: searchedInterest, error } = useQuery({
    queryKey: ["searchInterest", user?.profile_id, id],
    queryFn: () =>
      searchInterestByProfiles(user.profile_id, profile.profile_id), // Pass both PIDs
    enabled: !!user?.profile_id && !!id && !!profile,
    staleTime: 0,
    // refetchOnMount: true,
  });

  const { mutate: expressInterestsent, isPending: isExpressing } = useMutation({
    mutationFn: () =>
      expressInterest({
        interest_from_pid: user.profile_id,
        interested_in_pid: profile.profile_id,
        interest_msg: "Hi, I'm interested in your profile",
      }),
    onSuccess: () => {
      toast.success("Interest expressed successfully");
      queryClient.invalidateQueries(["searchInterest", user?.profile_id, id]);
    },
    onError: () => {
      toast.error("Failed to express interest");
    },
  });

  const handleInterest = () => {
    if (!user?.profile_id) {
      toast.error("You must complete your profile first.");
      return;
    }
    if (!isAuthenticated) {
      toast.info("Please sign in to express interest");
      return;
    }
    expressInterestsent();
  };


  const handleMessage = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to send messages");
      return;
    }
    // Navigate to messages with the profile ID
    navigate(`/user/messages/${profile.profile_id}`);
  };

  const handleReport = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) {
      toast.error("Please provide a reason for reporting");
      return;
    }
    toast.success("Report submitted successfully");
    setShowReportModal(false);
    setReportReason("");
  };

  if (isLoading) return <Loader />;

  if (isError || !profile) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-neutral-600 mb-8">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse" className="btn-primary">
            Browse Other Profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
            {/* Left - Photos */}
            <div className="space-y-4">
              {Array.isArray(profile.photos) && profile.photos.length > 0 ? (
                <>
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
                    <img
                      src={`${baseurl}${profile.photos[
                        activePhotoIndex
                      ].replace(/\\/g, "/")}`}
                      alt={`Photo ${activePhotoIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {profile.photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          activePhotoIndex === idx
                            ? "border-primary-500"
                            : "border-transparent hover:border-primary-300"
                        }`}
                      >
                        <img
                          src={`${baseurl}${photo.replace(/\\/g, "/")}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="aspect-square rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                  {/* No Photos Available */}
                  <img
                    src="/gutbandhan.png"
                    alt="mage"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Right - Info */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {profile.first_name + " " + profile.last_name},{" "}
                    {profile.age}
                  </h1>
                  <p className="text-neutral-600 flex items-center flex-wrap gap-2">
                    <span>
                      {profile.residing_city || "Location not available"}
                    </span>
                    {profile.mobile_verified === "Y" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        Verified
                      </span>
                    )}
                    {profile.paid_member === "Y" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800">
                        Premium
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  Report
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">About Me</h2>
                  <p className="text-neutral-600">
                    {profile.about || "No bio provided."}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.occupation && (
                      <div>
                        <dt className="text-sm text-neutral-500">Occupation</dt>
                        <dd className="font-medium">{profile.occupation}</dd>
                      </div>
                    )}
                    {profile.education && (
                      <div>
                        <dt className="text-sm text-neutral-500">Education</dt>
                        <dd className="font-medium">{profile.education}</dd>
                      </div>
                    )}
                    {profile.marital_status && (
                      <div>
                        <dt className="text-sm text-neutral-500">
                          Marital Status
                        </dt>
                        <dd className="font-medium">
                          {profile.marital_status}
                        </dd>
                      </div>
                    )}
                    {profile.height && (
                      <div>
                        <dt className="text-sm text-neutral-500">Height</dt>
                        <dd className="font-medium">{profile.height} cm</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {profile.hobby && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.hobby.split(",").map((int, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
                        >
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <button onClick={handleInterest} className="btn-primary flex-1">
                    Express Interest
                  </button>
                  <button
                    onClick={handleMessage}
                    className="btn-outline flex-1"
                  >
                    Send Message
                  </button>
                  <button onClick={handleSaveProfile} className="btn-outline w-full sm:w-auto">
                    Save Profile
                  </button>
                </div> */}

                {/* <div className="pt-6 flex flex-col items-end sm:flex-row gap-4">
                  {searchedInterest?.data?.interest_status === "A" ? (
                    <button
                      onClick={handleMessage}
                      className="btn-outline flex-1"
                    >
                      Send Message
                    </button>
                  ) : (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-md mt-32">
                      You cannot message this profile until they accept your
                      interest request.
                    </p>
                  )}
                </div> */}

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  {searchedInterest?.data?.interest_status === "A" ? (
                    <button
                      onClick={handleMessage}
                      className="btn-outline flex-1 mt-32"
                    >
                      Send Message
                    </button>
                  ) : searchedInterest?.data?.interest_status === "P" ? (
                    <button
                      className="btn-outline flex-1 cursor-not-allowed mt-32"
                      disabled
                    >
                      Interest Sent (Pending)
                    </button>
                  ) : (
                    <button
                      onClick={handleInterest}
                      className="btn-primary flex-1 mt-32"
                      disabled={isExpressing}
                    >
                      {isExpressing ? "Sending..." : "Express Interest"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">Report Profile</h2>
            <form onSubmit={handleReport}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Reason for reporting
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="input w-full"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="fake_profile">Fake Profile</option>
                  <option value="inappropriate_content">
                    Inappropriate Content
                  </option>
                  <option value="harassment">Harassment</option>
                  <option value="spam">Spam</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="btn-outline w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Submit Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
