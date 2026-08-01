import pool from "../config/db.js";

export async function bookmarkQuestion(userId, questionId) {
  const [result] = await pool.query(
    `
    INSERT INTO bookmarks (user_id, question_id)
    VALUES (?, ?)
    `,
    [userId, questionId]
  );

  return result;
}

export async function getBookmarks(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      interview_questions.id,
      interview_questions.title,
      interview_questions.question,
      interview_questions.answer,
      interview_questions.difficulty
    FROM bookmarks
    JOIN interview_questions
      ON bookmarks.question_id = interview_questions.id
    WHERE bookmarks.user_id = ?
    `,
    [userId]
  );

  return rows;
}

export async function removeBookmark(userId, questionId) {
  const [result] = await pool.query(
    `
    DELETE FROM bookmarks
    WHERE user_id = ? AND question_id = ?
    `,
    [userId, questionId]
  );

  return result;
}