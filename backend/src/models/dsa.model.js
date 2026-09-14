import pool from "../config/db.js";

// Get all DSA topics with the current user's progress
export async function getAllTopics(userId) {
  const [rows] = await pool.query(
    `
    SELECT
      dt.id,
      dt.name,
      COALESCE(dp.completed, 0) AS completed,
      COALESCE(dp.revision_count, 0) AS revision_count
    FROM dsa_topics dt
    LEFT JOIN dsa_progress dp
      ON dt.id = dp.topic_id
      AND dp.user_id = ?
    ORDER BY dt.id ASC
    `,
    [userId]
  );

  return rows;
}

// Update topic progress
export async function updateTopicProgress(
  userId,
  topicId,
  completed,
  revisionCount
) {
  const [existing] = await pool.query(
    `
    SELECT id
    FROM dsa_progress
    WHERE user_id = ? AND topic_id = ?
    LIMIT 1
    `,
    [userId, topicId]
  );

  if (existing.length > 0) {
    await pool.query(
      `
      UPDATE dsa_progress
      SET completed = ?,
          revision_count = ?
      WHERE user_id = ? AND topic_id = ?
      `,
      [
        completed ? 1 : 0,
        revisionCount,
        userId,
        topicId,
      ]
    );
  } else {
    await pool.query(
      `
      INSERT INTO dsa_progress
        (user_id, topic_id, completed, revision_count)
      VALUES (?, ?, ?, ?)
      `,
      [
        userId,
        topicId,
        completed ? 1 : 0,
        revisionCount,
      ]
    );
  }
}

// Reset topic progress
export async function resetTopicProgress(userId, topicId) {
  await pool.query(
    `
    DELETE FROM dsa_progress
    WHERE user_id = ? AND topic_id = ?
    `,
    [userId, topicId]
  );
}