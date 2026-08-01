import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../api/dashboardApi";

export default function Dashboard() {
  const { user, loading } = useAuth();

  const [stats, setStats] = useState({
    bookmarks: 0,
    solved: 0,
    companies: 0,
    notes: 0,
    resumeUploaded: false,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await getDashboardStats();
        setStats(response.data.stats);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-slate-800">
        👋 Welcome, {user?.name}
      </h1>

      <p className="text-slate-500 mt-2">
        Ready for today's interview preparation?
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">

        {/* Companies */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Companies</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.companies}
          </p>
        </div>

        {/* Solved Questions */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Solved Questions</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.solved}
          </p>
        </div>

        {/* Bookmarks */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Bookmarks</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.bookmarks}
          </p>
        </div>

        {/* Notes */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Notes</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.notes}
          </p>
        </div>

        {/* Resume */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Resume</h2>
          <p className="text-xl font-bold mt-2">
            {stats.resumeUploaded ? "✅ Uploaded" : "❌ Not Uploaded"}
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Practice Questions
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg">
            DSA Tracker
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg">
            Upload Resume
          </button>

        </div>
      </div>
    </div>
  );
}