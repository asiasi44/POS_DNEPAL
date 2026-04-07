//@ts-nocheck
import axios from "axios";

export const getPackages = async () => {
  const response = await axios.get("/api/package");
  return response.data.data;
};

export const addPackage = async (body: {
  name: String;
  type: String;
  maxCustomer: Number;
  maxProducts: Number;
  price: Number; 
}) => {
  const response = await axios.post("/api/package", body);
  return response;
};

export const deletePackage = async (id) => {
  const response = await axios.delete(`/api/package/${id}`);
  return response;
};

export const updatePackage = async ({ id, packageData }) => {
  const response = await axios.patch(`/api/package/${id}`, packageData);
  return response;
};
