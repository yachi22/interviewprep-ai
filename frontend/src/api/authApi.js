import api from "./axios";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

export const getProfile = () => {
  return api.get("/auth/profile");
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const updateProfile = (data) => {
  return api.put("/auth/profile", data);
};