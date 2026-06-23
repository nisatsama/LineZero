import React from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskForm from "./components/TaskForm/TaskForm";

const App = () => {
  return (
    <div>
      <Navbar />

      <TaskForm />
    </div>
  );
};

export default App;
