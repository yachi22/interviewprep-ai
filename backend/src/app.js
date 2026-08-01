import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import companyRoutes from "./routes/company.routes.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import solvedRoutes from "./routes/solved.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/solved", solvedRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;