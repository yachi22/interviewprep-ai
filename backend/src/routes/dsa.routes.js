import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  fetchDSATopics,
  updateDSAProgress,
  resetDSAProgress,
} from "../controllers/dsa.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchDSATopics);

router.put(
  "/progress",
  requireAuth,
  updateDSAProgress
);

router.delete(
  "/progress/:topicId",
  requireAuth,
  resetDSAProgress
);

export default router;