import {
  bookmarkQuestion,
  getBookmarks,
  removeBookmark,
} from "../models/bookmark.model.js";

// Add Bookmark
export async function addBookmark(req, res) {
  try {
    const userId = req.user.id;
    const { questionId } = req.body;

    await bookmarkQuestion(userId, questionId);

    res.status(201).json({
      success: true,
      message: "Bookmark added successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to add bookmark.",
    });
  }
}

// Get All Bookmarks
export async function fetchBookmarks(req, res) {
  try {
    const userId = req.user.id;

    const bookmarks = await getBookmarks(userId);

    res.json({
      success: true,
      bookmarks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch bookmarks.",
    });
  }
}

// Delete Bookmark
export async function deleteBookmark(req, res) {
  try {
    const userId = req.user.id;
    const { questionId } = req.params;

    await removeBookmark(userId, questionId);

    res.json({
      success: true,
      message: "Bookmark removed.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to remove bookmark.",
    });
  }
}