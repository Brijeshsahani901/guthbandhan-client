// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { profileRegister, getProfile, updateProfile } from "../../api/profile";
// import { updateUserApi } from "../../api/user.api";
// import { useParams } from "react-router-dom";

// const EditProfile = () => {
//   const searchParams = new URLSearchParams(location.search);
//   const urlProfileId = searchParams.get("profile_id");
//   const { user, updateUser } = useAuth();
//   const [isNewProfile, setIsNewProfile] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [isEditingOtherProfile, setIsEditingOtherProfile] = useState(false);

//   const baseurl = import.meta.env.VITE_BASE_URL;
//   const targetProfileId = urlProfileId || user?.profile_id;
//   // Initial form state
//   const initialFormData = {
//     profile_id: "",
//     profile_created: false,
//     created_by: user?._id || "",
//     created_for: "Myself",
//     first_name: user?.name || "",
//     last_name: "",
//     email: user?.email || "",
//     residing_city: "",
//     residing_state: "",
//     residing_country: "",
//     residing_status: "",
//     marital_status: "Single",
//     body_type: "",
//     dob: "",
//     tob: "",
//     height: "0",
//     weight: "",
//     complexion: "",
//     blood_group: "",
//     sex: "M",
//     mother_tongue: "",
//     religion: "",
//     star: "",
//     caste: "",
//     sub_caste: "",
//     raashi: "",
//     manglik: "U",
//     birth_place: "",
//     native_place: "",
//     mobile: user?.phone || "",
//     mobile_verified: "N",
//     edu_career_about: "",
//     education: "",
//     occupation: "",
//     working_with: "",
//     professional_area: "",
//     eating_habit: "",
//     physical_status: "",
//     smoking: "U",
//     drinking: "U",
//     hobby: "",
//     photos: [],
//     annual_income: "0",
//     family_type: "",
//     family_value: "",
//     family_status: "",
//     sisters: "",
//     brothers: "",
//     brother_marital_status: "",
//     sister_marital_status: "",
//     mother_occupation: "",
//     father_occupation: "",
//     about: "",
//     thalassemia: "",
//     rotary_club: "",
//     district_no: "",
//     fb_url: "",
//     twitter_url: "",
//     gplus_url: "",
//     linkedin_url: "",
//     paid_member: "N",
//     membership_expired_on: new Date(),
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Check if profile exists
//   const {
//     data: profileData,
//     isLoading: isProfileLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["profile", targetProfileId],
//     queryFn: () => getProfile(targetProfileId),
//     enabled: !!targetProfileId,
//     staleTime: 0,
//     refetchOnMount: true,
//   });

//   useEffect(() => {
//     if (urlProfileId) {
//       setIsEditingOtherProfile(true);
//     }
//   }, [urlProfileId]);

//   useEffect(() => {
//     if (profileData?.profile) {
//       setIsNewProfile(false);
//       setFormData({
//         ...initialFormData,
//         ...profileData.profile,
//       });
//     } else if (isSuccess) {
//       console.warn("Profile object missing in data", profileData);
//     }
//   }, [profileData, isSuccess]);

//   // Create profile mutation
//   const createMutation = useMutation({
//     mutationFn: async (formData) => {
//       const fd = new FormData();

//       // Append all non-photo, non-file fields
//       for (const key in formData) {
//         if (key !== "photos" && key !== "files") {
//           fd.append(key, formData[key]);
//         }
//       }

//       // Append actual file objects
//       if (Array.isArray(formData.files)) {
//         formData.files.forEach((file) => {
//           fd.append("photos", file); // 🧠 "photos" must match backend multer field name
//         });
//       }

//       return profileRegister(fd);
//     },

//     onSuccess: async (data) => {
//       updateUser({
//         profile_id: data.profile.profile_id,
//         profile_created: true,
//       });

//       try {
//         await updateUserApi(user._id, {
//           profile_id: data.profile.profile_id,
//           profile_created: true,
//         });

//         setIsNewProfile(false);
//         toast.success("Profile created successfully!");
//       } catch (error) {
//         toast.error("Failed to update user profile reference");
//       }
//     },

//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Failed to create profile");
//     },
//   });

//   // Update profile mutation
//   const updateMutation = useMutation({
//     mutationFn: async (formData) => {
//       const fd = new FormData();

//       // Append all non-photo, non-file fields
//       for (const key in formData) {
//         if (key !== "photos" && key !== "files") {
//           fd.append(key, formData[key]);
//         }
//       }

//       // Append actual file objects as "photos"
//       if (Array.isArray(formData.files)) {
//         formData.files.forEach((file) => {
//           fd.append("photos", file); // Consider using "photos[]" if backend expects array
//         });
//       }

//       // Extract only existing photo URLs
//       const existingPhotos = (formData.photos || []).filter(
//         (photo) =>
//           typeof photo === "string" &&
//           (photo.includes("/uploads") || photo.includes("\\uploads"))
//       );

//       fd.append("existingPhotos", JSON.stringify(existingPhotos));

//       return updateProfile(profileData?.profile._id, fd);
//     },

//     onSuccess: () => {
//       toast.success("Profile updated successfully!");
//     },

//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Failed to update profile");
//     },
//   });

//   const validateForm = () => {
//     const newErrors = {};

//     // Required fields validation
//     if (!formData.first_name) newErrors.first_name = "First name is required";
//     if (!formData.last_name) newErrors.last_name = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.dob) newErrors.dob = "Date of birth is required";
//     if (!formData.marital_status)
//       newErrors.marital_status = "Marital status is required";
//     if (!formData.sex) newErrors.sex = "Gender is required";
//     if (!formData.religion) newErrors.religion = "Religion is required";
//     if (!formData.caste) newErrors.caste = "Caste is required";
//     if (!formData.mother_tongue)
//       newErrors.mother_tongue = "Mother tongue is required";
//     if (!formData.residing_city) newErrors.residing_city = "City is required";
//     if (!formData.residing_state)
//       newErrors.residing_state = "State is required";
//     if (!formData.residing_country)
//       newErrors.residing_country = "Country is required";
//     if (!formData.residing_status)
//       newErrors.residing_status = "Residing status is required";
//     if (!formData.body_type) newErrors.body_type = "Body type is required";
//     if (!formData.tob) newErrors.tob = "Time of birth is required";
//     if (!formData.height) newErrors.height = "Height is required";
//     if (!formData.weight) newErrors.weight = "Weight is required";
//     if (!formData.complexion) newErrors.complexion = "Complexion is required";
//     if (!formData.blood_group)
//       newErrors.blood_group = "Blood group is required";
//     // if (!formData.star) newErrors.star = "Star is required";
//     // if (!formData.sub_caste) newErrors.sub_caste = "Sub caste is required";
//     // if (!formData.raashi) newErrors.raashi = "Raashi is required";
//     if (!formData.manglik) newErrors.manglik = "Manglik status is required";
//     if (!formData.birth_place)
//       newErrors.birth_place = "Birth place is required";
//     if (!formData.native_place)
//       newErrors.native_place = "Native place is required";
//     if (!formData.mobile) newErrors.mobile = "Mobile number is required";
//     if (!formData.edu_career_about)
//       newErrors.edu_career_about = "Education/career information is required";
//     if (!formData.education) newErrors.education = "Education is required";
//     if (!formData.occupation) newErrors.occupation = "Occupation is required";
//     if (!formData.working_with)
//       newErrors.working_with = "Working with is required";
//     if (!formData.professional_area)
//       newErrors.professional_area = "Professional area is required";
//     if (!formData.eating_habit)
//       newErrors.eating_habit = "Eating habit is required";
//     if (!formData.physical_status)
//       newErrors.physical_status = "Physical status is required";
//     if (!formData.smoking) newErrors.smoking = "Smoking habit is required";
//     if (!formData.drinking) newErrors.drinking = "Drinking habit is required";
//     if (!formData.hobby) newErrors.hobby = "Hobby is required";
//     // if (!formData.photos || formData.photos.length === 0) newErrors.photos = "At least one photo is required";
//     if (!formData.annual_income)
//       newErrors.annual_income = "Annual income is required";
//     if (!formData.family_type)
//       newErrors.family_type = "Family type is required";
//     if (!formData.family_value)
//       newErrors.family_value = "Family value is required";
//     if (!formData.family_status)
//       newErrors.family_status = "Family status is required";
//     if (!formData.sisters) newErrors.sisters = "Number of sisters is required";
//     if (!formData.brothers)
//       newErrors.brothers = "Number of brothers is required";
//     if (!formData.brother_marital_status)
//       newErrors.brother_marital_status = "Brother marital status is required";
//     if (!formData.sister_marital_status)
//       newErrors.sister_marital_status = "Sister marital status is required";
//     if (!formData.mother_occupation)
//       newErrors.mother_occupation = "Mother's occupation is required";
//     if (!formData.father_occupation)
//       newErrors.father_occupation = "Father's occupation is required";
//     if (!formData.about) newErrors.about = "About section is required";
//     if (!formData.thalassemia)
//       newErrors.thalassemia = "Thalassemia status is required";
//     if (!formData.rotary_club)
//       newErrors.rotary_club = "Rotary club information is required";
//     if (!formData.district_no)
//       newErrors.district_no = "District number is required";
//     if (!formData.fb_url) newErrors.fb_url = "Facebook URL is required";
//     if (!formData.twitter_url)
//       newErrors.twitter_url = "Twitter URL is required";
//     if (!formData.gplus_url)
//       newErrors.gplus_url = "Google Plus URL is required";
//     if (!formData.linkedin_url)
//       newErrors.linkedin_url = "LinkedIn URL is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;

