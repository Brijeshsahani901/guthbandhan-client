import axiosInstance from "../utils/axiosInstance";

// export const profileRegister = async (profileData) => {
//   const response = await axiosInstance.post("/profile", profileData);
//   return response.data;
// };

export const profileRegister = async (profileData) => {
  const isFormData = profileData instanceof FormData;

  const response = await axiosInstance.post("/profile", profileData, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : undefined,
  });

  return response.data;
};

export const fetchAcceptedProfiles = async () => {
 try {
    const response =  await axiosInstance.get("profile/accepted");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error; 
  }
};

export const getProfile = async (id) => {
  try {
    const response = await axiosInstance.get(`/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error; 
  }
};

export const getAllProfile = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axiosInstance.get(`/profile`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const searchProfiles = async (params) => {
  const response = await axiosInstance.get("/profile/search", {
    params,
  });
  return response.data;
};


export const updateProfile = async (id, profileData) => {
  try {
    const isFormData = profileData instanceof FormData;

    const response = await axiosInstance.put(`/profile/${id}`, profileData, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error; // let React Query handle it
  }
};


export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/profile/dashboard/stats");
  return response.data;
};

export const deleteProfile = async (id) => {
  try {
    const response = await axiosInstance.delete(`/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error; 
  }
};