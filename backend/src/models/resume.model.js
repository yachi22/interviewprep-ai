import pool from "../config/db.js";

// Get the current user's resume
export async function getResume(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      file_name,
      file_url,
      ats_score,
      created_at
    FROM resumes
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
}

// Save a resume record
export async function createResume(
  userId,
  fileName,
  fileUrl
) {
  const [result] = await pool.query(
    `
    INSERT INTO resumes
      (user_id, file_name, file_url)
    VALUES (?, ?, ?)
    `,
    [userId, fileName, fileUrl]
  );

  return result.insertId;
}

// Delete the user's previous resumes
export async function deleteUserResumes(userId) {
  await pool.query(
    `
    DELETE FROM resumes
    WHERE user_id = ?
    `,
    [userId]
  );
}