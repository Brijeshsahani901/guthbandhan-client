import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpgradePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("one-time");

  const plans = [
    {
      id: "mangalam-basic",
      name: "Mangalam Basic",
      price: 5000,
      currency: "INR",
      description: "Perfect for individuals beginning their matrimonial journey",
      tagline: "Basic Package",
      features: [
        "Profile creation & verification",
        "Access to basic matches as per preferences",
        "Limited direct contact requests up to 5 profiles",
        "Standard profile support",
      ],
      idealFor: "First-time users exploring suitable matches",
      badge: null,
    },
    {
      id: "vivah-master",
      name: "Vivah Master",
      price: 10000,
      currency: "INR",
      description: "A premium, discreet, and highly personalized experience",
      tagline: "NRI / HNI Exclusive Package",
      features: [
        "White-glove profile management & verification",
        "Global visibility (NRI / International reach)",
        "Hand-picked, highly compatible matches",
        "Limited direct contact requests up to 10 profiles",
        "One-to-one personalized matchmaking concierge",
        "Confidential & priority handling",
        "Exclusive support for high-profile families",
        "Exclusive chat option for concierge services",
      ],
      idealFor: "NRI & HNI families seeking privacy, precision, and perfection",
      badge: "Premium",
    },
  ];

  const handleUpgrade = () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }
    toast.success("Redirecting to payment...");
  };

  const handleChatConsultation = () => {
    toast.info("Connecting you with our matchmaking concierge...");
  };

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const getSelectedPlan = () => {
    return plans.find((plan) => plan.id === selectedPlan);
  };

  return (
    <div className="container-custom py-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Find Your Perfect Match
            </h1>
            <p className="text-lg text-gray-600">
              Choose a package that fits your matrimonial journey
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-pink-50 text-pink-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                7-day money-back guarantee. No questions asked.
              </span>
            </div>
          </div>

          {/* Billing Toggle - Now One-time only */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-pink-50 p-1 rounded-lg border border-pink-100">
              <button
                onClick={() => setBillingCycle("one-time")}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "one-time"
                    ? "bg-white text-pink-600 shadow-sm font-semibold"
                    : "text-pink-600 hover:text-pink-900"
                }`}
              >
                One-Time Payment
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "ring-4 ring-pink-500 ring-opacity-50 shadow-2xl transform scale-[1.02]"
                      : "border border-gray-200 shadow-lg hover:shadow-xl"
                  } ${plan.badge ? "border-t-4 border-t-pink-500" : ""}`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Name & Tagline */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {plan.name}
                        </h3>
                        {plan.id === "vivah-master" && (
                          <span className="text-xs font-semibold bg-pink-100 text-pink-800 px-2 py-1 rounded">
                            💍 Exclusive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900">
                          {formatINR(plan.price)}
                        </span>
                        <span className="text-gray-500 ml-2">
                          / one-time charge per profile
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 italic">{plan.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Ideal For */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Ideal for:</span>{" "}
                        {plan.idealFor}
                      </p>
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? "bg-pink-600 text-white shadow-lg transform scale-105"
                          : plan.badge
                          ? "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg"
                          : "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
                      }`}
                    >
                      {selectedPlan === plan.id
                        ? "✓ Selected"
                        : `Choose ${plan.name}`}
                    </button>

                    {/* Exclusive Chat Button for Vivah Master */}
                    {plan.id === "vivah-master" && (
                      <button
                        onClick={handleChatConsultation}
                        className="w-full mt-4 py-3 px-6 bg-white border-2 border-pink-300 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-all duration-300"
                      >
                        💬 Chat for Concierge Services
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedPlan ? 1 : 0.5 }}
            className="text-center"
          >
            <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Selected Plan
              </h3>
              {selectedPlan ? (
                <div>
                  <p className="text-2xl font-bold text-pink-600 mb-2">
                    {getSelectedPlan()?.name}
                  </p>
                  <p className="text-gray-600">
                    {formatINR(getSelectedPlan()?.price)} one-time payment
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No plan selected yet</p>
              )}
            </div>

            <button
              onClick={handleUpgrade}
              disabled={!selectedPlan}
              className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedPlan
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {selectedPlan ? "Proceed to Secure Payment" : "Select a Plan"}
            </button>

            <div className="mt-8 space-y-4">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">🔒 Secure Payment:</span> All
                transactions are encrypted and secure
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">💫 What's Next:</span> After
                payment, our team will contact you within 24 hours to begin your
                matrimonial journey
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Verified Profiles
                </h4>
                <p className="text-sm text-gray-600">
                  All profiles undergo strict verification for authenticity
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Privacy First
                </h4>
                <p className="text-sm text-gray-600">
                  Your data is protected with enterprise-grade security
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Personal Support
                </h4>
                <p className="text-sm text-gray-600">
                  Dedicated support team for your matrimonial journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradePlan;