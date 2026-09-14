import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../api/dashboardApi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    bookmarks: 0,
    solved: 0,
    companies: 0,
    totalQuestions: 0,
    notes: 0,
    resumeUploaded: false,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        setStatsLoading(true);
        setError("");

        const response = await getDashboardStats();

        setStats(response.data.stats);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.error ||
            "Failed to load dashboard statistics."
        );
      } finally {
        setStatsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 text-lg">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const progress =
    stats.totalQuestions > 0
      ? Math.min(
          Math.round(
            (stats.solved / stats.totalQuestions) * 100
          ),
          100
        )
      : 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          👋 Welcome, {user?.name}
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Ready for today's interview preparation?
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Companies */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Companies
          </p>

          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {statsLoading ? "..." : stats.companies}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Available for practice
          </p>
        </div>

        {/* Solved */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Solved Questions
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {statsLoading ? "..." : stats.solved}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Keep practicing
          </p>
        </div>

        {/* Bookmarks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Bookmarks
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {statsLoading ? "..." : stats.bookmarks}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Saved questions
          </p>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Notes
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {statsLoading ? "..." : stats.notes}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Your study notes
          </p>
        </div>

        {/* Resume */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Resume
          </p>

          <p className="text-xl font-bold mt-3">
            {statsLoading
              ? "..."
              : stats.resumeUploaded
              ? "✅ Uploaded"
              : "❌ Not Uploaded"}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Resume status
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Preparation Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Track your interview preparation journey.
            </p>
          </div>

          <span className="text-lg font-bold text-indigo-600">
            {statsLoading ? "..." : `${progress}%`}
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${statsLoading ? 0 : progress}%`,
            }}
          />
        </div>

        <p className="text-sm text-slate-500 mt-3">
          {statsLoading
            ? "Loading progress..."
            : `${stats.solved} of ${stats.totalQuestions} questions solved`}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Practice Questions */}
          <button
            onClick={() => navigate("/company-questions")}
            className="text-left bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-5 transition shadow-sm"
          >
            <div className="text-2xl mb-2">
              💼
            </div>

            <h3 className="font-semibold text-lg">
              Practice Questions
            </h3>

            <p className="text-indigo-100 text-sm mt-1">
              Practice company-specific interview questions.
            </p>
          </button>

          {/* DSA Tracker */}
          <button
            onClick={() => navigate("/dsa-tracker")}
            className="text-left bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 transition shadow-sm"
          >
            <div className="text-2xl mb-2">
              📚
            </div>

            <h3 className="font-semibold text-lg">
              DSA Tracker
            </h3>

            <p className="text-green-100 text-sm mt-1">
              Track your DSA preparation and progress.
            </p>
          </button>

          {/* Resume */}
          <button
            onClick={() => navigate("/resume")}
            className="text-left bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 transition shadow-sm"
          >
            <div className="text-2xl mb-2">
              📄
            </div>

            <h3 className="font-semibold text-lg">
              Upload Resume
            </h3>

            <p className="text-purple-100 text-sm mt-1">
              Upload and manage your latest resume.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}