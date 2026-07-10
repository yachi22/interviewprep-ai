import {
  getAllCompanies,
  getQuestionsByCompany,
} from "../models/company.model.js";

// GET /api/companies
export async function fetchCompanies(req, res) {
  try {
    const companies = await getAllCompanies();

    return res.json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch companies.",
    });
  }
}

// GET /api/companies/:id/questions
export async function fetchCompanyQuestions(req, res) {
  try {
    const { id } = req.params;

    const questions = await getQuestionsByCompany(id);

    return res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch questions.",
    });
  }
}