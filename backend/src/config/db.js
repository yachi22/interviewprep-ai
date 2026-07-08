import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// db.js
// -----
// Creates and exports a single MySQL connection pool for the whole app.
// A pool (rather than one-off connections) is reused across requests,
// which is the standard pattern for a production Express + MySQL app.
//
// NOTE: No queries or models are defined here — this file's only job is
// to expose a ready-to-use `pool` that other modules (models,
// controllers) will import later.
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "interviewprep_ai",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Lightweight startup check: confirms the app *can* reach MySQL with the
// given credentials, without running any real query logic. Failure here
// only logs a warning — it does not crash the server — so the rest of
// the API (e.g. /api/health) still works even before MySQL is configured.
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected successfully.");
    connection.release();
  } catch (error) {
    console.warn(
      "⚠️  MySQL connection failed. The server will keep running, but " +
        "database-backed features won't work until this is fixed.\n" +
        `   Reason: ${error.message}`
    );
  }
}

export default pool;
