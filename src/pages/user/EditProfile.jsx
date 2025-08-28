// import { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { toast } from 'react-toastify'
// import { motion } from 'framer-motion'

// const EditProfile = () => {
//   const { user, updateUser } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     bio: user?.bio || '',
//     location: user?.location || '',
//     birthdate: user?.birthdate || '',
//     gender: user?.gender || '',
//     occupation: user?.occupation || '',
//     education: user?.education || '',
//     interests: user?.interests || [],
//     lookingFor: user?.lookingFor || '',
//     photos: user?.photos || [],
//   })

//   const interestOptions = [
//     'Travel', 'Fitness', 'Reading', 'Cooking', 'Music',
//     'Art', 'Technology', 'Sports', 'Movies', 'Photography',
//     'Nature', 'Gaming', 'Dancing', 'Writing', 'Fashion'
//   ]

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target

//     if (type === 'checkbox') {
//       if (name === 'interests') {
//         const updatedInterests = checked
//           ? [...formData.interests, value]
//           : formData.interests.filter(interest => interest !== value)

//         setFormData(prev => ({
//           ...prev,
//           interests: updatedInterests
//         }))
//       } else {
//         setFormData(prev => ({
//           ...prev,
//           [name]: checked
//         }))
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }))
//     }
//   }

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files)
//     const maxFiles = 6
//     const maxSize = 5 * 1024 * 1024 // 5MB

//     if (files.length + formData.photos.length > maxFiles) {
//       toast.error(`You can only upload up to ${maxFiles} photos`)
//       return
//     }

//     const invalidFiles = files.filter(file => file.size > maxSize)
//     if (invalidFiles.length > 0) {
//       toast.error('Some files are too large. Maximum size is 5MB per photo.')
//       return
//     }

//     // In a real app, you would upload these to a server
//     const newPhotos = files.map(file => URL.createObjectURL(file))
//     setFormData(prev => ({
//       ...prev,
//       photos: [...prev.photos, ...newPhotos]
//     }))
//   }

//   const removePhoto = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index)
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000))

//       updateUser({
//         ...user,
//         ...formData
//       })

//       toast.success('Profile updated successfully!')
//     } catch (error) {
//       toast.error('Failed to update profile. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container-custom py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-3xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Photos Section */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Profile Photos</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//               {formData.photos.map((photo, index) => (
//                 <div key={index} className="relative aspect-square">
//                   <img
//                     src={photo}
//                     alt={`Profile photo ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <line x1="18" y1="6" x2="6" y2="18"></line>
//                       <line x1="6" y1="6" x2="18" y2="18"></line>
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//               {formData.photos.length < 6 && (
//                 <label className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handlePhotoUpload}
//                     className="hidden"
//                   />
//                   <div className="text-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
//                       <line x1="16" y1="5" x2="22" y2="5"></line>
//                       <line x1="19" y1="2" x2="19" y2="8"></line>
//                       <circle cx="9" cy="9" r="2"></circle>
//                       <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
//                     </svg>
//                     <span className="text-sm text-neutral-500">Add Photo</span>
//                   </div>
//                 </label>
//               )}
//             </div>
//             <p className="text-sm text-neutral-500">
//               Add up to 6 photos. First photo will be your main profile picture.
//             </p>
//           </div>

