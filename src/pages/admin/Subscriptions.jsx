import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDate, formatPrice } from "../../utils/formatters";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSubscriptions = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        user: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
        },
        plan: i % 2 === 0 ? "premium" : "vip",
        status:
          i % 4 === 0
            ? "active"
            : i % 4 === 1
            ? "cancelled"
            : i % 4 === 2
            ? "expired"
            : "pending",
        startDate: new Date(Date.now() - Math.random() * 10000000000),
        endDate: new Date(Date.now() + Math.random() * 10000000000),
        amount: i % 2 === 0 ? 19.99 : 39.99,
        billingCycle: i % 3 === 0 ? "monthly" : "yearly",
      }));
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSubscriptions = subscriptions.filter(
    (sub) => filter === "all" || sub.status === filter
  );

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
    expired: subscriptions.filter((s) => s.status === "expired").length,
    pending: subscriptions.filter((s) => s.status === "pending").length,
    revenue: subscriptions.reduce((acc, curr) => acc + curr.amount, 0),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Subscription Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Subscriptions", value: stats.total },
          {
            label: "Active",
            value: stats.active,
            color: "bg-green-100 text-green-800",
          },
          {
            label: "Cancelled",
            value: stats.cancelled,
            color: "bg-red-100 text-red-800",
          },
          {
            label: "Expired",
            value: stats.expired,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "bg-blue-100 text-blue-800",
          },
          { label: "Monthly Revenue", value: formatPrice(stats.revenue) },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-sm text-neutral-600 mb-1">{stat.label}</h3>
            <p className={`text-xl font-bold ${stat.color || ""}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input w-48"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Subscriptions Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Billing
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredSubscriptions.map((subscription) => (
                  <motion.tr
                    key={subscription.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">
                          {subscription.user.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {subscription.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscription.plan === "vip"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {subscription.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscription.status === "active"
                            ? "bg-green-100 text-green-800"
                            : subscription.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : subscription.status === "expired"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {subscription.status.charAt(0).toUpperCase() +
                          subscription.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {formatDate(subscription.startDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {formatDate(subscription.endDate)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatPrice(subscription.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {subscription.billingCycle.charAt(0).toUpperCase() +
                        subscription.billingCycle.slice(1)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`text-sm px-3 py-1 rounded-md ${
                          subscription.status === "active"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {subscription.status === "active"
                          ? "Cancel"
                          : "Reactivate"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
