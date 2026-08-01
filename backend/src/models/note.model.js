import pool from "../config/db.js";

// Get all notes
export async function getNotes(userId) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE user_id = ?
    ORDER BY updated_at DESC
    `,
    [userId]
  );

  return rows;
}

// Create note
export async function createNote(userId, title, content) {
  const [result] = await pool.query(
    `
    INSERT INTO notes (user_id, title, content)
    VALUES (?, ?, ?)
    `,
    [userId, title, content]
  );

  return result;
}

// Delete note
export async function deleteNote(userId, noteId) {
  await pool.query(
    `
    DELETE FROM notes
    WHERE id = ? AND user_id = ?
    `,
    [noteId, userId]
  );
}