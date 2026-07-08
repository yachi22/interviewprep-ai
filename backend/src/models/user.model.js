import pool from "../config/db.js";

// Check if email already exists
export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] || null;
}

// Used during login (includes password hash)
export async function findUserByEmailWithPassword(email) {
  const [rows] = await pool.query(
    `SELECT
        id,
        name,
        email,
        password_hash,
        role,
        target_role
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] || null;
}

// Used for /profile
export async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT
        id,
        name,
        email,
        role,
        target_role,
        created_at
     FROM users
     WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
}

// Create new user
export async function createUser({
  name,
  email,
  passwordHash,
  targetRole,
}) {
  const [result] = await pool.query(
    `INSERT INTO users
    (name, email, password_hash, target_role)
    VALUES (?, ?, ?, ?)`,
    [
      name,
      email,
      passwordHash,
      targetRole ?? null,
    ]
  );

  return await findUserById(result.insertId);
}