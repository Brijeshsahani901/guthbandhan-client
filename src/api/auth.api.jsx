import axiosInstance from "../utils/axiosInstance";

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const userLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const sendOtp = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const res = await axiosInstance.post("/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
  return res.data;
};

