import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

let cachedProducts = null;

export const resetProductCache = () => {
  cachedProducts = null;
};

export const registerUser = async (userData) => {
  return await api.post("/api/v1/users/register", userData);
};

export const loginUser = async (loginData) => {
  return await api.post("/api/v1/users/login", loginData);
};

export const logoutUser = async () => {
  return await api.post("/api/v1/users/logout");
};

export const getCurrentUser = async () => {
  return await api.get("/api/v1/users/current-user");
};

export const becomeSellerApi = async () => {
  return await api.post("/api/v1/users/become-seller");
};

export const createProduct = async (productData) => {
  return await api.post("/api/v1/products/store-products", productData);
};

export const importDummyProducts = async () => {
  return await api.post("/api/v1/products/import-dummy-products");
};

const fetchItems = async ({ forceRefresh = false } = {}) => {
  if (cachedProducts && !forceRefresh) return cachedProducts;

  try {
    const response = await api.get("/api/v1/products");
    cachedProducts = response.data?.data || [];
  } catch (error) {
    const response = await axios.get("https://dummyjson.com/products");
    cachedProducts = response.data?.products || [];
  }
  console.log(cachedProducts);
  return cachedProducts;
};

export async function fetchItemById(id) {
  try {
    const response = await api.get(`/api/v1/products/${id}`);
    return response.data?.data || null;
  } catch (error) {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data || null;
  }
}

export default fetchItems;
