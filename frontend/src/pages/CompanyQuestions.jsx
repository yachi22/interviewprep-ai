import { useEffect, useState } from "react";
import { getQuestions } from "../api/questionApi";
import { useNavigate } from "react-router-dom";

export default function CompanyQuestions() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadQuestions() {
    try {
      setLoading(true);
      setError("");

      const data = await getQuestions(search, difficulty, topic);
      setQuestions(data);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
        "Failed to load questions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    loadQuestions();
  }

  function handleReset() {
    setSearch("");
    setDifficulty("");
    setTopic("");

    setTimeout(() => {
      loadQuestions();
    }, 0);
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Company Questions
        </h1>

        <p className="text-slate-500 mt-2">
          Practice interview questions from top companies.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-8">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search Company
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Google, Amazon, Microsoft"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Topic
            </label>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Arrays, Trees, DP"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="lg:col-span-4 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {loading ? "Searching..." : "🔍 Search"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Interview Questions
        </h2>

        <span className="text-sm text-slate-500">
          {questions.length} question
          {questions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow p-8 text-center text-slate-500">
          Loading questions...
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && questions.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <div className="text-4xl mb-3">🔎</div>

          <h3 className="text-xl font-semibold text-slate-800">
            No questions found
          </h3>

          <p className="text-slate-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Questions */}
      {!loading && questions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => (
            <div
              key={question.id}
              onClick={() =>
                question.company &&
                navigate(
                  `/company/${question.company_id || ""}`
                )
              }
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition"
            >
              {/* Company */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-indigo-600">
                  {question.company || "Company"}
                </h3>

                {/* Difficulty */}
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>

              {/* Topic */}
              <p className="text-sm font-medium text-slate-500 mb-3">
                📚 {question.title}
              </p>

              {/* Question */}
              <p className="text-slate-700 leading-relaxed">
                {question.question}
              </p>

              {/* Answer */}
              {question.answer && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold text-slate-700">
                      Answer:
                    </span>{" "}
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}