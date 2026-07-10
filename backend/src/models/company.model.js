import pool from "../config/db.js";

// Get all companies
export async function getAllCompanies() {
  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      logo_url,
      description
     FROM companies
     ORDER BY name ASC`
  );

  return rows;
}

// Get all questions of a company
export async function getQuestionsByCompany(companyId) {
  const [rows] = await pool.query(
    `SELECT
      id,
      title,
      question,
      answer,
      difficulty
     FROM interview_questions
     WHERE company_id = ?
     ORDER BY difficulty`,
    [companyId]
  );

  return rows;
}