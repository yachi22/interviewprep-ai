import pool from "../config/db.js";

export async function getDashboardStats(userId) {
  // Bookmarks
  const [[bookmarkResult]] = await pool.query(
    "SELECT COUNT(*) AS total FROM bookmarks WHERE user_id = ?",
    [userId]
  );

  // Solved Questions
  const [[solvedResult]] = await pool.query(
    "SELECT COUNT(*) AS total FROM solved_questions WHERE user_id = ?",
    [userId]
  );

  // Companies
  const [[companyResult]] = await pool.query(
    "SELECT COUNT(*) AS total FROM companies"
  );

  // Notes
  const [[noteResult]] = await pool.query(
    "SELECT COUNT(*) AS total FROM notes WHERE user_id = ?",
    [userId]
  );

  // Resume
  const [[resumeResult]] = await pool.query(
    "SELECT COUNT(*) AS total FROM resumes WHERE user_id = ?",
    [userId]
  );

  return {
    bookmarks: bookmarkResult.total,
    solved: solvedResult.total,
    companies: companyResult.total,
    notes: noteResult.total,
    resumeUploaded: resumeResult.total > 0,
  };
}