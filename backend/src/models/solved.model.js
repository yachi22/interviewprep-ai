import pool from "../config/db.js";

// Mark question as solved
export async function markQuestionSolved(userId, questionId) {
  const [result] = await pool.query(
    `
    INSERT INTO solved_questions (user_id, question_id)
    VALUES (?, ?)
    `,
    [userId, questionId]
  );

  return result;
}

// Get all solved questions
export async function getSolvedQuestions(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      interview_questions.id,
      interview_questions.title,
      interview_questions.question,
      interview_questions.answer,
      interview_questions.difficulty
    FROM solved_questions
    JOIN interview_questions
      ON solved_questions.question_id = interview_questions.id
    WHERE solved_questions.user_id = ?
    `,
    [userId]
  );

  return rows;
}

// Remove solved question
export async function removeSolvedQuestion(userId, questionId) {
  const [result] = await pool.query(
    `
    DELETE FROM solved_questions
    WHERE user_id = ? AND question_id = ?
    `,
    [userId, questionId]
  );

  return result;
}