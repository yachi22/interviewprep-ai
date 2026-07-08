// validateRegister.middleware.js
// -------------------------------
// Validates req.body for POST /api/auth/register before it reaches the
// controller. Pure input validation only — no DB access here (the
// duplicate-email check happens in the controller, since that requires
// a query).
//
// On failure: responds 400 with a list of human-readable error
// messages and does NOT call next().
// On success: calls next().

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function validateRegister(req, res, next) {
  const { name, email, password } = req.body ?? {};
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters long.");
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    errors.push("A valid email address is required.");
  }

  if (!password || typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password is required and must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  // Optional fields — only validate type/shape if they were provided.
  if (req.body?.college !== undefined && req.body.college !== null && typeof req.body.college !== "string") {
    errors.push("College must be a string.");
  }

  if (
    req.body?.target_company !== undefined &&
    req.body.target_company !== null &&
    typeof req.body.target_company !== "string"
  ) {
    errors.push("Target company must be a string.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

