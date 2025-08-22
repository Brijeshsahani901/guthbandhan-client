import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/auth.api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error as user types
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateInputs();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please correct the highlighted errors.");
      return;
    }

    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: () => userLogin(formData),
    onSuccess: (data) => {
      const { token, user } = data;
      login(user, token);
      toast.success("Login successful!");
      navigate("/user/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`mx-auto p-6 rounded-lg bg-white`}
    >
      <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
      <p className="text-neutral-600 mb-8">
        Sign in to your account to continue your journey to meaningful
        connections.
      </p>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`input ${formErrors.email ? "border-red-500" : ""}`}
          placeholder="Enter your email"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700"
          >
            Password
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={`input ${formErrors.password ? "border-red-500" : ""}`}
          placeholder="Enter your password"
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm">{formErrors.password}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label
          htmlFor="rememberMe"
          className="ml-2 block text-sm text-neutral-700"
        >
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="btn-primary w-full mb-4"
      >
        {mutation.isPending ? (
          <span className="flex items-center justify-center">
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
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Register Link */}
      <p className="text-center text-neutral-600 mt-8">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
