import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import {
  addBookmark,
  fetchBookmarks,
  deleteBookmark,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/", requireAuth, addBookmark);
router.get("/", requireAuth, fetchBookmarks);
router.delete("/:questionId", requireAuth, deleteBookmark);

export default router;