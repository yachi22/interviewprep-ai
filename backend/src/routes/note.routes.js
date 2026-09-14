import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  fetchNotes,
  addNote,
  editNote,
  removeNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", requireAuth, fetchNotes);

router.post("/", requireAuth, addNote);

router.put("/:id", requireAuth, editNote);

router.delete("/:id", requireAuth, removeNote);

export default router;