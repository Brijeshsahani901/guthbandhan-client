import axiosInstance from "../utils/axiosInstance";


export const updateUserApi = async (id,userData) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}