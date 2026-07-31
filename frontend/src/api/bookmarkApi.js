import api from "./axios";

// Add Bookmark
export const addBookmark = (questionId) => {
  return api.post("/bookmarks", { questionId });
};

// Get Bookmarks
export const getBookmarks = () => {
  return api.get("/bookmarks");
};

// Delete Bookmark
export const deleteBookmark = (questionId) => {
  return api.delete(`/bookmarks/${questionId}`);
};