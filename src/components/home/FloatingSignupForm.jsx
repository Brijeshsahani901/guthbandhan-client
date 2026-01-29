import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth.api";

const CompactSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    // Simple validation
    const errors = {};
    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.email.trim()) errors.email = "Required";
    if (!formData.phone.trim()) errors.phone = "Required";
    if (!formData.password) errors.password = "Required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    setFormErrors({});
    userMutation.mutate(formData);
  };

  const userMutation = useMutation({
    mutationFn: async (formData) => {
      return register(formData);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Registration successful!");
      navigate("/auth/login");
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);

      const message =
        error?.message || "Registration failed. Please try again.";

      toast.error(message);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20"
    >
      {/* Form Header - Ultra Compact */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Join Free</h3>
            <p className="text-xs text-neutral-500">
              Create account in 60 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Form Body - Ultra Compact */}
      <div className="px-5 pb-5 space-y-3">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              formErrors.name
                ? "border-red-300 bg-red-50"
                : "border-neutral-200 bg-neutral-50"
            } text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all`}
            placeholder="Your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              formErrors.email
                ? "border-red-300 bg-red-50"
                : "border-neutral-200 bg-neutral-50"
            } text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all`}
            placeholder="Email address"
          />
        </div>

        {/* Phone Field */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              formErrors.phone
                ? "border-red-300 bg-red-50"
                : "border-neutral-200 bg-neutral-50"
            } text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all`}
            placeholder="Phone number"
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              formErrors.password
                ? "border-red-300 bg-red-50"
                : "border-neutral-200 bg-neutral-50"
            } text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all`}
            placeholder="Create password"
          />
        </div>

        {/* Terms & Submit Row */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                required
              />
              <span className="text-xs text-neutral-600">
                I agree to{" "}
                <Link
                  to="/terms"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Terms
                </Link>
              </span>
            </label>
            <Link
              to="/auth/login"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign In
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-primary-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-primary-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Free Account →"
            )}
          </button>
        </div>

        {/* Trust Badges - Ultra Compact */}
        <div className="pt-2">
          <div className="grid grid-cols-3 gap-1">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full mb-1">
                <svg
                  className="w-3 h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[10px] text-neutral-500">Verified</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mb-1">
                <svg
                  className="w-3 h-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[10px] text-neutral-500">Secure</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full mb-1">
                <svg
                  className="w-3 h-3 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[10px] text-neutral-500">Private</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompactSignupForm;
