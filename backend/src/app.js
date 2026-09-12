import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import companyRoutes from "./routes/company.routes.js";
import questionRoutes from "./routes/question.routes.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import solvedRoutes from "./routes/solved.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import dsaRoutes from "./routes/dsa.routes.js";
import noteRoutes from "./routes/note.routes.js";
import resumeRoutes from "./routes/resume.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/solved", solvedRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/resume", resumeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

export default app;