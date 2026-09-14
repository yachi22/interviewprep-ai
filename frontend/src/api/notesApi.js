import api from "./axios";

export const getNotes = () => {
  return api.get("/notes");
};

export const createNote = (data) => {
  return api.post("/notes", data);
};

export const updateNote = (id, data) => {
  return api.put(`/notes/${id}`, data);
};

export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`);
};