//           {/* Basic Info */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="birthdate" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   id="birthdate"
//                   name="birthdate"
//                   value={formData.birthdate}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="non-binary">Non-binary</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div className="md:col-span-2">
//                 <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Bio
//                 </label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleChange}
//                   rows="4"
//                   className="input"
//                   placeholder="Tell potential matches about yourself..."
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="input"
//                   placeholder="City, Country"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="occupation" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Occupation
//                 </label>
//                 <input
//                   type="text"
//                   id="occupation"
//                   name="occupation"
//                   value={formData.occupation}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="education" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Education
//                 </label>
//                 <input
//                   type="text"
//                   id="education"
//                   name="education"
//                   value={formData.education}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="lookingFor" className="block text-sm font-medium text-neutral-700 mb-1">
//                   Looking For
//                 </label>
//                 <select
//                   id="lookingFor"
//                   name="lookingFor"
//                   value={formData.lookingFor}
//                   onChange={handleChange}
//                   className="input"
//                 >
//                   <option value="">Select what you're looking for</option>
//                   <option value="Marriage">Marriage</option>
//                   <option value="Long-term relationship">Long-term relationship</option>
//                   <option value="Friendship first">Friendship first</option>
//                   <option value="Casual dating">Casual dating</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Interests */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Interests</h2>
//             <p className="text-sm text-neutral-600 mb-4">
//               Select interests that define you. This helps us match you with compatible people.
//             </p>
//             <div className="flex flex-wrap gap-3">
//               {interestOptions.map((interest) => (
//                 <label
//                   key={interest}
//                   className={`cursor-pointer px-4 py-2 rounded-full transition-colors ${
//                     formData.interests.includes(interest)
//                       ? 'bg-primary-100 text-primary-700 border border-primary-300'
//                       : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     name="interests"
//                     value={interest}
//                     checked={formData.interests.includes(interest)}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   {interest}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary"
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving Changes...
//                 </span>
//               ) : (
//                 'Save Changes'
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

