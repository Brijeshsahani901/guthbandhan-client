import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth.api";
import { validateUserInput } from "../../utils/helperFunctions";

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleFromUrl = searchParams.get("role");
  const user_id = searchParams.get("user_id");
  const isAdmin = roleFromUrl === "A";

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // mobile: "",
    role: roleFromUrl || "U",
  });

  const [profileData, setprofileData] = useState({
    profile_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    mobile_verified: "N",
    paid_member: "N",
    free_email_used: false,
    agreeTerms: false,
    first_name: "",
    last_name: "",
    sex: "",
    dob: "",
    tob: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleUserChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name !== "phone" && name !== "username") {
      setprofileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toggleMode = () => {
    const newRole = isAdmin ? "U" : "A";
    setSearchParams({ role: newRole });
    setUserData((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  const handleSubmit = () => {
    const errors = validateUserInput(userData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please correct the highlighted errors.");
      return;
    }

    setFormErrors({});
    userMutation.mutate(userData);
  };

  const userMutation = useMutation({
    mutationFn: async (userData) => {
      return register(userData);
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/auth/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "Registration failed. Please try again.");
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`mx-auto p-6 rounded-lg ${
        isAdmin ? "bg-yellow-50 border border-yellow-300" : "bg-white"
      }`}
    >
      {isAdmin && (
        <div className="mb-2 flex items-center gap-2 text-yellow-700 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          Admin Registration Mode
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6">
        {isAdmin ? "Admin Registration" : "Create Your Account"}
      </h2>
      <p className="text-neutral-600 mb-8">
        {isAdmin
          ? "Register as an admin to manage Guthbandhan."
          : "Complete your profile to find your perfect match on Guthbandhan."}
      </p>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleUserChange}
              className={`input ${formErrors.name ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              className={`input ${formErrors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleUserChange}
              className={`input ${
                formErrors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Confirm your password"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Phone*
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleUserChange}
              className={`input ${formErrors.phone ? "border-red-500" : ""}`}
              placeholder="Enter phone number"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleUserChange}
              className={`input ${formErrors.password ? "border-red-500" : ""}`}
              placeholder="Password (min. 8 characters)"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Rotary Membership no.*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleUserChange}
              className={`input ${formErrors.username ? "border-red-500" : ""}`}
              placeholder="Choose a username"
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>
        </div>

      </motion.div>

      <div className="pt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary w-full"
        >
          Submit
        </button>
      </div>

      <p className="text-center text-neutral-600 mt-8">
        Already have an account?
        <Link
          to="/auth/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign In
        </Link>
      </p>

    </motion.div>
  );
};

export default Register;
