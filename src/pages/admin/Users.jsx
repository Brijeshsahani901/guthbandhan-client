// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllProfile, searchProfiles } from "../../api/profile";
// import { formatDate } from "../../utils/formatters";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaPlusCircle, FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Users = () => {
//   const {user} = useAuth()
//   const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({
//     searchText: "",
//     residing_country: "",
//     marital_status: "",
//   });
//   const limit = 10;
//   const navigate = useNavigate();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["profiles", page, filters],
//     queryFn: () =>
//       filters.searchText || filters.residing_country || filters.marital_status
//         ? searchProfiles({ ...filters, page, limit })
//         : getAllProfile({ page, limit }),
//     keepPreviousData: true,
//   });

//   const profiles = data?.profiles || [];
//   const totalPages = data?.pages || data?.totalPages || 1;

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setPage(1);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-primary-700">User Management</h1>
//      <a
//   href={`/auth/register?user_id=${user._id}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
// >
//   <FaPlusCircle />
//   Add User
// </a>

//       </div>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-4"
//       >
//         <input
//           name="searchText"
//           value={filters.searchText}
//           onChange={handleFilterChange}
//           placeholder="Search by name or email..."
//           className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         <input
//           name="residing_country"
//           value={filters.residing_country}
//           onChange={handleFilterChange}
//           placeholder="Country"
//           className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         <select
//           name="marital_status"
//           value={filters.marital_status}
//           onChange={handleFilterChange}
//           className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//         >
//           <option value="">All Marital Status</option>
//           <option value="Single">Single</option>
//           <option value="Married">Married</option>
//         </select>
//       </motion.div>

//       {/* Table */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : isError ? (
//         <p className="text-red-500 text-center">Error: {error.message}</p>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0.8, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//           className="bg-white rounded-xl shadow-lg overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto text-sm text-left">
//               <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-6 py-4 font-medium">Name</th>
//                   <th className="px-6 py-4 font-medium">Email</th>
//                   <th className="px-6 py-4 font-medium">Country</th>
//                   <th className="px-6 py-4 font-medium">Marital Status</th>
//                   <th className="px-6 py-4 font-medium">Join Date</th>
//                   <th className="px-6 py-4 font-medium text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {profiles.map((p) => (
//                     <motion.tr
//                       key={p._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="hover:bg-blue-50 transition"
//                     >
//                       <td className="px-6 py-4 font-medium text-gray-800">
//                         {p.first_name} {p.last_name}
//                       </td>
//                       <td className="px-6 py-4 text-blue-600">{p.email}</td>
//                       <td className="px-6 py-4">{p.residing_country || "-"}</td>
//                       <td className="px-6 py-4">{p.marital_status || "-"}</td>
//                       <td className="px-6 py-4">{formatDate(p.createdAt)}</td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => navigate(`/user/edit-profile?profile_id=${p.profile_id}`)}
//                           className="text-blue-600 hover:text-blue-800 transition"
//                           title="Edit Profile"
//                         >
//                           <FaEdit />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-600">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
//             >
//               Next
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Users;

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiTrash } from "react-icons/fi";
import {
  getAllProfile,
  searchProfiles,
  profileRegister,
} from "../../api/profile";
import { formatDate } from "../../utils/formatters";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { register } from "../../api/auth.api";
import { deleteProfile } from "../../api/profile";

