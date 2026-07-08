import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
  createUser,
} from "../models/user.model.js";

import { signToken } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

// Register
export async function register(req, res) {
  try {
    const { name, email, password, targetRole } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered.",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser({
      name,
      email: normalizedEmail,
      passwordHash,
      targetRole,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Registration failed.",
    });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmailWithPassword(
      email.trim().toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    delete user.password_hash;

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Login failed.",
    });
  }
}

// Logout
export function logout(req, res) {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
}

// Profile
export async function profile(req, res) {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch profile.",
    });
  }
}