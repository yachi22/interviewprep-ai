import express from "express";
import multer from "multer";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  fetchResume,
  uploadResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", requireAuth, fetchResume);

router.post(
  "/upload",
  requireAuth,
  upload.single("resume"),
  uploadResume
);

export default router;