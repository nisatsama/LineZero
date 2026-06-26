import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TaskForm from "./components/TaskForm/TaskForm";
import Today from "./pages/TodayPage/Today";
import Planner from "./pages/PlannerPage/Planner";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<TaskForm />} />
        <Route path="/today" element={<Today />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </div>
  );
};

export default App;
