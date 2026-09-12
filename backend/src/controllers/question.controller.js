import { getQuestions } from "../models/question.model.js";

export async function fetchQuestions(req, res) {
  try {
    const filters = {
      search: req.query.search || "",
      difficulty: req.query.difficulty || "",
      topic: req.query.topic || "",
    };

    const questions = await getQuestions(filters);

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch questions.",
    });
  }
}