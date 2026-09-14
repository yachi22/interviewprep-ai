import {
  getAllTopics,
  updateTopicProgress,
  resetTopicProgress,
} from "../models/dsa.model.js";

export async function fetchDSATopics(req, res) {
  try {
    const topics = await getAllTopics(req.user.id);

    res.json({
      success: true,
      topics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch DSA topics.",
    });
  }
}

export async function updateDSAProgress(req, res) {
  try {
    const {
      topicId,
      completed,
      revisionCount,
    } = req.body;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        error: "Topic ID is required.",
      });
    }

    const revisions = Number(revisionCount) || 0;

    if (revisions < 0) {
      return res.status(400).json({
        success: false,
        error: "Revision count cannot be negative.",
      });
    }

    await updateTopicProgress(
      req.user.id,
      topicId,
      Boolean(completed),
      revisions
    );

    res.json({
      success: true,
      message: "DSA progress updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to update DSA progress.",
    });
  }
}

export async function resetDSAProgress(req, res) {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        error: "Topic ID is required.",
      });
    }

    await resetTopicProgress(
      req.user.id,
      topicId
    );

    res.json({
      success: true,
      message: "DSA progress reset successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to reset DSA progress.",
    });
  }
}