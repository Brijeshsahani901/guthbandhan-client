import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../../utils/formatters";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReports = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        reporter: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
        },
        reported: {
          name: `User ${i + 20}`,
          email: `user${i + 20}@example.com`,
        },
        type:
          i % 3 === 0
            ? "harassment"
            : i % 3 === 1
            ? "fake_profile"
            : "inappropriate_content",
        status:
          i % 4 === 0
            ? "pending"
            : i % 4 === 1
            ? "investigating"
            : i % 4 === 2
            ? "resolved"
            : "dismissed",
        description: "User reported for inappropriate behavior in messages.",
        date: new Date(Date.now() - Math.random() * 10000000000),
        priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
      }));
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReports = reports.filter(
    (report) => filter === "all" || report.status === filter
  );

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    investigating: reports.filter((r) => r.status === "investigating").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
    dismissed: reports.filter((r) => r.status === "dismissed").length,
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Report Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Reports", value: stats.total },
          {
            label: "Pending",
            value: stats.pending,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            label: "Investigating",
            value: stats.investigating,
            color: "bg-blue-100 text-blue-800",
          },
          {
            label: "Resolved",
            value: stats.resolved,
            color: "bg-green-100 text-green-800",
          },
          {
            label: "Dismissed",
            value: stats.dismissed,
            color: "bg-neutral-100 text-neutral-800",
          },
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
          <option value="pending">Pending</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {/* Reports Table */}
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
                    Reporter
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Reported User
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredReports.map((report) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">
                          {report.reporter.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {report.reporter.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">
                          {report.reported.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {report.reported.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.type === "harassment"
                            ? "bg-red-100 text-red-800"
                            : report.type === "fake_profile"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {report.type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : report.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {report.priority.charAt(0).toUpperCase() +
                          report.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : report.status === "investigating"
                            ? "bg-blue-100 text-blue-800"
                            : report.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {formatDate(report.date)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={report.status}
                        onChange={(e) =>
                          handleStatusChange(report.id, e.target.value)
                        }
                        className="text-sm border border-neutral-300 rounded-md p-1"
                      >
                        <option value="pending">Set Pending</option>
                        <option value="investigating">Investigate</option>
                        <option value="resolved">Mark Resolved</option>
                        <option value="dismissed">Dismiss</option>
                      </select>
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

export default Reports;
