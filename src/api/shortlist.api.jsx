import axiosInstance from "../utils/axiosInstance";

// Get all shortlisted profiles
export const getAllShortlistedProfiles = async () => {
  const response = await axiosInstance.get("/shortlist-profile");
  return response.data;
};

// Get all shortlisted profiles by me
export const getAllShortlistedProfilesByMe = async (profile_id) => {
  try {
    const response = await axiosInstance.get("/shortlist-profile/shortlisted-by-me", {
      params: { profile_id }, // 👈 Match this with backend
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Add a profile to shortlist
export const addToShortlist = async (payload) => {
  const response = await axiosInstance.post("/shortlist-profile", payload);
  return response.data;
};

// Remove a profile from shortlist
export const removeFromShortlist = async (payload) => {
  const response = await axiosInstance.delete("/shortlist-profile", {
    data: payload,
  });
  return response.data;
};
