import pool from "../config/db.js";

export async function saveResume(userId, fileName, fileUrl) {
  // Remove old resume if it exists
  await pool.query(
    "DELETE FROM resumes WHERE user_id = ?",
    [userId]
  );

  const [result] = await pool.query(
    `
    INSERT INTO resumes
    (user_id, file_name, file_url)
    VALUES (?, ?, ?)
    `,
    [userId, fileName, fileUrl]
  );

  return result;
}

export async function getResume(userId) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM resumes
    WHERE user_id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0];
}