import { Router } from "express";

import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/authMiddleware.js";

import { validateRegister } from "../middleware/validateRegister.middleware.js";
import { validateLogin } from "../middleware/validateLogin.middleware.js";

const router = Router();

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

// Protected route
router.get("/profile", requireAuth, profile);

export default router;