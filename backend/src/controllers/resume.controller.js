import {
  getResume,
  createResume,
  deleteUserResumes,
} from "../models/resume.model.js";

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

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Please select a resume file.",
      });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        error: "Only PDF, DOC, and DOCX files are allowed.",
      });
    }

    // Remove the user's previous resume record
    await deleteUserResumes(req.user.id);

    const fileUrl = `/uploads/${req.file.filename}`;

    const resumeId = await createResume(
      req.user.id,
      req.file.originalname,
      fileUrl
    );

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resumeId,
      resume: {
        id: resumeId,
        file_name: req.file.originalname,
        file_url: fileUrl,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to upload resume.",
    });
  }
}