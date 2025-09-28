import axios from "axios";

const API_URL = "http://localhost:8080/api/products";
const API_CAT = "http://localhost:8080/api/categories";

export const getProducts = () => axios.get(API_URL);
export const getCategories = () => axios.get(API_CAT);

export const createProduct = (product) => {
  const formData = new FormData();
  Object.entries(product).forEach(([k, v]) => formData.append(k, v));
  return axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProduct = (id, product) => {
  const formData = new FormData();
  Object.entries(product).forEach(([k, v]) => formData.append(k, v));
  return axios.patch(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
