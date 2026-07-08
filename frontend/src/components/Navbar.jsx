import { Link } from "react-router-dom";

// Navbar
// ------
// Top-level navigation bar shown on every page via the Layout component.
// Currently static (no auth-aware links, no active-state logic) — that
// will be added once authentication is implemented.
export default function Navbar() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm">
      <Link to="/" className="text-lg font-semibold text-slate-800">
        InterviewPrep <span className="text-indigo-600">AI</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
        <Link to="/login" className="hover:text-indigo-600">
          Login
        </Link>
        <Link
          to="/signup"
          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
