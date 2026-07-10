import api from "./axios";

// Get all companies
export const getCompanies = () => {
  return api.get("/companies");
};

// Get questions of a company
export const getCompanyQuestions = (companyId) => {
  return api.get(`/companies/${companyId}/questions`);
};