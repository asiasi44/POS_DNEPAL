import axios from "axios";

export const login = async (body: { email: String; password: String }) => {
  const { data } = await axios.post("/api/login", body);
  return data;
};

export const logout = async () => {
  const response = await axios.delete("/api/login");
  return response;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/api/protected");
  return response.data.userInfo ?? null;
};
