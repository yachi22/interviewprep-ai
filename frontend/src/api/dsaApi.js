import api from "./axios";

// Get all DSA topics
export const getTopics = () => {
  return api.get("/dsa");
};

// Mark topic as completed
export const completeTopic = (topicId) => {
  return api.post("/dsa/complete", { topicId });
};