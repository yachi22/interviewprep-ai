import { Router } from "express";

// health.routes.js
// ----------------
// A single placeholder route so the API is verifiably "running" without
// any real business logic. Feature routes (auth, questions, dsa-tracker,
// notes, profile) will each get their own file in this folder later,
// e.g. auth.routes.js, questions.routes.js, etc.
const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", message: "InterviewPrep AI API is running." });
});

export default router;