//     const dataToSend = {
//       ...formData,
//       hobby: Array.isArray(formData?.hobby)
//         ? formData.hobby.join(",")
//         : formData?.hobby || "", // fallback if undefined
//       profile_created: true,
//       created_by: user._id,
//     };

//     if (isNewProfile) {
//       createMutation.mutate(dataToSend);
//     } else {
//       updateMutation.mutate(dataToSend);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const maxFiles = 6;
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (files.length + formData.photos.length > maxFiles) {
//       toast.error(`You can only upload up to ${maxFiles} photos`);
//       return;
//     }

//     const invalidFiles = files.filter((file) => file.size > maxSize);
//     if (invalidFiles.length > 0) {
//       toast.error("Some files are too large. Maximum size is 5MB per photo.");
//       return;
//     }

//     const newPhotos = files.map((file) => file.name);

//     setFormData((prev) => ({
//       ...prev,
//       files: [...(prev.files || []), ...files],
//       photos: [...prev.photos, ...files], // store full file objects
//     }));
//   };

//   const removePhoto = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//   };

//   // Loading state
//   if (isProfileLoading && user?.profile_id) {
//     return (
//       <div className="container-custom py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//         </div>
//       </div>
//     );
//   }

//   // Form options
//   const createdForOptions = [
//     "Myself",
//     "Brother",
//     "Sister",
//     "Son",
//     "Daughter",
//     "Friend",
//     "Relative",
//   ];

//   const maritalStatusOptions = [
//     "Single",
//     "Married",
//     "Divorced",
//     "Widowed",
//     "Separated",
//   ];

//   const yesNoUnknownOptions = ["Y", "N", "U"];
//   const allHobbies = [
//     "Travel",
//     "Fitness",
//     "Reading",
//     "Cooking",
//     "Music",
//     "Art",
//     "Technology",
//     "Sports",
//     "Movies",
//     "Photography",
//     "Nature",
//     "Gaming",
//     "Dancing",
//     "Writing",
//     "Fashion",
//   ];

//   return (
//     <div className="container-custom py-8 mt-20">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-6xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold mb-8">
//           {!user.profile_created || user.profile_created == false
//             ? "Create Profile"
//             : "Edit Profile"}
//         </h1>

//         {!formData?.dob && (
//           <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
//             Please complete your profile to unlock all features.
//           </div>
//         )}

//         {/* Photos Section */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Profile Photos</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//             {formData.photos.map((photo, index) => (
//               <div key={index} className="relative aspect-square">
//                 <img
//                   src={
//                     typeof photo === "string"
//                       ? `${baseurl}${photo.replace(/\\/g, "/")}` // backend file
//                       : URL.createObjectURL(photo) // local uploaded file
//                   }
//                   alt={`Profile photo ${index + 1}`}
//                   className="w-full h-full object-cover rounded-lg"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => removePhoto(index)}
//                   className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//             {formData.photos.length < 6 && (
//               <label className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handlePhotoUpload}
//                   className="hidden"
//                 />
//                 <div className="text-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-8 w-8 mx-auto text-neutral-400"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
//                     <line x1="16" y1="5" x2="22" y2="5"></line>
//                     <line x1="19" y1="2" x2="19" y2="8"></line>
//                     <circle cx="9" cy="9" r="2"></circle>
//                     <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
//                   </svg>
//                   <span className="text-sm text-neutral-500">Add Photo</span>
//                 </div>
//               </label>
//             )}
//           </div>
//           <p className="text-sm text-neutral-500">
//             Add up to 6 photos. First photo will be your main profile picture.
//           </p>
//         </div>

//         {/* Basic Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Profile Created For *
//               </label>
//               <select
//                 name="created_for"
//                 value={formData.created_for}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.created_for ? "border-red-500" : ""
//                 }`}
//               >
//                 {createdForOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//               {errors.created_for && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.created_for}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 First Name *
//               </label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className={`input ${errors.first_name ? "border-red-500" : ""}`}
//                 placeholder="Enter first name"
//               />
//               {errors.first_name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Last Name *
//               </label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className={`input ${errors.last_name ? "border-red-500" : ""}`}
//                 placeholder="Enter last name"
//               />
//               {errors.last_name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`input ${errors.email ? "border-red-500" : ""}`}
//                 placeholder="Enter email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Mobile *
//               </label>
//               <input
//                 type="text"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className={`input ${errors.mobile ? "border-red-500" : ""}`}
//                 placeholder="Enter mobile number"
//               />
//               {errors.mobile && (
//                 <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Gender *
//               </label>
//               <select
//                 name="sex"
//                 value={formData.sex}
//                 onChange={handleChange}
//                 className={`input ${errors.sex ? "border-red-500" : ""}`}
//               >
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//               </select>
//               {errors.sex && (
//                 <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Date of Birth *
//               </label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob?.slice(0,10)}
//                 onChange={handleChange}
//                 className={`input ${errors.dob ? "border-red-500" : ""}`}
//               />
//               {errors.dob && (
//                 <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Time of Birth *
//               </label>
//               <input
//                 type="text"
//                 name="tob"
//                 value={formData.tob}
//                 onChange={handleChange}
//                 className={`input ${errors.tob ? "border-red-500" : ""}`}
//                 placeholder="HH:MM AM/PM"
//               />
//               {errors.tob && (
//                 <p className="mt-1 text-sm text-red-600">{errors.tob}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-1">
//                 Marital Status *
//               </label>
//               <select
//                 name="marital_status"
//                 value={formData.marital_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.marital_status ? "border-red-500" : ""
//                 }`}
//               >
//                 {maritalStatusOptions.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//               {errors.marital_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.marital_status}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Physical Attributes */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Physical Attributes</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="height"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Height (cm) *
//               </label>
//               <input
//                 type="text"
//                 id="height"
//                 name="height"
//                 value={formData.height}
//                 onChange={handleChange}
//                 className={`input ${errors.height ? "border-red-500" : ""}`}
//                 placeholder="Enter height"
//                 maxLength="50"
//               />
//               {errors.height && (
//                 <p className="mt-1 text-sm text-red-600">{errors.height}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="weight"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Weight (kg) *
//               </label>
//               <input
//                 type="text"
//                 id="weight"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 className={`input ${errors.weight ? "border-red-500" : ""}`}
//                 placeholder="Enter weight"
//                 maxLength="50"
//               />
//               {errors.weight && (
//                 <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="body_type"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Body Type *
//               </label>
//               <input
//                 type="text"
//                 id="body_type"
//                 name="body_type"
//                 value={formData.body_type}
//                 onChange={handleChange}
//                 className={`input ${errors.body_type ? "border-red-500" : ""}`}
//                 placeholder="e.g. Slim, Athletic"
//                 maxLength="100"
//               />
//               {errors.body_type && (
//                 <p className="mt-1 text-sm text-red-600">{errors.body_type}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="complexion"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Complexion *
//               </label>
//               <input
//                 type="text"
//                 id="complexion"
//                 name="complexion"
//                 value={formData.complexion}
//                 onChange={handleChange}
//                 className={`input ${errors.complexion ? "border-red-500" : ""}`}
//                 placeholder="e.g. Fair, Wheatish"
//                 maxLength="50"
//               />
//               {errors.complexion && (
//                 <p className="mt-1 text-sm text-red-600">{errors.complexion}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="blood_group"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Blood Group *
//               </label>
//               <input
//                 type="text"
//                 id="blood_group"
//                 name="blood_group"
//                 value={formData.blood_group}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.blood_group ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. A+"
//                 maxLength="3"
//               />
//               {errors.blood_group && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.blood_group}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="physical_status"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Physical Status *
//               </label>
//               <input
//                 type="text"
//                 id="physical_status"
//                 name="physical_status"
//                 value={formData.physical_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.physical_status ? "border-red-500" : ""
//                 }`}
//                 placeholder="Describe physical status"
//                 maxLength="150"
//               />
//               {errors.physical_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.physical_status}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="thalassemia"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Thalassemia Status *
//               </label>
//               <input
//                 type="text"
//                 id="thalassemia"
//                 name="thalassemia"
//                 value={formData.thalassemia}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.thalassemia ? "border-red-500" : ""
//                 }`}
//                 placeholder="If applicable"
//                 maxLength="112"
//               />
//               {errors.thalassemia && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.thalassemia}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="smoking"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Smoking *
//               </label>
//               <select
//                 id="smoking"
//                 name="smoking"
//                 value={formData.smoking}
//                 onChange={handleChange}
//                 className={`input ${errors.smoking ? "border-red-500" : ""}`}
//               >
//                 {yesNoUnknownOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
//                   </option>
//                 ))}
//               </select>
//               {errors.smoking && (
//                 <p className="mt-1 text-sm text-red-600">{errors.smoking}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="drinking"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Drinking *
//               </label>
//               <select
//                 id="drinking"
//                 name="drinking"
//                 value={formData.drinking}
//                 onChange={handleChange}
//                 className={`input ${errors.drinking ? "border-red-500" : ""}`}
//               >
//                 {yesNoUnknownOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
//                   </option>
//                 ))}
//               </select>
//               {errors.drinking && (
//                 <p className="mt-1 text-sm text-red-600">{errors.drinking}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="eating_habit"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Eating Habit *
//               </label>
//               <input
//                 type="text"
//                 id="eating_habit"
//                 name="eating_habit"
//                 value={formData.eating_habit}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.eating_habit ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Vegetarian, Non-vegetarian"
//                 maxLength="20"
//               />
//               {errors.eating_habit && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.eating_habit}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Location Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="residing_city"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 City *
//               </label>
//               <input
//                 type="text"
//                 id="residing_city"
//                 name="residing_city"
//                 value={formData.residing_city}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.residing_city ? "border-red-500" : ""
//                 }`}
//                 placeholder="Current city"
//                 maxLength="200"
//               />
//               {errors.residing_city && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.residing_city}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="residing_state"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 State *
//               </label>
//               <input
//                 type="text"
//                 id="residing_state"
//                 name="residing_state"
//                 value={formData.residing_state}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.residing_state ? "border-red-500" : ""
//                 }`}
//                 placeholder="Current state"
//                 maxLength="200"
//               />
//               {errors.residing_state && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.residing_state}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="residing_country"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Country *
//               </label>
//               <input
//                 type="text"
//                 id="residing_country"
//                 name="residing_country"
//                 value={formData.residing_country}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.residing_country ? "border-red-500" : ""
//                 }`}
//                 placeholder="Current country"
//                 maxLength="150"
//               />
//               {errors.residing_country && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.residing_country}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="residing_status"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Residing Status *
//               </label>
//               <input
//                 type="text"
//                 id="residing_status"
//                 name="residing_status"
//                 value={formData.residing_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.residing_status ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Citizen, Permanent Resident"
//                 maxLength="100"
//               />
//               {errors.residing_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.residing_status}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="birth_place"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Birth Place *
//               </label>
//               <input
//                 type="text"
//                 id="birth_place"
//                 name="birth_place"
//                 value={formData.birth_place}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.birth_place ? "border-red-500" : ""
//                 }`}
//                 placeholder="City of birth"
//                 maxLength="150"
//               />
//               {errors.birth_place && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.birth_place}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="native_place"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Native Place *
//               </label>
//               <input
//                 type="text"
//                 id="native_place"
//                 name="native_place"
//                 value={formData.native_place}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.native_place ? "border-red-500" : ""
//                 }`}
//                 placeholder="Ancestral home"
//                 maxLength="200"
//               />
//               {errors.native_place && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.native_place}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Background Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Background Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="mother_tongue"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Mother Tongue *
//               </label>
//               <input
//                 type="text"
//                 id="mother_tongue"
//                 name="mother_tongue"
//                 value={formData.mother_tongue}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.mother_tongue ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Hindi, Tamil"
//                 maxLength="50"
//               />
//               {errors.mother_tongue && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.mother_tongue}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="religion"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Religion *
//               </label>
//               <input
//                 type="text"
//                 id="religion"
//                 name="religion"
//                 value={formData.religion}
//                 onChange={handleChange}
//                 className={`input ${errors.religion ? "border-red-500" : ""}`}
//                 placeholder="e.g. Hindu, Muslim"
//                 maxLength="50"
//               />
//               {errors.religion && (
//                 <p className="mt-1 text-sm text-red-600">{errors.religion}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="caste"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Caste *
//               </label>
//               <input
//                 type="text"
//                 id="caste"
//                 name="caste"
//                 value={formData.caste}
//                 onChange={handleChange}
//                 className={`input ${errors.caste ? "border-red-500" : ""}`}
//                 placeholder="Enter caste"
//                 maxLength="100"
//               />
//               {errors.caste && (
//                 <p className="mt-1 text-sm text-red-600">{errors.caste}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="sub_caste"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Sub-caste *
//               </label>
//               <input
//                 type="text"
//                 id="sub_caste"
//                 name="sub_caste"
//                 value={formData.sub_caste}
//                 onChange={handleChange}
//                 className={`input ${errors.sub_caste ? "border-red-500" : ""}`}
//                 placeholder="Enter sub-caste"
//                 maxLength="50"
//               />
//               {errors.sub_caste && (
//                 <p className="mt-1 text-sm text-red-600">{errors.sub_caste}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="raashi"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Raashi *
//               </label>
//               <input
//                 type="text"
//                 id="raashi"
//                 name="raashi"
//                 value={formData.raashi}
//                 onChange={handleChange}
//                 className={`input ${errors.raashi ? "border-red-500" : ""}`}
//                 placeholder="Enter raashi"
//                 maxLength="50"
//               />
//               {errors.raashi && (
//                 <p className="mt-1 text-sm text-red-600">{errors.raashi}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="star"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Star/Nakshatra *
//               </label>
//               <input
//                 type="text"
//                 id="star"
//                 name="star"
//                 value={formData.star}
//                 onChange={handleChange}
//                 className={`input ${errors.star ? "border-red-500" : ""}`}
//                 placeholder="Enter star/nakshatra"
//                 maxLength="250"
//               />
//               {errors.star && (
//                 <p className="mt-1 text-sm text-red-600">{errors.star}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="manglik"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Manglik *
//               </label>
//               <select
//                 id="manglik"
//                 name="manglik"
//                 value={formData.manglik}
//                 onChange={handleChange}
//                 className={`input ${errors.manglik ? "border-red-500" : ""}`}
//               >
//                 {yesNoUnknownOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option === "Y" ? "Yes" : option === "N" ? "No" : "Unknown"}
//                   </option>
//                 ))}
//               </select>
//               {errors.manglik && (
//                 <p className="mt-1 text-sm text-red-600">{errors.manglik}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Professional Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Professional Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="education"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Education *
//               </label>
//               <input
//                 type="text"
//                 id="education"
//                 name="education"
//                 value={formData.education}
//                 onChange={handleChange}
//                 className={`input ${errors.education ? "border-red-500" : ""}`}
//                 placeholder="Highest education"
//                 maxLength="250"
//               />
//               {errors.education && (
//                 <p className="mt-1 text-sm text-red-600">{errors.education}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="occupation"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Occupation *
//               </label>
//               <input
//                 type="text"
//                 id="occupation"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 className={`input ${errors.occupation ? "border-red-500" : ""}`}
//                 placeholder="Current occupation"
//                 maxLength="250"
//               />
//               {errors.occupation && (
//                 <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="working_with"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Working With *
//               </label>
//               <input
//                 type="text"
//                 id="working_with"
//                 name="working_with"
//                 value={formData.working_with}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.working_with ? "border-red-500" : ""
//                 }`}
//                 placeholder="Company/organization name"
//                 maxLength="150"
//               />
//               {errors.working_with && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.working_with}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="professional_area"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Professional Area *
//               </label>
//               <input
//                 type="text"
//                 id="professional_area"
//                 name="professional_area"
//                 value={formData.professional_area}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.professional_area ? "border-red-500" : ""
//                 }`}
//                 placeholder="Field of work"
//                 maxLength="200"
//               />
//               {errors.professional_area && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.professional_area}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="annual_income"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Annual Income (INR) *
//               </label>
//               <input
//                 type="text"
//                 id="annual_income"
//                 name="annual_income"
//                 value={formData.annual_income}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.annual_income ? "border-red-500" : ""
//                 }`}
//                 placeholder="Annual income"
//                 maxLength="11"
//               />
//               {errors.annual_income && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.annual_income}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Family Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Family Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="family_type"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Family Type *
//               </label>
//               <input
//                 type="text"
//                 id="family_type"
//                 name="family_type"
//                 value={formData.family_type}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.family_type ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Nuclear, Joint"
//                 maxLength="100"
//               />
//               {errors.family_type && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.family_type}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="family_value"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Family Values *
//               </label>
//               <input
//                 type="text"
//                 id="family_value"
//                 name="family_value"
//                 value={formData.family_value}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.family_value ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Traditional, Modern"
//                 maxLength="100"
//               />
//               {errors.family_value && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.family_value}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="family_status"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Family Status *
//               </label>
//               <input
//                 type="text"
//                 id="family_status"
//                 name="family_status"
//                 value={formData.family_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.family_status ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. Middle Class, Upper Middle"
//                 maxLength="100"
//               />
//               {errors.family_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.family_status}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="brothers"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Number of Brothers *
//               </label>
//               <input
//                 type="text"
//                 id="brothers"
//                 name="brothers"
//                 value={formData.brothers}
//                 onChange={handleChange}
//                 className={`input ${errors.brothers ? "border-red-500" : ""}`}
//                 placeholder="Number of brothers"
//                 maxLength="4"
//               />
//               {errors.brothers && (
//                 <p className="mt-1 text-sm text-red-600">{errors.brothers}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="sisters"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Number of Sisters *
//               </label>
//               <input
//                 type="text"
//                 id="sisters"
//                 name="sisters"
//                 value={formData.sisters}
//                 onChange={handleChange}
//                 className={`input ${errors.sisters ? "border-red-500" : ""}`}
//                 placeholder="Number of sisters"
//                 maxLength="4"
//               />
//               {errors.sisters && (
//                 <p className="mt-1 text-sm text-red-600">{errors.sisters}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="brother_marital_status"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Brothers' Marital Status *
//               </label>
//               <input
//                 type="text"
//                 id="brother_marital_status"
//                 name="brother_marital_status"
//                 value={formData.brother_marital_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.brother_marital_status ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. 1 Married, 1 Unmarried"
//                 maxLength="20"
//               />
//               {errors.brother_marital_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.brother_marital_status}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="sister_marital_status"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Sisters' Marital Status *
//               </label>
//               <input
//                 type="text"
//                 id="sister_marital_status"
//                 name="sister_marital_status"
//                 value={formData.sister_marital_status}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.sister_marital_status ? "border-red-500" : ""
//                 }`}
//                 placeholder="e.g. 1 Married, 1 Unmarried"
//                 maxLength="20"
//               />
//               {errors.sister_marital_status && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.sister_marital_status}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="father_occupation"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Father's Occupation *
//               </label>
//               <input
//                 type="text"
//                 id="father_occupation"
//                 name="father_occupation"
//                 value={formData.father_occupation}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.father_occupation ? "border-red-500" : ""
//                 }`}
//                 placeholder="Father's occupation"
//                 maxLength="250"
//               />
//               {errors.father_occupation && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.father_occupation}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="mother_occupation"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Mother's Occupation *
//               </label>
//               <input
//                 type="text"
//                 id="mother_occupation"
//                 name="mother_occupation"
//                 value={formData.mother_occupation}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.mother_occupation ? "border-red-500" : ""
//                 }`}
//                 placeholder="Mother's occupation"
//                 maxLength="250"
//               />
//               {errors.mother_occupation && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.mother_occupation}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Lifestyle & Interests */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">Lifestyle & Interests</h2>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-neutral-700 mb-3">
//               Select Your Interests (Choose at least 3) *
//             </label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {allHobbies.map((hob) => {
//                 const isSelected = formData.hobby.includes(hob);

//                 return (
//                   <label
//                     key={hob}
//                     className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
//                       isSelected
//                         ? "border-primary-500 bg-primary-50 text-primary-700"
//                         : "border-neutral-200 hover:border-primary-200"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       name="hobby"
//                       value={hob}
//                       checked={isSelected}
//                       onChange={(e) => {
//                         const selected = formData.hobby;
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,
//                             hobby: [...selected, hob],
//                           });
//                         } else {
//                           setFormData({
//                             ...formData,
//                             hobby: selected.filter((item) => item !== hob),
//                           });
//                         }
//                       }}
//                       className="sr-only"
//                     />
//                     <span className="ml-2">{hob}</span>
//                   </label>
//                 );
//               })}
//             </div>
//             {errors.hobby && (
//               <p className="mt-1 text-sm text-red-600">{errors.hobby}</p>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <label
//                 htmlFor="edu_career_about"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 About Education & Career *
//               </label>
//               <textarea
//                 id="edu_career_about"
//                 name="edu_career_about"
//                 value={formData.edu_career_about}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.edu_career_about ? "border-red-500" : ""
//                 }`}
//                 placeholder="Describe your education and career"
//                 rows="3"
//               />
//               {errors.edu_career_about && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.edu_career_about}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Social & Additional Information */}
//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Social & Additional Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="rotary_club"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Rotary Club Membership *
//               </label>
//               <input
//                 type="text"
//                 id="rotary_club"
//                 name="rotary_club"
//                 value={formData.rotary_club}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.rotary_club ? "border-red-500" : ""
//                 }`}
//                 placeholder="If applicable"
//                 maxLength="112"
//               />
//               {errors.rotary_club && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.rotary_club}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="district_no"
//                 className="block text-sm font-medium text-neutral-700"
//               >
//                 District Number *
//               </label>
//               <input
//                 type="text"
//                 id="district_no"
//                 name="district_no"
//                 value={formData.district_no}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.district_no ? "border-red-500" : ""
//                 }`}
//                 placeholder="If applicable"
//                 maxLength="112"
//               />
//               {errors.district_no && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.district_no}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="fb_url"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Facebook Profile *
//               </label>
//               <input
//                 type="url"
//                 id="fb_url"
//                 name="fb_url"
//                 value={formData.fb_url}
//                 onChange={handleChange}
//                 className={`input ${errors.fb_url ? "border-red-500" : ""}`}
//                 placeholder="Facebook profile URL"
//               />
//               {errors.fb_url && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fb_url}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="twitter_url"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Twitter Profile *
//               </label>
//               <input
//                 type="url"
//                 id="twitter_url"
//                 name="twitter_url"
//                 value={formData.twitter_url}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.twitter_url ? "border-red-500" : ""
//                 }`}
//                 placeholder="Twitter profile URL"
//               />
//               {errors.twitter_url && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.twitter_url}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="gplus_url"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 Google+ Profile *
//               </label>
//               <input
//                 type="url"
//                 id="gplus_url"
//                 name="gplus_url"
//                 value={formData.gplus_url}
//                 onChange={handleChange}
//                 className={`input ${errors.gplus_url ? "border-red-500" : ""}`}
//                 placeholder="Google+ profile URL"
//               />
//               {errors.gplus_url && (
//                 <p className="mt-1 text-sm text-red-600">{errors.gplus_url}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="linkedin_url"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 LinkedIn Profile *
//               </label>
//               <input
//                 type="url"
//                 id="linkedin_url"
//                 name="linkedin_url"
//                 value={formData.linkedin_url}
//                 onChange={handleChange}
//                 className={`input ${
//                   errors.linkedin_url ? "border-red-500" : ""
//                 }`}
//                 placeholder="LinkedIn profile URL"
//               />
//               {errors.linkedin_url && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.linkedin_url}
//                 </p>
//               )}
//             </div>

//             <div className="md:col-span-2">
//               <label
//                 htmlFor="about"
//                 className="block text-sm font-medium text-neutral-700 mb-1"
//               >
//                 About Yourself *
//               </label>
//               <textarea
//                 id="about"
//                 name="about"
//                 value={formData.about}
//                 onChange={handleChange}
//                 className={`input ${errors.about ? "border-red-500" : ""}`}
//                 placeholder="Tell us about yourself"
//                 rows="4"
//               />
//               {errors.about && (
//                 <p className="mt-1 text-sm text-red-600">{errors.about}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {Object.keys(errors).length > 0 && (
//           <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
//             <ul className="list-disc pl-5">
//               {Object.values(errors).map((error, index) => (
//                 <li key={index} className="font-semibold">
//                   {error}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             disabled={createMutation.isPending || updateMutation.isPending}
//             onClick={handleSubmit}
//             className="btn-primary"
//           >
//             {createMutation.isPending || updateMutation.isPending ? (
//               <span className="flex items-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 {isNewProfile ? "Creating Profile..." : "Saving Changes..."}
//               </span>
//             ) : isNewProfile ? (
//               "Create Profile"
//             ) : (
//               "Save Changes"
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EditProfile;

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  profileRegister,
  getProfile,
  updateProfile,
  updateProfileFromCV,
} from "../../api/profile";
import { updateUserApi } from "../../api/user.api";
import { useLocation } from "react-router-dom";
import LocationInformation from "../../components/profile/LocationInformation";

const EditProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlProfileId = searchParams.get("profile_id");
  const { user, updateUser } = useAuth();
  const [isNewProfile, setIsNewProfile] = useState(true);
  const [errors, setErrors] = useState({});
  const [isEditingOtherProfile, setIsEditingOtherProfile] = useState(false);
  const [showSiblingForm, setShowSiblingForm] = useState(false);
  const [siblings, setSiblings] = useState([]);
  const [interestChoices, setInterestChoices] = useState([]);
  const [showJobForm, setShowJobForm] = useState(true);
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  const baseurl = import.meta.env.VITE_BASE_URL;
  const targetProfileId = urlProfileId || user?.profile_id;
  console.log(targetProfileId);

  // Available interest options (5 choices max)
  const interestOptions = [
    "Music",
    "Travel",
    "Reading",
    "Cooking",
    "Sports",
    "Art",
    "Photography",
    "Dancing",
    "Writing",
    "Technology",
    "Gardening",
    "Fitness",
    "Movies",
    "Gaming",
    "Yoga",
  ];

  // Initial form state with new fields
  const initialFormData = {
    profile_id: "",
    profile_created: false,
    created_by: user?._id || "",
    created_for: "Myself",
    first_name: user?.name || "",
    family_name: "",
    email: user?.email || "",
    mother_mobile: "",
    father_mobile: "",
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
    current_employer: "",
    professional_area: "",
    employment_type: "Job",
    meal_preference: "Vegetarian",
    physical_status: "Normal",
    single_parent: false,
    single_child: false,
    family_income: "",
    gotra: "",
    smoking: "U",
    drinking: "U",
    hobby: "",
    photos: [],
    cv_pdf: null,
    janam_kundli_pdf: null,
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
    linkedin_url: "",
    paid_member: "N",
    membership_expired_on: new Date(),
    siblings: [],
    interest_choices: [],
    location: {
      country: "",
      state: "",
      city: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState({
    photos: [],
    cv_pdf: null,
    janam_kundli_pdf: null,
  });

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["profile", targetProfileId],
    queryFn: () => getProfile(targetProfileId),
    enabled: Boolean(targetProfileId),
    staleTime: 0,
    refetchOnMount: true,
  });

  console.log(targetProfileId)

  useEffect(() => {
    if (urlProfileId) {
      setIsEditingOtherProfile(true);
    }
  }, [urlProfileId]);

  console.log(profileData);

  useEffect(() => {
    if (profileData?.profile) {
      setIsNewProfile(false);
      const profile = profileData.profile;
      setFormData({
        ...initialFormData,
        ...profile,
        dob: profile.dob?.slice(0, 10),
      });
      setSiblings(profile.siblings || []);
      setInterestChoices(profile.interest_choices || []);

      // Set employment type visibility
      setShowJobForm(profile.employment_type === "Job");
      setShowBusinessForm(profile.employment_type === "Business");
    } else if (isSuccess) {
      console.warn("Profile object missing in data", profileData);
    }
  }, [profileData, isSuccess]);

  // Handle employment type change
  const handleEmploymentTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      employment_type: type,
    }));
    setShowJobForm(type === "Job");
    setShowBusinessForm(type === "Business");
  };

  // Handle sibling addition
  const addSibling = () => {
    if (siblings.length >= 5) {
      toast.error("Maximum 5 siblings allowed");
      return;
    }
    setSiblings([
      ...siblings,
      {
        name: "",
        gender: "M",
        age: "",
        marital_status: "Single",
        occupation: "",
        relationship: "Brother",
      },
    ]);
  };

  // Handle sibling update
  const updateSibling = (index, field, value) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index][field] = value;
    setSiblings(updatedSiblings);
  };

  // Handle sibling removal
  const removeSibling = (index) => {
    const updatedSiblings = siblings.filter((_, i) => i !== index);
    setSiblings(updatedSiblings);
  };

  const handleInterestToggle = (interest) => {
    let updatedInterests = [];

    if (interestChoices.includes(interest)) {
      updatedInterests = interestChoices.filter((i) => i !== interest);
    } else {
      if (interestChoices.length >= 5) {
        toast.error("Maximum 5 interest choices allowed");
        return;
      }
      updatedInterests = [...interestChoices, interest];
    }

    setInterestChoices(updatedInterests);

    // 🔥 AUTO SYNC hobby FIELD
    setFormData((prev) => ({
      ...prev,
      hobby: updatedInterests.join(","),
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e, field) => {
    const selectedFiles = Array.from(e.target.files);

    if (field === "photos") {
      const maxFiles = 6;
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (selectedFiles.length + files.photos.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} photos`);
        return;
      }

      const invalidFiles = selectedFiles.filter((file) => file.size > maxSize);
      if (invalidFiles.length > 0) {
        toast.error("Some files are too large. Maximum size should be under 1MB per photo.");
        return;
      }

      setFiles((prev) => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles],
      }));
    } else if (field === "cv_pdf" || field === "janam_kundli_pdf") {
      const file = selectedFiles[0];
      if (file && file.type === "application/pdf") {
        setFiles((prev) => ({
          ...prev,
          [field]: file,
        }));
      } else {
        toast.error("Please upload a PDF file");
      }
    }
  };

  // Handle CV upload and parsing
  const handleCVUploadAndParse = async () => {
    if (!files.cv_pdf) {
      toast.error("Please select a CV PDF file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cv_pdf", files.cv_pdf);

      const response = await updateProfileFromCV(targetProfileId, formData);
      if (response.status) {
        toast.success("Profile updated from CV successfully!");
        // Refresh profile data
        // You might want to refetch the profile data here
      }
    } catch (error) {
      toast.error("Failed to update profile from CV");
    }
  };

  // Create profile mutation
  const createMutation = useMutation({
    mutationFn: async (formData) => {
      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "siblings" || key === "interest_choices") {
          fd.append(key, JSON.stringify(formData[key]));
        } else if (
          key !== "photos" &&
          key !== "cv_pdf" &&
          key !== "janam_kundli_pdf" &&
          key !== "location"
        ) {
          fd.append(key, formData[key]);
        }
      });

      files.photos.forEach((photo) => fd.append("photos", photo));
      if (files.cv_pdf) fd.append("cv_pdf", files.cv_pdf);
      if (files.janam_kundli_pdf)
        fd.append("janam_kundli_pdf", files.janam_kundli_pdf);

      return profileRegister(fd);
    },

    onSuccess: async (data) => {
      const profileId = data?.profile?.profile_id;

      if (!profileId) {
        toast.error("Profile created but profile ID missing");
        return;
      }
      updateUser({
        profile_id: profileId,
        profile_created: true,
      });
      toast.success("Profile created successfully!");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create profile");
    },
  });

  // Update profile mutation
  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const fd = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (
          key === "siblings" ||
          key === "interest_choices" ||
          key === "location"
        ) {
          fd.append(key, JSON.stringify(formData[key]));
        } else if (
          key !== "photos" &&
          key !== "cv_pdf" &&
          key !== "janam_kundli_pdf" &&
          key !== "location"
        ) {
          fd.append(key, formData[key]);
        }
      });

      // Append new files
      files.photos.forEach((photo) => {
        fd.append("photos", photo);
      });

      if (files.cv_pdf) {
        fd.append("cv_pdf", files.cv_pdf);
      }

      if (files.janam_kundli_pdf) {
        fd.append("janam_kundli_pdf", files.janam_kundli_pdf);
      }

      // Include existing photos
      const existingPhotos = (formData.photos || []).filter(
        (photo) => typeof photo === "string"
      );
      fd.append("existingPhotos", JSON.stringify(existingPhotos));

      return updateProfile(profileData?.profile._id, fd);
    },

    onSuccess: (response) => {
      // Make sure response has the expected format
      if (response && response.status === true) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(
          response?.message || "Profile update completed with warnings"
        );
      }
    },

    onError: (error) => {
      // Handle error more gracefully
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile";
      console.error("Update profile error:", error);
      toast.error(errorMessage);
    },
  });

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.family_name)
      newErrors.family_name = "Family name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.marital_status)
      newErrors.marital_status = "Marital status is required";
    if (!formData.sex) newErrors.sex = "Gender is required";
    if (!formData.religion) newErrors.religion = "Religion is required";
    if (!formData.caste) newErrors.caste = "Caste is required";
    if (!formData.mother_tongue)
      newErrors.mother_tongue = "Mother tongue is required";
    if (!formData.residing_city) newErrors.residing_city = "City is required";
    if (!formData.residing_state)
      newErrors.residing_state = "State is required";
    if (!formData.residing_country)
      newErrors.residing_country = "Country is required";
    if (!formData.education) newErrors.education = "Education is required";
    // if (!formData.occupation) newErrors.occupation = "Occupation is required";
    if (!formData.annual_income)
      newErrors.annual_income = "Annual income is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// और नीचे form submission में location object को handle करें:
const handleSubmit = () => {
  if (!validateForm()) return;

  const dataToSend = {
    ...formData,
    siblings,
    interest_choices: interestChoices,
    hobby: Array.isArray(formData?.hobby)
      ? formData.hobby.join(",")
      : formData?.hobby || "",
    profile_created: true,
    created_by: user._id,
    // ✅ Location object को manually add करें (optional)
    location: {
      country: formData.residing_country,
      state: formData.residing_state,
      city: formData.residing_city
    }
  };

  console.log("Submitting data:", dataToSend); // Debug log

  if (isNewProfile) {
    createMutation.mutate(dataToSend);
  } else {
    updateMutation.mutate(dataToSend);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

// EditProfile.jsx में सिर्फ ये function बदलें:
const handleLocationChange = (field, value) => {
  console.log(`Updating ${field} to:`, value); // Debug log
  
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};


  const removePhoto = (index) => {
    // Check if it's an existing photo (string) or new photo (File object)
    const isExistingPhoto = index < formData.photos.length;

    if (isExistingPhoto) {
      // Existing photo: remove from formData.photos
      const updatedPhotos = [...formData.photos];
      updatedPhotos.splice(index, 1);

      setFormData((prev) => ({
        ...prev,
        photos: updatedPhotos,
      }));
    } else {
      // New photo: remove from files.photos
      const newIndex = index - formData.photos.length;
      const updatedFiles = [...files.photos];
      updatedFiles.splice(newIndex, 1);

      setFiles((prev) => ({
        ...prev,
        photos: updatedFiles,
      }));
    }
  };

  // Remove PDF file
  const removePDF = (field) => {
    setFiles((prev) => ({
      ...prev,
      [field]: null,
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

  const physicalStatusOptions = [
    "Normal",
    "Physically Challenged",
    "Special Needs",
    "Other",
  ];

  const mealPreferenceOptions = [
    "Vegetarian",
    "Non-Vegetarian",
    "Jain",
    "Jain (No Garlic/Onion)",
    "Eggetarian",
  ];

  const employmentTypeOptions = [
    "Job",
    "Business",
    "Self-Employed",
    "Student",
    "Other",
  ];

  const yesNoUnknownOptions = ["Y", "N", "U"];
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

        {!formData?.dob && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
            Please complete your profile to unlock all features.
          </div>
        )}

        {/* CV Upload Section */}
    {/* CV Upload Section */}
<div className="bg-white p-6 rounded-xl shadow-sm mb-6">
  <h2 className="text-xl font-semibold mb-4">CV / Resume Upload</h2>
  
  {/* Display existing CV if available */}
  {formData.cv_pdf && typeof formData.cv_pdf === 'string' && (
    <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-16 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="absolute -bottom-1 -right-1 bg-purple-500 text-white 
                text-xs rounded-full w-5 h-5 flex items-center justify-center">CV</span>
            </div>
          </div>
          <div>
            <p className="font-medium text-neutral-700">CV Uploaded</p>
            <p className="text-sm text-neutral-500">Click to view/download</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <a
            href={`${baseurl}${formData.cv_pdf.replace(/\\/g, "/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm 
              hover:bg-blue-200 transition-colors"
          >
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </div>
          </a>
          
       <button
  type="button"
  onClick={() => {
    if (confirm("Are you sure you want to remove this CV?")) {
      setFormData((prev) => ({
        ...prev,
        cv_pdf: null,
      }));
      toast.success("CV removed successfully");
    }
  }}
  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm 
    hover:bg-red-200 transition-colors"
>
  Remove
</button>

        </div>
      </div>
    </div>
  )}
  
  {/* Rest of the CV upload section remains same */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      Upload CV (PDF)
    </label>
    
    {files.cv_pdf && (
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs 
                  rounded-full w-5 h-5 flex items-center justify-center">New</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-neutral-700">{files.cv_pdf.name}</p>
              <p className="text-sm text-neutral-500">
                {(files.cv_pdf.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => removePDF("cv_pdf")}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm 
                hover:bg-red-200 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )}
    
    {!files.cv_pdf && !formData.cv_pdf && (
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-primary-50 border-2 border-primary-200 
          border-dashed rounded-lg p-4 text-center hover:bg-primary-100 transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, "cv_pdf")}
            className="hidden"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto 
            text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm text-primary-700">Upload CV PDF</span>
        </label>
      </div>
    )}
  </div>
  
</div>

        {/* Photos Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={
                    typeof photo === "string"
                      ? `${baseurl}${photo.replace(/\\/g, "/")}`
                      : URL.createObjectURL(photo)
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
            {files.photos.map((photo, index) => (
              <div key={`new-${index}`} className="relative aspect-square">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`New photo ${index + 1}`}
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
            {files.photos.length + formData.photos.length < 6 && (
              <label className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, "photos")}
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
                className={`input ${
                  errors.created_for ? "border-red-500" : ""
                }`}
              >
                {createdForOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.created_for && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.created_for}
                </p>
              )}
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
                Family Name *
              </label>
              <input
                type="text"
                name="family_name"
                value={formData.family_name}
                onChange={handleChange}
                className={`input ${
                  errors.family_name ? "border-red-500" : ""
                }`}
                placeholder="Enter family name"
              />
              {errors.family_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.family_name}
                </p>
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
                className={`input ${errors.mobile ? "border-red-500" : ""}`}
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Mother's Mobile
              </label>
              <input
                type="text"
                name="mother_mobile"
                value={formData.mother_mobile}
                onChange={handleChange}
                className="input"
                placeholder="Enter mother's mobile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Father's Mobile
              </label>
              <input
                type="text"
                name="father_mobile"
                value={formData.father_mobile}
                onChange={handleChange}
                className="input"
                placeholder="Enter father's mobile"
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
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Height (cm)
              </label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input"
                placeholder="Enter height"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input"
                placeholder="Enter weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Body Type
              </label>
              <input
                type="text"
                name="body_type"
                value={formData.body_type}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Slim, Athletic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Complexion
              </label>
              <input
                type="text"
                name="complexion"
                value={formData.complexion}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Fair, Wheatish"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Blood Group
              </label>
              <input
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="input"
                placeholder="e.g. A+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Physical Status *
              </label>
              <select
                name="physical_status"
                value={formData.physical_status}
                onChange={handleChange}
                className={`input ${
                  errors.physical_status ? "border-red-500" : ""
                }`}
              >
                {physicalStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.physical_status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.physical_status}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Thalassemia Status
              </label>
              <input
                type="text"
                name="thalassemia"
                value={formData.thalassemia}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
              />
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Lifestyle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Smoking
              </label>
              <select
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
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Drinking
              </label>
              <select
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
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Meal Preference *
              </label>
              <select
                name="meal_preference"
                value={formData.meal_preference}
                onChange={handleChange}
                className="input"
              >
                {mealPreferenceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location Information - Hierarchical */}
        <LocationInformation
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleLocationChange={handleLocationChange}
        />

        {/* Background Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Background Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Mother Tongue *
              </label>
              <input
                type="text"
                name="mother_tongue"
                value={formData.mother_tongue}
                onChange={handleChange}
                className={`input ${
                  errors.mother_tongue ? "border-red-500" : ""
                }`}
                placeholder="e.g. Hindi, Tamil"
              />
              {errors.mother_tongue && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.mother_tongue}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Religion *
              </label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className={`input ${errors.religion ? "border-red-500" : ""}`}
                placeholder="e.g. Hindu, Muslim"
              />
              {errors.religion && (
                <p className="mt-1 text-sm text-red-600">{errors.religion}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Caste *
              </label>
              <input
                type="text"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className={`input ${errors.caste ? "border-red-500" : ""}`}
                placeholder="Enter caste"
              />
              {errors.caste && (
                <p className="mt-1 text-sm text-red-600">{errors.caste}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Sub-caste
              </label>
              <input
                type="text"
                name="sub_caste"
                value={formData.sub_caste}
                onChange={handleChange}
                className="input"
                placeholder="Enter sub-caste"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Raashi
              </label>
              <input
                type="text"
                name="raashi"
                value={formData.raashi}
                onChange={handleChange}
                className="input"
                placeholder="Enter raashi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Star/Nakshatra
              </label>
              <input
                type="text"
                name="star"
                value={formData.star}
                onChange={handleChange}
                className="input"
                placeholder="Enter star/nakshatra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Gotra
              </label>
              <input
                type="text"
                name="gotra"
                value={formData.gotra}
                onChange={handleChange}
                className="input"
                placeholder="Enter gotra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Manglik
              </label>
              <select
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Employment Type *
            </label>
            <div className="flex flex-wrap gap-2">
              {employmentTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleEmploymentTypeChange(type)}
                  className={`px-4 py-2 rounded-lg border ${
                    formData.employment_type === type
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-primary-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Job Form */}
          {showJobForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Current Employer *
                </label>
                <input
                  type="text"
                  name="current_employer"
                  value={formData.current_employer}
                  onChange={handleChange}
                  className="input"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`input ${
                    errors.occupation ? "border-red-500" : ""
                  }`}
                  placeholder="Your job title"
                />
                {/* {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.occupation}
                  </p>
                )} */}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Professional Area
                </label>
                <input
                  type="text"
                  name="professional_area"
                  value={formData.professional_area}
                  onChange={handleChange}
                  className="input"
                  placeholder="Field of work"
                />
              </div>
            </div>
          )}

          {/* Business Form */}
          {showBusinessForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-green-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="current_employer"
                  value={formData.current_employer}
                  onChange={handleChange}
                  className="input"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Business Type *
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="input"
                  placeholder="Type of business"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Business Description
                </label>
                <textarea
                  name="professional_area"
                  value={formData.professional_area}
                  onChange={handleChange}
                  className="input"
                  placeholder="Describe your business"
                  rows="3"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Education *
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`input ${errors.education ? "border-red-500" : ""}`}
                placeholder="Highest education"
              />
              {errors.education && (
                <p className="mt-1 text-sm text-red-600">{errors.education}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Annual Income (₹) *
              </label>
              <input
                type="text"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                className={`input ${
                  errors.annual_income ? "border-red-500" : ""
                }`}
                placeholder="Annual income"
              />
              {errors.annual_income && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.annual_income}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                About Education & Career
              </label>
              <textarea
                name="edu_career_about"
                value={formData.edu_career_about}
                onChange={handleChange}
                className="input"
                placeholder="Describe your education and career journey"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Family Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="single_parent"
                  checked={formData.single_parent}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Single Parent Family
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="single_child"
                  checked={formData.single_child}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Single Child
                </span>
              </label>
            </div>
          </div>

          {/* Conditional fields based on single parent/child */}
          {!formData.single_child && (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Siblings (Max: 5)
                  </label>
                  <button
                    type="button"
                    onClick={addSibling}
                    className="text-sm text-primary-600 hover:text-primary-800"
                    disabled={siblings.length >= 5}
                  >
                    + Add Sibling
                  </button>
                </div>

                {siblings.map((sibling, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={sibling.name}
                        onChange={(e) =>
                          updateSibling(index, "name", e.target.value)
                        }
                        className="input text-sm"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={sibling.gender}
                        onChange={(e) =>
                          updateSibling(index, "gender", e.target.value)
                        }
                        className="input text-sm"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        value={sibling.age}
                        onChange={(e) =>
                          updateSibling(index, "age", e.target.value)
                        }
                        className="input text-sm"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Relationship
                      </label>
                      <select
                        value={sibling.relationship}
                        onChange={(e) =>
                          updateSibling(index, "relationship", e.target.value)
                        }
                        className="input text-sm"
                      >
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Occupation
                      </label>
                      <input
                        type="text"
                        value={sibling.occupation}
                        onChange={(e) =>
                          updateSibling(index, "occupation", e.target.value)
                        }
                        className="input text-sm"
                        placeholder="Occupation"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeSibling(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Number of Brothers
                  </label>
                  <input
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    className="input"
                    placeholder="Number of brothers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Number of Sisters
                  </label>
                  <input
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    className="input"
                    placeholder="Number of sisters"
                  />
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Family Income
              </label>
              <input
                type="text"
                name="family_income"
                value={formData.family_income}
                onChange={handleChange}
                className="input"
                placeholder="Total family income"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Family Type
              </label>
              <input
                type="text"
                name="family_type"
                value={formData.family_type}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Nuclear, Joint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Family Values
              </label>
              <input
                type="text"
                name="family_value"
                value={formData.family_value}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Traditional, Modern"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Family Status
              </label>
              <input
                type="text"
                name="family_status"
                value={formData.family_status}
                onChange={handleChange}
                className="input"
                placeholder="e.g. Middle Class, Upper Middle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Father's Occupation
              </label>
              <input
                type="text"
                name="father_occupation"
                value={formData.father_occupation}
                onChange={handleChange}
                className="input"
                placeholder="Father's occupation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Mother's Occupation
              </label>
              <input
                type="text"
                name="mother_occupation"
                value={formData.mother_occupation}
                onChange={handleChange}
                className="input"
                placeholder="Mother's occupation"
              />
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Interests (Choose up to 5)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {interestOptions.map((interest) => (
              <label
                key={interest}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  interestChoices.includes(interest)
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-neutral-200 hover:border-primary-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={interestChoices.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                  className="sr-only"
                />
                <span className="ml-2 text-sm">{interest}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-neutral-500">
            Selected: {interestChoices.length}/5 interests
          </p>
        </div>

        {/* Janam Kundli Upload */}
    {/* Janam Kundli Upload & View Section */}
<div className="bg-white p-6 rounded-xl shadow-sm mb-6">
  <h2 className="text-xl font-semibold mb-4">Background Documents</h2>
  
  <div className="mb-4">
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      Janam Kundli (Horoscope)
    </label>
    
    {/* Display existing Janam Kundli if available */}
    {formData.janam_kundli_pdf && typeof formData.janam_kundli_pdf === 'string' && (
      <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs 
                  rounded-full w-5 h-5 flex items-center justify-center">PDF</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-neutral-700">Janam Kundli Uploaded</p>
              <p className="text-sm text-neutral-500">Click to view/download</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <a
              href={`${baseurl}${formData.janam_kundli_pdf.replace(/\\/g, "/")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm 
                hover:bg-blue-200 transition-colors"
            >
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </div>
            </a>
            
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to remove this Janam Kundli?")) {
                  setFormData(prev => ({
                    ...prev,
                    janam_kundli_pdf: null
                  }));
                  toast.success("Janam Kundli removed successfully");
                }
              }}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm 
                hover:bg-red-200 transition-colors"
            >
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </div>
            </button>
          </div>
        </div>
      </div>
    )}
    
    {/* Display newly uploaded file */}
    {files.janam_kundli_pdf && (
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs 
                  rounded-full w-5 h-5 flex items-center justify-center">New</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-neutral-700">{files.janam_kundli_pdf.name}</p>
              <p className="text-sm text-neutral-500">
                {(files.janam_kundli_pdf.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => removePDF("janam_kundli_pdf")}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm 
              hover:bg-red-200 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    )}
    
    {/* Upload button (only show if no file is selected) */}
    {!files.janam_kundli_pdf && !formData.janam_kundli_pdf && (
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-blue-50 border-2 border-blue-200 
          border-dashed rounded-lg p-6 text-center hover:bg-blue-100 transition-colors 
          flex-1 max-w-xs">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, "janam_kundli_pdf")}
            className="hidden"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto 
            text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm text-blue-700 font-medium">Upload Janam Kundli PDF</span>
          <p className="text-xs text-neutral-500 mt-1">Max 10MB • PDF only</p>
        </label>
      </div>
    )}
    
    <p className="text-sm text-neutral-500 mt-3">
      Upload your Janam Kundli PDF for astrological matching. You can view, 
      download or replace it anytime.
    </p>
  </div>
</div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Social Media Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Facebook Profile
              </label>
              <input
                type="url"
                name="fb_url"
                value={formData.fb_url}
                onChange={handleChange}
                className="input"
                placeholder="Facebook profile URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Twitter Profile
              </label>
              <input
                type="url"
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                className="input"
                placeholder="Twitter profile URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="input"
                placeholder="LinkedIn profile URL"
              />
            </div>
          </div>
        </div>

        {/* About Yourself */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">About Yourself</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Tell us about yourself
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="input"
              placeholder="Share your personality, values, interests, and what you're looking for in a partner..."
              rows="5"
            />
          </div>
        </div>

        {/* Other Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Other Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Rotary Club Membership
              </label>
              <input
                type="text"
                name="rotary_club"
                value={formData.rotary_club}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                District Number
              </label>
              <input
                type="text"
                name="district_no"
                value={formData.district_no}
                onChange={handleChange}
                className="input"
                placeholder="If applicable"
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
        <div className="flex justify-between items-center">
          {!isNewProfile && (
            <button
              type="button"
              onClick={() => {
                // Generate PDF functionality
                // You'll need to implement the API call to generate PDF
                toast.info("PDF generation feature coming soon!");
              }}
              className="btn-secondary"
            >
              Generate Marriage Profile PDF
            </button>
          )}

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
