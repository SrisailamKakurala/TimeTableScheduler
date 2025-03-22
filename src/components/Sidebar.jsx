import React from "react";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaSignOutAlt, FaUser, FaCog, FaQuestionCircle, FaChartBar, FaSearch } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6">
      <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
  <FaSearch className="text-blue-600" /> TimeTabular
</h2>
      <ul className="space-y-4">
        <SidebarItem to="/dashboard" icon={<FaHome />} label="Home" />
        <SidebarItem to="/timetables" icon={<FaCalendarAlt />} label="Your Timetables" />
        <SidebarItem to="/profile" icon={<FaUser />} label="Profile" />
        <SidebarItem to="/reports" icon={<FaChartBar />} label="Reports" />
        <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />
        <SidebarItem to="/help" icon={<FaQuestionCircle />} label="Help" />
        <SidebarItem to="/" icon={<FaSignOutAlt />} label="Logout" />
      </ul>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
            isActive ? "bg-white text-blue-900 font-bold" : "hover:bg-blue-700"
          }`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
