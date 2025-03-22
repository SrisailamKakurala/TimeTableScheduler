import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import TimeTableForm from "./TimeTableForm";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex">
      <div className="flex-1 h-screen p-8 flex flex-col items-center justify-center">
        {openForm ? (
          <TimeTableForm />
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setOpenForm(true)}
              className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700"
            >
              <FaPlus className="text-2xl" />
            </button>
            <p className="mt-3 text-lg font-medium text-gray-700">Create Timetable</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
