import {
  getNotes,
  createNote,
  deleteNote,
} from "../models/note.model.js";

export async function fetchNotes(req, res) {
  try {
    const notes = await getNotes(req.user.id);

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch notes.",
    });
  }
}

export async function addNote(req, res) {
  try {
    const { title, content } = req.body;

    await createNote(req.user.id, title, content);

    res.status(201).json({
      success: true,
      message: "Note created.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to create note.",
    });
  }
}

export async function removeNote(req, res) {
  try {
    await deleteNote(req.user.id, req.params.id);

    res.json({
      success: true,
      message: "Note deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to delete note.",
    });
  }
}