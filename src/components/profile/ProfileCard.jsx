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
      interest.interested_in_pid === profile.profile_id && interest.interest_status != 'D'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
         {Array.isArray(profile.photos) && profile.photos.length > 0 ? 
        <img
          src={`${baseurl}${profile.photos[0]?.replace(/\\/g, "/")}`}
          alt={profile.name}
          className={`w-full rounded-xl h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        /> :  <img
          src="/gutbandhan.png"
          alt="image"
          className={`w-full rounded-xl h-full object-contain transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />  }

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {profile.verified && (
            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
              ✔ Verified
            </span>
          )}
          {profile.premium && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
         
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
           <h3 className="text-xl font-bold">
            {profile.first_name}, {profile.age}
          </h3>
          <p className="text-sm">{profile.location}</p><br/>
          {profile?.hobby
            ?.split(",")
            .slice(0, 3)
            .map((hobby, index) => (
              <span
                key={index}
                className="bg-neutral-100 text-neutral-700 text-xs rounded-full px-3 py-1"
              >
                {hobby}
              </span>
            ))}
          {profile?.hobby?.split(",").length > 3 && (
            <span className="bg-neutral-100 text-neutral-700 text-xs rounded-full px-3 py-1">
              +{profile.hobby?.split(",").length - 3} more
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
          {profile.about}
        </p>

        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <div className="flex gap-2">
              {/* Express/Withdraw Interest */}
              <div className="relative group">
                <button
                  onClick={toggleInterest}
                  className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                  aria-label="Toggle interest"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill={isInterested ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {isInterested ? "Withdraw Interest" : "Express Interest"}
                </div>
              </div>

              {/* Shortlist / Remove from Shortlist */}
              <div className="relative group">
                <button
                  onClick={toggleShortlist}
                  className="p-2 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 transition-colors"
                  aria-label="Save profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill={isShortlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
                </div>
              </div>
            </div>

            <Link
              to={`/profile/${profile._id}`}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              View Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
