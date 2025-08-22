import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getDashboardStats } from "../../api/profile";
import {
  FaUsers,
  FaUserCheck,
  FaMale,
  FaFemale,
  FaUserPlus,
} from "react-icons/fa";

const iconMap = {
  "Total Users": <FaUsers className="text-blue-500 text-3xl" />,
  "Active Users": <FaUserCheck className="text-green-500 text-3xl" />,
  "Male Users": <FaMale className="text-cyan-500 text-3xl" />,
  "Female Users": <FaFemale className="text-pink-500 text-3xl" />,
  "New Signups (24h)": <FaUserPlus className="text-purple-500 text-3xl" />,
};

const Dashboard = () => {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error loading dashboard: {error.message}
      </div>
    );
  }


  const statsItems = [
    { label: "Total Users", value: stats?.totalUsers?.toLocaleString(), type: "neutral" },
    { label: "Active Users", value: stats?.activeUsers?.toLocaleString(), type: "positive" },
    { label: "Male Users", value: stats?.maleCount?.toLocaleString(), type: "neutral" },
    { label: "Female Users", value: stats?.femaleCount?.toLocaleString(), type: "neutral" },
    { label: "New Signups (24h)", value: stats?.newSignups?.toLocaleString(), type: stats?.newSignups > 0 ? "positive" : "neutral" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-600 font-medium">{item.label}</h3>
              <div>{iconMap[item.label]}</div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold">{item.value}</span>
              <span
                className={`text-sm font-medium ${
                  item.type === "positive" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {item.type === "positive" ? "↑" : ""}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recently Updated Profiles */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recently Updated Profiles</h2>
        <div className="space-y-4">
          {stats?.recentUpdates?.map((p, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-medium">
                  {p.first_name.charAt(0)}
                  {p.last_name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{p.first_name} {p.last_name}</p>
                  <p className="text-sm text-neutral-500">
                    For: {p.created_for} • {p.residing_country || "Unknown"}
                  </p>
                </div>
              </div>
              <span className="text-sm text-neutral-500">Recently</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
