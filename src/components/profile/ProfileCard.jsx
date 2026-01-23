import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInterest,
  expressInterest,
  withdrawInterest,
} from "../../api/interest.api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  getAllShortlistedProfiles,
  addToShortlist,
  removeFromShortlist,
} from "../../api/shortlist.api";

const ProfileCard = ({ profile, showActions = true }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const baseurl = import.meta.env.VITE_BASE_URL;

  const queryClient = useQueryClient();

  const { data: interestsData } = useQuery({
    queryKey: ["interest"],
    queryFn: getAllInterest,
  });

  const isInterested = interestsData?.data?.some(
    (interest) =>
      interest.interest_from_pid === user.profile_id &&
      interest.interested_in_pid === profile.profile_id &&
      interest.interest_status !== "D"
  );

  const expressInterestMutation = useMutation({
    mutationFn: (payload) => expressInterest(payload),
    onSuccess: () => {
      toast.success("Interest expressed");
      queryClient.invalidateQueries(["interest"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to express interest"
      );
    },
  });

  const withdrawInterestMutation = useMutation({
    mutationFn: ({ id, requester_profile_id }) =>
      withdrawInterest(id, requester_profile_id),
    onSuccess: () => {
      toast.success("Interest withdrawn");
      queryClient.invalidateQueries(["interest"]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to withdraw interest"
      ),
  });

  const toggleInterest = () => {
    if (!user?.profile_id) {
      toast.error("You must complete your profile first.");
      return;
    }

    const payload = {
      interest_from_pid: user.profile_id,
      interested_in_pid: profile.profile_id,
    };

    // Find the existing interest record
    const existingInterest = interestsData?.data?.find(
      (interest) =>
        interest.interest_from_pid === user.profile_id &&
        interest.interested_in_pid === profile.profile_id
    );

    if (existingInterest) {
      withdrawInterestMutation.mutate({
        id: existingInterest._id,
        requester_profile_id: user.profile_id,
      });
    } else {
      expressInterestMutation.mutate({
        ...payload,
        interest_msg: "Hi, I'm interested in your profile",
      });
    }
  };

  const { data: shortlistedData } = useQuery({
    queryKey: ["shortlistedProfiles"],
    queryFn: getAllShortlistedProfiles,
  });

  const isShortlisted = shortlistedData?.data?.some(
    (item) =>
      item.shortlisted_by_pid === user.profile_id &&
      item.shortlisted_pid === profile.profile_id
  );

  const shortlistMutation = useMutation({
    mutationFn: (payload) => addToShortlist(payload),
    onSuccess: () => {
      toast.success("Profile shortlisted");
      queryClient.invalidateQueries(["shortlistedProfiles"]);
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to shortlist"),
  });

  const unshortlistMutation = useMutation({
    mutationFn: (payload) => removeFromShortlist(payload),
    onSuccess: () => {
      toast.success("Profile removed from shortlist");
      queryClient.invalidateQueries(["shortlistedProfiles"]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message || "Failed to remove from shortlist"
      ),
  });

  const toggleShortlist = () => {
    if (!user?.profile_id) {
      toast.error("You must complete your profile first.");
      return;
    }

    const payload = {
      shortlisted_by_pid: user.profile_id,
      shortlisted_pid: profile.profile_id,
    };

    if (isShortlisted) {
      unshortlistMutation.mutate(payload);
    } else {
      shortlistMutation.mutate(payload);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getProfileImage = () => {
    if (Array.isArray(profile.photos) && profile.photos.length > 0) {
      const photoUrl = profile.photos[0]?.replace(/\\/g, "/");
      return photoUrl.startsWith("http") ? photoUrl : `${baseurl}${photoUrl}`;
    }
    return "/gutbandhan.png";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl shadow-md bg-white hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={getProfileImage()}
          alt={profile.first_name || "Profile"}
          className={`w-full h-full object-scale-down transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/gutbandhan.png";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {profile.verified && (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          )}
          {profile.premium && (
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Premium
            </span>
          )}
        </div>

        {/* Dark gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Age */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800">
            {profile.first_name || "User"}
            {profile.dob && (
              <span className="text-gray-600 font-normal ml-1">
                • {calculateAge(profile.dob)}
              </span>
            )}
          </h3>
          <span className="text-sm text-gray-500 capitalize">
            {profile.sex === "M" ? "Male" : profile.sex === "F" ? "Female" : ""}
          </span>
        </div>

        {/* Location */}
        {profile.residing_city && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {profile.residing_city}
          </div>
        )}

        {/* Hobbies/Interests */}
        {profile?.hobby && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {profile.hobby
                .split(",")
                .slice(0, 2)
                .map((hobby, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1 border border-blue-100"
                  >
                    {hobby.trim()}
                  </span>
                ))}
              {profile.hobby.split(",").length > 2 && (
                <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                  +{profile.hobby.split(",").length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* About (truncated) */}
        {profile.about && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {profile.about}
          </p>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex gap-2">
              {/* Interest Button */}
              <button
                onClick={toggleInterest}
                className={`p-2 rounded-full transition-colors ${
                  isInterested
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label={isInterested ? "Withdraw interest" : "Express interest"}
              >
                <svg
                  className="w-5 h-5"
                  fill={isInterested ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Shortlist Button */}
              <button
                onClick={toggleShortlist}
                className={`p-2 rounded-full transition-colors ${
                  isShortlisted
                    ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
              >
                <svg
                  className="w-5 h-5"
                  fill={isShortlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>

            <Link
              to={`/profile/${profile._id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              View Profile
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;