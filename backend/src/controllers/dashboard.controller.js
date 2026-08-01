import { getDashboardStats } from "../models/dashboard.model.js";

export async function fetchDashboardStats(req, res) {
  try {
    const userId = req.user.id;

    const stats = await getDashboardStats(userId);

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard stats.",
    });
  }
}