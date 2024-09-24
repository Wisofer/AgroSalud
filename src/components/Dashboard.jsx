import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUser,
  faChartPie,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        className="bg-green-700 w-64 text-white p-6"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8">AgroSalud</h2>
        <nav className="space-y-6">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faDashboard} />
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>
          <Link to="/analytics" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faChartPie} />
            <span>Analytics</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </Link>
          <Link to="/logout" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </Link>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex space-x-4 items-center">
            <p className="text-gray-600">Hello, User</p>
            <button className="text-red-500">Logout</button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold">Animals Checked Today</h3>
              <p className="text-3xl font-bold mt-2">25</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold">Scheduled Appointments</h3>
              <p className="text-3xl font-bold mt-2">10</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold">Pending Reports</h3>
              <p className="text-3xl font-bold mt-2">5</p>
            </motion.div>
          </div>

          {/* Additional components can go here, like tables or charts */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
