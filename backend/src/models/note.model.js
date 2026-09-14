import pool from "../config/db.js";

// Get all notes for a user
export async function getNotes(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      title,
      content,
      created_at,
      updated_at
    FROM notes
    WHERE user_id = ?
    ORDER BY updated_at DESC
    `,
    [userId]
  );

  return rows;
}

// Create a note
export async function createNote(userId, title, content) {
  const [result] = await pool.query(
    `
    INSERT INTO notes
      (user_id, title, content)
    VALUES (?, ?, ?)
    `,
    [userId, title, content]
  );

  return result.insertId;
}

// Update a note
export async function updateNote(
  userId,
  noteId,
  title,
  content
) {
  const [result] = await pool.query(
    `
    UPDATE notes
    SET title = ?,
        content = ?
    WHERE id = ?
      AND user_id = ?
    `,
    [title, content, noteId, userId]
  );

  return result;
}

// Delete a note
export async function deleteNote(userId, noteId) {
  const [result] = await pool.query(
    `
    DELETE FROM notes
    WHERE id = ?
      AND user_id = ?
    `,
    [noteId, userId]
  );

  return result;
}