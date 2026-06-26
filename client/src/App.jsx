import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import Profile from "./pages/ProfilePage/Profile";

import TaskForm from "./components/TaskForm/TaskForm";
import Today from "./pages/TodayPage/Today";
import Planner from "./pages/PlannerPage/Planner";
import Notes from "./pages/NotesPage/Notes";

// Layout for authenticated users
const AppLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TaskForm />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/today"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Today />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/planner"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Planner />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Notes />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
