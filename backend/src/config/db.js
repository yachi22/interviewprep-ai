import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "interviewprep_ai",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL connected successfully.");

    connection.release();
  } catch (error) {
    console.warn(
      "⚠️ MySQL connection failed. The server will keep running, but " +
        "database-backed features may not work until this is fixed.\n" +
        `   Reason: ${error.message}`
    );
  }
}

export default pool;