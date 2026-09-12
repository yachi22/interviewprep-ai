import pool from "../config/db.js";

export async function getQuestions(filters) {
  let sql = `
    SELECT
      interview_questions.id,
      interview_questions.company_id,
      interview_questions.title,
      interview_questions.question,
      interview_questions.answer,
      interview_questions.difficulty,
      companies.name AS company
    FROM interview_questions
    LEFT JOIN companies
      ON interview_questions.company_id = companies.id
    WHERE 1=1
  `;

  const values = [];

  // Search by company
  if (filters.search) {
    sql += ` AND companies.name LIKE ?`;
    values.push(`%${filters.search}%`);
  }

  // Filter by difficulty
  if (filters.difficulty) {
    sql += ` AND interview_questions.difficulty = ?`;
    values.push(filters.difficulty);
  }

  // Search by topic
  if (filters.topic) {
    sql += ` AND interview_questions.title LIKE ?`;
    values.push(`%${filters.topic}%`);
  }

  sql += ` ORDER BY interview_questions.id ASC`;

  const [rows] = await pool.query(sql, values);

  return rows;
}