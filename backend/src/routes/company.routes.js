import { Router } from "express";

import {
  fetchCompanies,
  fetchCompanyQuestions,
} from "../controllers/company.controller.js";

const router = Router();

// GET all companies
router.get("/", fetchCompanies);

// GET questions of a specific company
router.get("/:id/questions", fetchCompanyQuestions);

export default router;