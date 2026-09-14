import { useEffect, useState } from "react";
import {
  getSolvedQuestions,
  deleteSolvedQuestion,
} from "../api/solvedApi";

export default function SolvedQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSolvedQuestions() {
    try {
      setLoading(true);
      setError("");

      const response = await getSolvedQuestions();

      setQuestions(response.data.solvedQuestions || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to load solved questions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSolvedQuestions();
  }, []);

  async function handleRemove(questionId) {
    try {
      await deleteSolvedQuestion(questionId);

      setQuestions((current) =>
        current.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to remove solved question."
      );
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading solved questions...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          ✅ Solved Questions
        </h1>

        <p className="text-slate-500 mt-2">
          Review the interview questions you have completed.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {questions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
          <div className="text-4xl mb-3">📚</div>

          <h2 className="text-xl font-semibold text-slate-800">
            No solved questions yet
          </h2>

          <p className="text-slate-500 mt-2">
            Mark interview questions as solved to track your progress.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
              {questions.length} question
              {questions.length !== 1 ? "s" : ""} solved
            </span>
          </div>

          <div className="space-y-5">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {question.title}
                    </h2>

                    <span
                      className={`inline-block mt-2 text-sm px-3 py-1 rounded-full font-medium ${
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

                  <button
                    onClick={() =>
                      handleRemove(question.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Mark as Unsolved
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
        </>
      )}
    </div>
  );
}