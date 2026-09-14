import { useEffect, useState } from "react";
import {
  getBookmarks,
  deleteBookmark,
} from "../api/bookmarkApi";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBookmarks() {
    try {
      setLoading(true);
      setError("");

      const response = await getBookmarks();
      setBookmarks(response.data.bookmarks || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to load bookmarks."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function handleRemove(questionId) {
    try {
      await deleteBookmark(questionId);

      setBookmarks((current) =>
        current.filter((item) => item.id !== questionId)
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to remove bookmark."
      );
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading bookmarks...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          🔖 Bookmarks
        </h1>

        <p className="text-slate-500 mt-2">
          Questions you've saved for later revision.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {bookmarks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
          <div className="text-4xl mb-3">🔖</div>

          <h2 className="text-xl font-semibold text-slate-800">
            No bookmarks yet
          </h2>

          <p className="text-slate-500 mt-2">
            Bookmark interview questions to quickly find them later.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {bookmarks.map((question) => (
            <div
              key={question.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {question.title}
                  </h2>

                  <span className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {question.difficulty}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleRemove(question.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Remove
                </button>
              </div>

              <p className="mt-5 text-slate-700 leading-relaxed">
                <strong>Question:</strong>{" "}
                {question.question}
              </p>

              {question.answer && (
                <p className="mt-4 text-green-700 leading-relaxed">
                  <strong>Answer:</strong>{" "}
                  {question.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}