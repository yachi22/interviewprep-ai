import multer from "multer";
import path from "path";

import {
  saveResume,
  getResume,
} from "../models/resume.model.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const fileName =
      Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

export const upload = multer({
  storage,
});

export async function uploadResume(req, res) {
console.log(req.file);
console.log(req.user);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded.",
      });
    }

    await saveResume(
      req.user.id,
      req.file.originalname,
      req.file.filename
    );

    res.json({
      success: true,
      message: "Resume uploaded successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Upload failed.",
    });
  }
}

export async function fetchResume(req, res) {
  try {
    const resume = await getResume(req.user.id);

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch resume.",
    });
  }
}