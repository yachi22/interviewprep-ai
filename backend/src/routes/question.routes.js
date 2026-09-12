import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { fetchQuestions } from "../controllers/question.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchQuestions);

export default router;