// export default EditProfile
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profileRegister, getProfile, updateProfile } from "../../api/profile";
import { updateUserApi } from "../../api/user.api";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const searchParams = new URLSearchParams(location.search);
  const urlProfileId = searchParams.get("profile_id");
  const { user, updateUser } = useAuth();
  const [isNewProfile, setIsNewProfile] = useState(true);
  const [errors, setErrors] = useState({});
  const [isEditingOtherProfile, setIsEditingOtherProfile] = useState(false);

  const baseurl = import.meta.env.VITE_BASE_URL;
  const targetProfileId = urlProfileId || user?.profile_id;
  // Initial form state
  const initialFormData = {
    profile_id: "",
    profile_created: false,
    created_by: user?._id || "",
    created_for: "Myself",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    residing_city: "",
    residing_state: "",
    residing_country: "",
    residing_status: "",
    marital_status: "Single",
    body_type: "",
    dob: "",
    tob: "",
    height: "0",
    weight: "",
    complexion: "",
    blood_group: "",
    sex: "M",
    mother_tongue: "",
    religion: "",
    star: "",
    caste: "",
    sub_caste: "",
    raashi: "",
    manglik: "U",
    birth_place: "",
    native_place: "",
    mobile: user?.phone || "",
    mobile_verified: "N",
    edu_career_about: "",
    education: "",
    occupation: "",
    working_with: "",
    professional_area: "",
    eating_habit: "",
    physical_status: "",
    smoking: "U",
    drinking: "U",
    hobby: "",
    photos: [],
    annual_income: "0",
    family_type: "",
    family_value: "",
    family_status: "",
    sisters: "",
    brothers: "",
    brother_marital_status: "",
    sister_marital_status: "",
    mother_occupation: "",
    father_occupation: "",
    about: "",
    thalassemia: "",
    rotary_club: "",
    district_no: "",
    fb_url: "",
    twitter_url: "",
    gplus_url: "",
    linkedin_url: "",
    paid_member: "N",
    membership_expired_on: new Date(),
  };

  const [formData, setFormData] = useState(initialFormData);

  // Check if profile exists
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", targetProfileId],
    queryFn: () => getProfile(targetProfileId),
    enabled: !!targetProfileId,
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (urlProfileId) {
      setIsEditingOtherProfile(true);
    }
  }, [urlProfileId]);

  useEffect(() => {
    if (profileData?.profile) {
      setIsNewProfile(false);
      setFormData({
        ...initialFormData,
        ...profileData.profile,
      });
    } else if (isSuccess) {
      console.warn("Profile object missing in data", profileData);
    }
  }, [profileData, isSuccess]);

  // Create profile mutation
  const createMutation = useMutation({
    mutationFn: async (formData) => {
      const fd = new FormData();

      // Append all non-photo, non-file fields
      for (const key in formData) {
        if (key !== "photos" && key !== "files") {
          fd.append(key, formData[key]);
        }
      }

      // Append actual file objects
      if (Array.isArray(formData.files)) {
        formData.files.forEach((file) => {
          fd.append("photos", file); // 🧠 "photos" must match backend multer field name
        });
      }

      return profileRegister(fd);
    },

    onSuccess: async (data) => {
      updateUser({
        profile_id: data.profile.profile_id,
        profile_created: true,
      });

      try {
        await updateUserApi(user._id, {
          profile_id: data.profile.profile_id,
          profile_created: true,
        });

        setIsNewProfile(false);
        toast.success("Profile created successfully!");
      } catch (error) {
        toast.error("Failed to update user profile reference");
      }
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create profile");
    },
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const fd = new FormData();

      // Append all non-photo, non-file fields
      for (const key in formData) {
        if (key !== "photos" && key !== "files") {
          fd.append(key, formData[key]);
        }
      }

      // Append actual file objects as "photos"
      if (Array.isArray(formData.files)) {
        formData.files.forEach((file) => {
          fd.append("photos", file); // Consider using "photos[]" if backend expects array
        });
      }

      // Extract only existing photo URLs
      const existingPhotos = (formData.photos || []).filter(
        (photo) =>
          typeof photo === "string" &&
          (photo.includes("/uploads") || photo.includes("\\uploads"))
      );

      fd.append("existingPhotos", JSON.stringify(existingPhotos));

      return updateProfile(profileData?.profile._id, fd);
    },

    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.marital_status)
      newErrors.marital_status = "Marital status is required";
    // if (!formData.sex) newErrors.sex = "Gender is required";
    // if (!formData.religion) newErrors.religion = "Religion is required";
    // if (!formData.caste) newErrors.caste = "Caste is required";
    // if (!formData.mother_tongue)
    //   newErrors.mother_tongue = "Mother tongue is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const dataToSend = {
      ...formData,
      hobby: Array.isArray(formData?.hobby)
        ? formData.hobby.join(",")
        : formData?.hobby || "", // fallback if undefined
      profile_created: true,
      created_by: user._id,
    };

    if (isNewProfile) {
      createMutation.mutate(dataToSend);
    } else {
      updateMutation.mutate(dataToSend);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 6;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (files.length + formData.photos.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} photos`);
      return;
    }

    const invalidFiles = files.filter((file) => file.size > maxSize);
    if (invalidFiles.length > 0) {
      toast.error("Some files are too large. Maximum size is 5MB per photo.");
      return;
    }

    const newPhotos = files.map((file) => file.name);

    setFormData((prev) => ({
      ...prev,
      files: [...(prev.files || []), ...files],
      photos: [...prev.photos, ...files], // store full file objects
    }));
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Loading state
  if (isProfileLoading && user?.profile_id) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Form options
  const createdForOptions = [
    "Myself",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Friend",
    "Relative",
  ];

  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
  ];

  const yesNoUnknownOptions = ["Y", "N", "U"];
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
    <div className="container-custom py-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">
          {!user.profile_created || user.profile_created == false
            ? "Create Profile"
            : "Edit Profile"}
        </h1>

        {(!formData?.dob) && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
            Please complete your profile to unlock all features.
          </div>
        )}

        {/* Photos Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={
                    typeof photo === "string"
                      ? `${baseurl}${photo.replace(/\\/g, "/")}` // backend file
                      : URL.createObjectURL(photo) // local uploaded file
                  }
                  alt={`Profile photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            {formData.photos.length < 6 && (
              <label className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-auto text-neutral-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                    <line x1="16" y1="5" x2="22" y2="5"></line>
                    <line x1="19" y1="2" x2="19" y2="8"></line>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  <span className="text-sm text-neutral-500">Add Photo</span>
                </div>
              </label>
            )}
          </div>
          <p className="text-sm text-neutral-500">
            Add up to 6 photos. First photo will be your main profile picture.
          </p>
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Profile Created For *
              </label>
              <select
                name="created_for"
                value={formData.created_for}
                onChange={handleChange}
                className="input"
              >
                {createdForOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`input ${errors.first_name ? "border-red-500" : ""}`}
                placeholder="Enter first name"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`input ${errors.last_name ? "border-red-500" : ""}`}
                placeholder="Enter last name"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? "border-red-500" : ""}`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Mobile *
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="input"
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Gender *
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={`input ${errors.sex ? "border-red-500" : ""}`}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {errors.sex && (
                <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`input ${errors.dob ? "border-red-500" : ""}`}
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Time of Birth
              </label>
              <input
                type="text"
                name="tob"
                value={formData.tob}
                onChange={handleChange}
                className="input"
                placeholder="HH:MM AM/PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Marital Status *
              </label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className={`input ${
                  errors.marital_status ? "border-red-500" : ""
                }`}
              >
                {maritalStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.marital_status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.marital_status}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Physical Attributes */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Physical Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Height (cm)
              </label>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input"
                placeholder="Enter height"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Weight (kg)
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input"
                placeholder="Enter weight"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="body_type"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Body Type
              </label>
              <input
                type="text"
                id="body_type"
                name="body_type"
                value={formData.body_type}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Slim, Athletic"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="complexion"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Complexion
              </label>
              <input
                type="text"
                id="complexion"
                name="complexion"
                value={formData.complexion}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Fair, Wheatish"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="blood_group"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Blood Group
              </label>
              <input
                type="text"
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="input"
                placeholder="e.g. A+"
                maxLength="3"
              />
            </div>

            <div>
              <label
                htmlFor="physical_status"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Physical Status *
              </label>
              <input
                type="text"
                id="physical_status"
                name="physical_status"
                value={formData.physical_status}
                onChange={handleChange}
                required
                className="input"
                placeholder="Describe physical status"
                maxLength="150"
              />
            </div>

            <div>
              <label
                htmlFor="thalassemia"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Thalassemia Status
              </label>
              <input
                type="text"
                id="thalassemia"
                name="thalassemia"
                value={formData.thalassemia}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
                maxLength="112"
              />
            </div>

            <div>
              <label
                htmlFor="smoking"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Smoking
              </label>
              <select
                id="smoking"
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="input"
              >
                {yesNoUnknownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="drinking"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Drinking
              </label>
              <select
                id="drinking"
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
                className="input"
              >
                {yesNoUnknownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="eating_habit"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Eating Habit *
              </label>
              <input
                type="text"
                id="eating_habit"
                name="eating_habit"
                value={formData.eating_habit}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. Vegetarian, Non-vegetarian"
                maxLength="20"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Location Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="residing_city"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                City *
              </label>
              <input
                type="text"
                id="residing_city"
                name="residing_city"
                value={formData.residing_city}
                onChange={handleChange}
                required
                className="input"
                placeholder="Current city"
                maxLength="200"
              />
            </div>

            <div>
              <label
                htmlFor="residing_state"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                State *
              </label>
              <input
                type="text"
                id="residing_state"
                name="residing_state"
                value={formData.residing_state}
                onChange={handleChange}
                required
                className="input"
                placeholder="Current state"
                maxLength="200"
              />
            </div>

            <div>
              <label
                htmlFor="residing_country"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Country *
              </label>
              <input
                type="text"
                id="residing_country"
                name="residing_country"
                value={formData.residing_country}
                onChange={handleChange}
                required
                className="input"
                placeholder="Current country"
                maxLength="150"
              />
            </div>

            <div>
              <label
                htmlFor="residing_status"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Residing Status
              </label>
              <input
                type="text"
                id="residing_status"
                name="residing_status"
                value={formData.residing_status}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Citizen, Permanent Resident"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="birth_place"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Birth Place *
              </label>
              <input
                type="text"
                id="birth_place"
                name="birth_place"
                value={formData.birth_place}
                onChange={handleChange}
                required
                className="input"
                placeholder="City of birth"
                maxLength="150"
              />
            </div>

            <div>
              <label
                htmlFor="native_place"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Native Place
              </label>
              <input
                type="text"
                id="native_place"
                name="native_place"
                value={formData.native_place}
                onChange={handleChange}
                className="input"
                placeholder="Ancestral home"
                maxLength="200"
              />
            </div>
          </div>
        </div>

        {/* Background Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Background Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="mother_tongue"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Mother Tongue *
              </label>
              <input
                type="text"
                id="mother_tongue"
                name="mother_tongue"
                value={formData.mother_tongue}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. Hindi, Tamil"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="religion"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Religion *
              </label>
              <input
                type="text"
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
                className="input"
                placeholder="e.g. Hindu, Muslim"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="caste"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Caste *
              </label>
              <input
                type="text"
                id="caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter caste"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="sub_caste"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Sub-caste *
              </label>
              <input
                type="text"
                id="sub_caste"
                name="sub_caste"
                value={formData.sub_caste}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter sub-caste"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="raashi"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Raashi *
              </label>
              <input
                type="text"
                id="raashi"
                name="raashi"
                value={formData.raashi}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter raashi"
                maxLength="50"
              />
            </div>

            <div>
              <label
                htmlFor="star"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Star/Nakshatra
              </label>
              <input
                type="text"
                id="star"
                name="star"
                value={formData.star}
                onChange={handleChange}
                className="input"
                placeholder="Enter star/nakshatra"
                maxLength="250"
              />
            </div>

            <div>
              <label
                htmlFor="manglik"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Manglik
              </label>
              <select
                id="manglik"
                name="manglik"
                value={formData.manglik}
                onChange={handleChange}
                className="input"
              >
                {yesNoUnknownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="education"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Education *
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="input"
                placeholder="Highest education"
                maxLength="250"
              />
            </div>

            <div>
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Occupation *
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                className="input"
                placeholder="Current occupation"
                maxLength="250"
              />
            </div>

            <div>
              <label
                htmlFor="working_with"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Working With
              </label>
              <input
                type="text"
                id="working_with"
                name="working_with"
                value={formData.working_with}
                onChange={handleChange}
                className="input"
                placeholder="Company/organization name"
                maxLength="150"
              />
            </div>

            <div>
              <label
                htmlFor="professional_area"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Professional Area
              </label>
              <input
                type="text"
                id="professional_area"
                name="professional_area"
                value={formData.professional_area}
                onChange={handleChange}
                className="input"
                placeholder="Field of work"
                maxLength="200"
              />
            </div>

            <div>
              <label
                htmlFor="annual_income"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Annual Income (INR)
              </label>
              <input
                type="text"
                id="annual_income"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                className="input"
                placeholder="Annual income"
                maxLength="11"
              />
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Family Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="family_type"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Family Type
              </label>
              <input
                type="text"
                id="family_type"
                name="family_type"
                value={formData.family_type}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Nuclear, Joint"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="family_value"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Family Values
              </label>
              <input
                type="text"
                id="family_value"
                name="family_value"
                value={formData.family_value}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Traditional, Modern"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="family_status"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Family Status
              </label>
              <input
                type="text"
                id="family_status"
                name="family_status"
                value={formData.family_status}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Middle Class, Upper Middle"
                maxLength="100"
              />
            </div>

            <div>
              <label
                htmlFor="brothers"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Number of Brothers
              </label>
              <input
                type="text"
                id="brothers"
                name="brothers"
                value={formData.brothers}
                onChange={handleChange}
                className="input"
                placeholder="Number of brothers"
                maxLength="4"
              />
            </div>

            <div>
              <label
                htmlFor="sisters"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Number of Sisters
              </label>
              <input
                type="text"
                id="sisters"
                name="sisters"
                value={formData.sisters}
                onChange={handleChange}
                className="input"
                placeholder="Number of sisters"
                maxLength="4"
              />
            </div>

            <div>
              <label
                htmlFor="brother_marital_status"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Brothers' Marital Status
              </label>
              <input
                type="text"
                id="brother_marital_status"
                name="brother_marital_status"
                value={formData.brother_marital_status}
                onChange={handleChange}
                className="input"
                placeholder="e.g. 1 Married, 1 Unmarried"
                maxLength="20"
              />
            </div>

            <div>
              <label
                htmlFor="sister_marital_status"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Sisters' Marital Status
              </label>
              <input
                type="text"
                id="sister_marital_status"
                name="sister_marital_status"
                value={formData.sister_marital_status}
                onChange={handleChange}
                className="input"
                placeholder="e.g. 1 Married, 1 Unmarried"
                maxLength="20"
              />
            </div>

            <div>
              <label
                htmlFor="father_occupation"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Father's Occupation
              </label>
              <input
                type="text"
                id="father_occupation"
                name="father_occupation"
                value={formData.father_occupation}
                onChange={handleChange}
                className="input"
                placeholder="Father's occupation"
                maxLength="250"
              />
            </div>

            <div>
              <label
                htmlFor="mother_occupation"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Mother's Occupation
              </label>
              <input
                type="text"
                id="mother_occupation"
                name="mother_occupation"
                value={formData.mother_occupation}
                onChange={handleChange}
                className="input"
                placeholder="Mother's occupation"
                maxLength="250"
              />
            </div>
          </div>
        </div>

        {/* Lifestyle & Interests */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Lifestyle & Interests</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Select Your Interests (Choose at least 3)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allHobbies.map((hob) => {
                const isSelected = formData.hobby.includes(hob);

                return (
                  <label
                    key={hob}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 hover:border-primary-200"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="edu_career_about"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                About Education & Career
              </label>
              <textarea
                id="edu_career_about"
                name="edu_career_about"
                value={formData.edu_career_about}
                onChange={handleChange}
                className="input"
                placeholder="Describe your education and career"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Social & Additional Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Social & Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="rotary_club"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Rotary Club Membership
              </label>
              <input
                type="text"
                id="rotary_club"
                name="rotary_club"
                value={formData.rotary_club}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
                maxLength="112"
              />
            </div>

            <div>
              <label
                htmlFor="district_no"
                className="block text-sm font-medium text-neutral-700"
              >
                District Number
              </label>
              <input
                type="text"
                id="district_no"
                name="district_no"
                value={formData.district_no}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
                maxLength="112"
              />
            </div>

            <div>
              <label
                htmlFor="fb_url"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Facebook Profile
              </label>
              <input
                type="url"
                id="fb_url"
                name="fb_url"
                value={formData.fb_url}
                onChange={handleChange}
                className="input"
                placeholder="Facebook profile URL"
              />
            </div>

            <div>
              <label
                htmlFor="twitter_url"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Twitter Profile
              </label>
              <input
                type="url"
                id="twitter_url"
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                className="input"
                placeholder="Twitter profile URL"
              />
            </div>

            <div>
              <label
                htmlFor="gplus_url"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Google+ Profile
              </label>
              <input
                type="url"
                id="gplus_url"
                name="gplus_url"
                value={formData.gplus_url}
                onChange={handleChange}
                className="input"
                placeholder="Google+ profile URL"
              />
            </div>

            <div>
              <label
                htmlFor="linkedin_url"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin_url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="input"
                placeholder="LinkedIn profile URL"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                About Yourself
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="input"
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <ul className="list-disc pl-5">
              {Object.values(errors).map((error, index) => (
                <li key={index} className="font-semibold">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={createMutation.isPending || updateMutation.isPending}
            onClick={handleSubmit}
            className="btn-primary"
          >
            {createMutation.isPending || updateMutation.isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isNewProfile ? "Creating Profile..." : "Saving Changes..."}
              </span>
            ) : isNewProfile ? (
              "Create Profile"
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
