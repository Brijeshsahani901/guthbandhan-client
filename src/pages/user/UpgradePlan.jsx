import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpgradePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        "Unlimited messaging",
        "See who viewed your profile",
        "Advanced filters",
        "Up to 50 saved profiles",
        "Priority in search results",
        "No ads",
        "1 profile boost per month",
      ],
    },
    {
      id: "vip",
      name: "VIP",
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      features: [
        "All Premium features",
        "Personal matchmaking consultant",
        "Unlimited saved profiles",
        "Profile verification badge",
        'Featured in "Top Picks"',
        "Read receipts for messages",
        "Priority customer support",
        "Weekly profile boosts",
        "Access to exclusive events",
      ],
    },
  ];

  const handleUpgrade = () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    // In a real app, this would integrate with a payment processor
    toast.success("Redirecting to payment...");
  };

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Upgrade Your Plan</h1>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-neutral-100 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Yearly{" "}
                <span className="text-accent-500 font-bold">Save 16%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl overflow-hidden transition-shadow ${
                  selectedPlan === plan.id
                    ? "border-2 border-primary-500 shadow-lg"
                    : "border border-neutral-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      $
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice.toFixed(2)
                        : plan.yearlyPrice.toFixed(2)}
                    </span>
                    <span className="text-neutral-500">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-500 mr-2 mt-0.5"
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
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {selectedPlan === plan.id
                      ? "Selected"
                      : `Choose ${plan.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Button */}
          <div className="text-center">
            <button
              onClick={handleUpgrade}
              disabled={!selectedPlan}
              className="btn-primary px-8"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600">
              7-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradePlan;
