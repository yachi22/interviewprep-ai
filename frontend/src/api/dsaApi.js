import api from "./axios";

export const getDSATopics = () => {
  return api.get("/dsa");
};

export const updateDSAProgress = (
  topicId,
  completed,
  revisionCount
) => {
  return api.put("/dsa/progress", {
    topicId,
    completed,
    revisionCount,
  });
};

export const resetDSAProgress = (topicId) => {
  return api.delete(`/dsa/progress/${topicId}`);
};