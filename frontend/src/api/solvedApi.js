import api from "./axios";

// Mark as Solved
export const addSolvedQuestion = (questionId) => {
  return api.post("/solved", { questionId });
};

// Get Solved Questions
export const getSolvedQuestions = () => {
  return api.get("/solved");
};

// Remove Solved Question
export const deleteSolvedQuestion = (questionId) => {
  return api.delete(`/solved/${questionId}`);
};