import { motion } from "framer-motion";
import ProfileCard from "../../components/profile/ProfileCard";
import { toast } from "react-toastify";
import {  getAllShortlistedProfilesByMe } from "../../api/shortlist.api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const SavedProfiles = () => {
  const {user} = useAuth()
 const { data: shortlistedData, isLoading, error } = useQuery({
  queryKey: ["shortlistedProfiles", user?.profile_id],
  queryFn: () => getAllShortlistedProfilesByMe(user?.profile_id),
  enabled: !!user, // 👈 Prevent query from running until user is loaded
});



  const savedProfiles = shortlistedData?.profiles

  const handleRemove = (profileId) => {
    toast.success("Profile removed from saved list");
    // Optionally, you can refetch or update query data using React Query
  };



  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Saved Profiles</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : savedProfiles?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProfiles.map((profile) => (
              <ProfileCard
                key={profile._id}
                profile={profile}
                // onSave={() => handleRemove(profile.profile_id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-4">
              You haven't saved any profiles yet.
            </p>
            <a href="/browse" className="btn-primary">
              Browse Profiles
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SavedProfiles;
