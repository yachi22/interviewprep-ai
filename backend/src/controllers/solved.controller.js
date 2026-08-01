import {
  markQuestionSolved,
  getSolvedQuestions,
  removeSolvedQuestion,
} from "../models/solved.model.js";

// Mark as Solved
export async function addSolvedQuestion(req, res) {
  try {
    const userId = req.user.id;
    const { questionId } = req.body;

    await markQuestionSolved(userId, questionId);

    res.status(201).json({
      success: true,
      message: "Question marked as solved.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to mark question as solved.",
    });
  }
}

// Get Solved Questions
export async function fetchSolvedQuestions(req, res) {
  try {
    const userId = req.user.id;

    const solvedQuestions = await getSolvedQuestions(userId);

    res.json({
      success: true,
      solvedQuestions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch solved questions.",
    });
  }
}

// Remove Solved Question
export async function deleteSolvedQuestion(req, res) {
  try {
    const userId = req.user.id;
    const { questionId } = req.params;

    await removeSolvedQuestion(userId, questionId);

    res.json({
      success: true,
      message: "Solved question removed.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to remove solved question.",
    });
  }
}