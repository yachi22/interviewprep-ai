import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  fetchTopics,
  completeTopic,
} from "../controllers/dsa.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchTopics);
router.post("/complete", requireAuth, completeTopic);

export default router;