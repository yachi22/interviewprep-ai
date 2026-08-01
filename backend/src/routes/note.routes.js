import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

import {
  fetchNotes,
  addNote,
  removeNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchNotes);
router.post("/", requireAuth, addNote);
router.delete("/:id", requireAuth, removeNote);

export default router;
