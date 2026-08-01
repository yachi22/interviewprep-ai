import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Layout from "../components/Layout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";

import Dashboard from "../pages/Dashboard.jsx";
import CompanyQuestions from "../pages/CompanyQuestions.jsx";
import Questions from "../pages/Questions.jsx";
import DSATracker from "../pages/DSATracker.jsx";
import Notes from "../pages/Notes.jsx";
import Resume from "../pages/Resume.jsx";
import Profile from "../pages/Profile.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/signup"
        element={
          <Layout>
            <Signup />
          </Layout>
        }
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-questions"
        element={
          <ProtectedRoute>
            <Layout>
              <CompanyQuestions />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/company/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <Questions />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dsa-tracker"
        element={
          <ProtectedRoute>
            <Layout>
              <DSATracker />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Layout>
              <Notes />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Layout>
              <Resume />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}