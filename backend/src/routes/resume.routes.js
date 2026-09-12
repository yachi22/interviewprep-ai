import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import {
  upload,
  uploadResume,
  fetchResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchResume);

router.post(
  "/",
  requireAuth,
  upload.single("resume"),
  uploadResume
);

export default router;