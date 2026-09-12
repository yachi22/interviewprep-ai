import api from "./axios";

export async function getQuestions(
  search = "",
  difficulty = "",
  topic = ""
) {
  const response = await api.get("/questions", {
    params: {
      search,
      difficulty,
      topic,
    },
  });

  return response.data.questions;
}