const Users = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState([]);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    searchText: "",
    residing_country: "",
    marital_status: "",
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    residing_country: "",
    marital_status: "",
    about: "",
    hobby: "", // 🆕 Array of selected hobbies
    created_for: "Myself",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profiles", page, filters],
    queryFn: () =>
      filters.searchText || filters.residing_country || filters.marital_status
        ? searchProfiles({ ...filters, page, limit })
        : getAllProfile({ page, limit }),
    keepPreviousData: true,
  });

  const profiles = data?.profiles || [];
  const totalPages = data?.pages || data?.totalPages || 1;

  //   const createMutation = useMutation({
  //  mutationFn: async (formData) => {
  //   const fd = new FormData();

  //   for (const key in formData) {
  //     if (key === "files") continue;

  //     if (key === "hobby") {
  //       // Convert array to comma-separated string
  //       fd.append("hobby", formData.hobby.join(","));
  //     } else {
  //       fd.append(key, formData[key]);
  //     }
  //   }

  //   // Add required created_for field
  //   fd.append("created_by", user?._id || "default_user_id");

  //   if (Array.isArray(formData.files)) {
  //     formData.files.forEach((file) => {
  //       fd.append("photos", file);
  //     });
  //   }

  //   return profileRegister(fd);
  // }
  // ,

  //     onSuccess: async () => {
  //       toast.success("Profile created successfully!");
  //       setIsModalOpen(false);
  //       setFormData({
  //         first_name: "",
  //         last_name: "",
  //         email: "",
  //         residing_country: "",
  //         marital_status: "",
  //         files: [],
  //       });
  //       await queryClient.invalidateQueries(["profiles"]);
  //     },
  //     onError: (error) => {
  //       toast.error(error?.response?.data?.message || "Failed to create profile");
  //     },
  //   });

  const createMutation = useMutation({
    mutationFn: async (formData) => {
      // Step 1: Register user
      const userPayload = {
        email: formData.email,
        password: formData.password,
        profile_created: true,
      };

      const userResponse = await register(userPayload);
      const createdUserId = userResponse?.user?._id;

      // Step 2: Register profile
      const fd = new FormData();
      for (const key in formData) {
        if (["files", "password"].includes(key)) continue;

        if (key === "hobby") {
          fd.append("hobby", formData.hobby.join(","));
        } else {
          fd.append(key, formData[key]);
        }
      }

      // Use created user's ID for created_by
      fd.append("created_by", createdUserId || "default_user_id");

      if (Array.isArray(formData.files)) {
        formData.files.forEach((file) => {
          fd.append("photos", file);
        });
      }

      return profileRegister(fd);
    },

    onSuccess: async () => {
      toast.success("User and profile created successfully!");
      setIsModalOpen(false);
      setFormError([]);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        residing_country: "",
        marital_status: "",
        hobby: [],
        about: "",
        created_for: "Myself",
      });
      await queryClient.invalidateQueries(["profiles"]);
    },

    onError: (error) => {
      if (
        error !== null &&
        typeof error === "object" &&
        !Array.isArray(error) &&
        Array.isArray(error.errors)
      ) {
        // Agar error.errors ek array hai to usko map karo
        const messages = error.errors.map((err) => `${err.path}: ${err.msg}`);
        setFormError(messages);
      } else {
        // Agar error.errors nahi mila to generic message dikhado
        setFormError([error?.message || "Failed to create user/profile"]);
      }

      console.error("API Error:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (profileId) => {
      return await deleteProfile(profileId);
    },
    onSuccess: async () => {
      toast.success("User profile deleted successfully!");
      await queryClient.invalidateQueries(["profiles"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete profile");
      console.error("Delete error:", error);
    },
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const allHobbies = [
    "Travel",
    "Fitness",
    "Reading",
    "Cooking",
    "Music",
    "Art",
    "Technology",
    "Sports",
    "Movies",
    "Photography",
    "Nature",
    "Gaming",
    "Dancing",
    "Writing",
    "Fashion",
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-700">User Management</h1>
        <button
          onClick={() => {
            setFormError([]); // ✅ Clear previous errors when opening
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <FaPlusCircle />
          Add User
        </button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          name="searchText"
          value={filters.searchText}
          onChange={handleFilterChange}
          placeholder="Search by name or email..."
          className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          name="residing_country"
          value={filters.residing_country}
          onChange={handleFilterChange}
          placeholder="Country"
          className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          name="marital_status"
          value={filters.marital_status}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">All Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </motion.div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center">Error: {error.message}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Country</th>
                  <th className="px-6 py-4 font-medium">Marital Status</th>
                  <th className="px-6 py-4 font-medium">Join Date</th>
                  <th className="px-6 py-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {profiles.map((p) => (
                    <motion.tr
                      key={p._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {p.first_name} {p.last_name}
                      </td>
                      <td className="px-6 py-4 text-blue-600">{p.email}</td>
                      <td className="px-6 py-4">{p.residing_country || "-"}</td>
                      <td className="px-6 py-4">{p.marital_status || "-"}</td>
                      <td className="px-6 py-4">{formatDate(p.createdAt)}</td>
                      <td className="px-6 py-4 flex justify-center gap-4">
                        {/* Edit Button */}
                        <button
                          onClick={() =>
                            navigate(
                              `/user/edit-profile?profile_id=${p.profile_id}`
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit Profile"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this user?"
                              )
                            ) {
                              deleteMutation.mutate(p._id); // or p._id depending on your API
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Profile"
                        >
                          🗑️
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add New User
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-5"
            >
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className="input"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input"
                  required
                />

                <input
                  type="text"
                  placeholder="Country"
                  value={formData.residing_country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      residing_country: e.target.value,
                    })
                  }
                  className="input"
                />
                <select
                  value={formData.marital_status}
                  onChange={(e) =>
                    setFormData({ ...formData, marital_status: e.target.value })
                  }
                  className="input"
                >
                  <option value="">Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>

              {/* Hobbies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Interests (Choose at least 3)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allHobbies.map((hob) => {
                    const isSelected = formData.hobby.includes(hob);
                    return (
                      <label
                        key={hob}
                        className={`flex items-center px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-100 border-blue-500 text-blue-700"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="hobby"
                          value={hob}
                          checked={isSelected}
                          onChange={(e) => {
                            const selected = formData.hobby;
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                hobby: [...selected, hob],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                hobby: selected.filter((item) => item !== hob),
                              });
                            }
                          }}
                          className="sr-only"
                        />
                        <span className="ml-2">{hob}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* About */}
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  About Yourself
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
              </div>

              {/* Error Messages (if any) */}
              {formError.length > 0 && (
                <div className="text-red-600 text-sm font-medium space-y-1 mb-2 text-left">
                  {formError.map((err, idx) => (
                    <div key={idx}>❌ {err}</div>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isLoading}
                  className={`px-6 py-2 rounded text-white transition font-medium ${
                    createMutation.isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {createMutation.isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
