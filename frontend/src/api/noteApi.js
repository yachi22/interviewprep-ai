import api from "./axios";

// Get all notes
export const getNotes = () => {
  return api.get("/notes");
};

// Create note
export const createNote = (note) => {
  return api.post("/notes", note);
};

// Delete note
export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`);
};