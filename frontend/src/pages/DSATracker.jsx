import { useEffect, useState } from "react";
import { getTopics, completeTopic } from "../api/dsaApi";

export default function DSATracker() {
  const [topics, setTopics] = useState([]);

  async function loadTopics() {
    try {
      const response = await getTopics();
      setTopics(response.data.topics);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  async function handleComplete(topicId) {
    try {
      await completeTopic(topicId);
      loadTopics();
    } catch (error) {
      console.error(error);
      alert("Failed to update topic.");
    }
  }

  const completedCount = topics.filter(
    (topic) => topic.completed
  ).length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">
        DSA Tracker
      </h1>

      <p className="text-slate-500 mb-6">
        Progress: {completedCount} / {topics.length}
      </p>

      <div className="space-y-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow"
          >
            <span className="font-medium">
              {topic.name}
            </span>

            {topic.completed ? (
              <span className="text-green-600 font-semibold">
                ✅ Completed
              </span>
            ) : (
              <button
                onClick={() => handleComplete(topic.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}