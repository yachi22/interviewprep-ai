import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authApi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await getProfile();
      const user = response.data.user;

      setProfile(user);
      setName(user.name || "");
      setTargetRole(user.target_role || "");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await updateProfile({
        name,
        targetRole,
      });

      setProfile(response.data.user);

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account and interview preparation preferences.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-5">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-5">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
            👤
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {profile?.name}
            </h2>

            <p className="text-slate-500">
              {profile?.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              value={profile?.email || ""}
              disabled
              className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Role
            </label>

            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Account Role
            </label>

            <input
              value={profile?.role || "user"}
              disabled
              className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Member Since
            </label>

            <input
              value={
                profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : ""
              }
              disabled
              className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}