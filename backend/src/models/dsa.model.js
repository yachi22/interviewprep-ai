import pool from "../config/db.js";

// Get all DSA topics with user progress
export async function getAllTopics(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      dt.id,
      dt.name,
      COALESCE(dp.completed, 0) AS completed
    FROM dsa_topics dt
    LEFT JOIN dsa_progress dp
      ON dt.id = dp.topic_id
      AND dp.user_id = ?
    ORDER BY dt.id
    `,
    [userId]
  );

  return rows;
}

// Mark topic as completed
export async function markTopicCompleted(userId, topicId) {
  await pool.query(
    `
    INSERT INTO dsa_progress (user_id, topic_id, completed)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE
    completed = 1
    `,
    [userId, topicId]
  );
}