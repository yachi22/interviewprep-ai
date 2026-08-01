import api from "./axios";

export const uploadResume = (formData) => {
  return api.post("/resume", formData);
};

export const getResume = () => {
  return api.get("/resume");
};