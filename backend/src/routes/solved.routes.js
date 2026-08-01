import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import {
  addSolvedQuestion,
  fetchSolvedQuestions,
  deleteSolvedQuestion,
} from "../controllers/solved.controller.js";

const router = express.Router();

router.post("/", requireAuth, addSolvedQuestion);
router.get("/", requireAuth, fetchSolvedQuestions);
router.delete("/:questionId", requireAuth, deleteSolvedQuestion);

export default router;