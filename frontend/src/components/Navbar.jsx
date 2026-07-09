import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm">
      <Link to="/" className="text-lg font-semibold text-slate-800">
        InterviewPrep <span className="text-indigo-600">AI</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium">
        {user ? (
          <>
            <span className="text-slate-700">
              Welcome, <strong>{user.name}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-600 text-slate-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}