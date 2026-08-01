import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyQuestions } from "../api/companyApi";
import { addBookmark } from "../api/bookmarkApi";
import { addSolvedQuestion } from "../api/solvedApi";

export default function Questions() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await getCompanyQuestions(id);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    }

    loadQuestions();
  }, [id]);

async function handleBookmark(questionId) {
  try {
    await addBookmark(questionId);
    alert("Question bookmarked successfully!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Failed to bookmark.");
  }
}

async function handleSolved(questionId) {
  try {
    await addSolvedQuestion(questionId);
    alert("Question marked as solved!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Failed to mark as solved.");
  }
}

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Interview Questions
      </h1>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white shadow rounded-xl p-6 border"
            >
              <h2 className="text-xl font-semibold">
                {question.title}
              </h2>

              <p className="mt-3">
                <strong>Question:</strong> {question.question}
              </p>

              <p className="mt-3">
                <strong>Difficulty:</strong> {question.difficulty}
              </p>

              <p className="mt-3 text-green-700">
                <strong>Answer:</strong> {question.answer}
              </p>
              <button
  onClick={() => handleBookmark(question.id)}
  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
>
  ⭐ Bookmark
</button>
<button
  onClick={() => handleSolved(question.id)}
  className="mt-3 ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
>
  ✔ Mark as Solved
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}