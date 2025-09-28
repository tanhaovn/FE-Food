import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

const categoriesApi = {
  create: (data) => axios.post(API_URL, data),
  read: () => axios.get(API_URL),
  update: (id, data) => axios.patch(`${API_URL}/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/${id}`),
};

export default categoriesApi;
