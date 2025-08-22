import React from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
1
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {user?.name || "User"}!
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Profile Views</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Messages</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Saved Profiles</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
