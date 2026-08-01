import {
  getAllTopics,
  markTopicCompleted,
} from "../models/dsa.model.js";

export async function fetchTopics(req, res) {
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
      error: "Failed to fetch topics.",
    });
  }
}

export async function completeTopic(req, res) {
  try {
    const { topicId } = req.body;

    await markTopicCompleted(req.user.id, topicId);

    res.json({
      success: true,
      message: "Topic completed.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to update topic.",
    });
  }
}