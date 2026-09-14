import {
  getNotes,
  createNote,
  updateNote,
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

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Note title is required.",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Note content is required.",
      });
    }

    const noteId = await createNote(
      req.user.id,
      title.trim(),
      content.trim()
    );

    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      noteId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to create note.",
    });
  }
}

export async function editNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Note title is required.",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Note content is required.",
      });
    }

    const result = await updateNote(
      req.user.id,
      id,
      title.trim(),
      content.trim()
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Note not found.",
      });
    }

    res.json({
      success: true,
      message: "Note updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to update note.",
    });
  }
}

export async function removeNote(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteNote(
      req.user.id,
      id
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Note not found.",
      });
    }

    res.json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to delete note.",
    });
  }
}