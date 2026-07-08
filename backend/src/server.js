import dotenv from "dotenv";
import app from "./app.js";
import { testConnection } from "./config/db.js";

dotenv.config();

// server.js
// ---------
// Entry point for the backend process. Responsible only for reading the
// port from the environment and starting the HTTP listener — all app
// configuration lives in app.js, and DB config lives in config/db.js.
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 InterviewPrep AI API listening on http://localhost:${PORT}`);
  await testConnection();
});
