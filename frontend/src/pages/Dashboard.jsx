import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Companies</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">DSA Solved</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Notes</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-slate-500">Resume</h2>
          <p className="text-3xl font-bold mt-2">Not Uploaded</p>
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