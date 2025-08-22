// api/interestsApi.js
import axiosInstance from "../utils/axiosInstance";

// ✅ 3. Get All interests
export const getAllInterest = async () => {
  const response = await axiosInstance.get("/interests", {});
  return response.data;
};

// ✅ 1. Get interests received by a profile
export const fetchReceivedInterests = async (
  pid,
  page = 1,
  limit = 10,
  status
) => {
  const params = { page, limit };
  if (status) params.status = status;
  const response = await axiosInstance.get(`/interests/received/${pid}`, {
    params,
  });
  return response.data;
};

// ✅ 2. Get interests sent by a profile
export const fetchSentInterests = async (pid, page = 1, limit = 10, status) => {
  const params = { page, limit };
  if (status) params.status = status;
  const response = await axiosInstance.get(`/interests/sent/${pid}`, {
    params,
  });
  return response.data;
};

// ✅ 3. Express (send) an interest
export const expressInterest = async ({
  interest_from_pid,
  interested_in_pid,
  interest_msg,
}) => {
  const response = await axiosInstance.post("/interests/express", {
    interest_from_pid,
    interested_in_pid,
    interest_msg,
  });
  return response.data;
};

// ✅ 4. Accept or decline an interest

export const respondToInterest = async ({ id, response_msg, interest_status, responding_profile_id }) => {
  const res = await axiosInstance.put(`/interests/respond/${id}`, {
    response_msg,
    interest_status,
    responding_profile_id,
  });
  return res.data;
};


// ✅ 5. Withdraw (remove) an interest
export const withdrawInterest = async (id, requester_profile_id) => {
  try {
    const response = await axiosInstance.delete(`/interests/${id}`, {
      data: { requester_profile_id }, // ✅ body payload
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err; // Optional: so error shows up in React Query's onError
  }
};


// ✅ 6. Search for a specific interest between two profiles
export const searchInterestByProfiles = async (interest_from_pid, interested_in_pid) => {
  const params = { interest_from_pid, interested_in_pid };
  const response = await axiosInstance.get(`/interests/search`, { params });
  return response.data;
};


