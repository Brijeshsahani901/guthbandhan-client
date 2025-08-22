// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { verifyUser, resetPassword } from "../../api/auth.api";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1); // Step 1: verify user, Step 2: reset password
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const verifyMutation = useMutation({
//     mutationFn: () => verifyUser(email),
//     onSuccess: () => {
//       toast.success("User verified. Please enter a new password.");
//       setStep(2);
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "User not found.");
//     },
//   });

//   const resetMutation = useMutation({
//     mutationFn: () => resetPassword({ email, newPassword }),
//     onSuccess: () => {
//       toast.success("Password reset successfully!");
//       setStep(1);
//       setEmail("");
//       setNewPassword("");
//       setConfirmPassword("");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Failed to reset password.");
//     },
//   });

//   const handleVerify = () => {
//     if (!email) {
//       toast.error("Email is required.");
//       return;
//     }
//     verifyMutation.mutate();
//   };

//   const handleReset = () => {
//     if (newPassword.length < 6) {
//       toast.error("Password must be at least 6 characters.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }
//     resetMutation.mutate();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

//       {step === 1 && (
//         <>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Enter your email
//           </label>
//           <input
//             type="email"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <button
//             onClick={handleVerify}
//             disabled={verifyMutation.isPending}
//             className="btn-primary w-full"
//           >
//             {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
//           </button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             New Password
//           </label>
//           <input
//             type="password"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="New password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />

//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button
//             onClick={handleReset}
//             disabled={resetMutation.isPending}
//             className="btn-primary w-full"
//           >
//             {resetMutation.isPending ? "Resetting..." : "Reset Password"}
//           </button>
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default ForgotPassword;


// src/pages/auth/ForgotPassword.jsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendOtp, verifyOtp, resetPassword } from "../../api/auth.api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtpMutation = useMutation({
    mutationFn: () => sendOtp(email),
    onSuccess: () => {
      toast.success("OTP sent to your email.");
      setStep(2);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to send OTP.");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: () => verifyOtp({ email, otp }),
    onSuccess: () => {
      toast.success("OTP verified. You can now reset your password.");
      setStep(3);
    },
    onError: (err) => {
      toast.error(err?.message || "Invalid OTP.");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword({ email, otp, newPassword }),
    onSuccess: () => {
      toast.success("Password reset successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to reset password.");
    },
  });

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPasswordMutation.mutate();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

      {step === 1 && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter your email
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => {
              if (!email) {
                toast.error("Please enter your email.");
                return;
              }
              sendOtpMutation.mutate();
            }}
            disabled={sendOtpMutation.isPending}
            className="btn-primary w-full"
          >
            {sendOtpMutation.isPending ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter the OTP sent to your email
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={() => {
              if (!otp) {
                toast.error("Please enter the OTP.");
                return;
              }
              verifyOtpMutation.mutate();
            }}
            disabled={verifyOtpMutation.isPending}
            className="btn-primary w-full"
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleResetPassword}
            disabled={resetPasswordMutation.isPending}
            className="btn-primary w-full"
          >
            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
