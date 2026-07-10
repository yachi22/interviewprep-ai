import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyQuestions } from "../api/companyApi";

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}