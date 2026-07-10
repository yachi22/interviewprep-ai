import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CompanyQuestions from "../pages/CompanyQuestions.jsx";
import DSATracker from "../pages/DSATracker.jsx";
import Notes from "../pages/Notes.jsx";
import Profile from "../pages/Profile.jsx";
import Questions from "../pages/Questions";
// AppRoutes
// ---------
// Single source of truth for all page routes. Kept separate from App.jsx
// so routing concerns are isolated from any future app-level providers
// (theme, auth context, etc.) that will wrap the app.
//
// NOTE: There is no route guarding/protection yet — all routes are
// public for now. Auth-based route protection will be added later.
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
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

      {/* App pages (will be protected once auth is implemented) */}
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
