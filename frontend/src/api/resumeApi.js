import api from "./axios";

export const getResume = () => {
  return api.get("/resume");
};

export const uploadResume = (formData) => {
  return api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};