import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { fetchDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", requireAuth, fetchDashboardStats);

export default router;