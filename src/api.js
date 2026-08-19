import axios from "axios";

const LOCAL_API_URL = "http://localhost:8000";
const PRODUCTION_API_URL = "https://my-backend-6vy3.onrender.com";

const isLocalFrontend =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalFrontend ? LOCAL_API_URL : PRODUCTION_API_URL);

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

export const googleLoginApi = async (token) => {
  return await api.post("/api/v1/users/google-login", { token });
};

export const forgotPassword = async (email) => api.post("/api/v1/users/forgot-password", { email });
export const resetPassword = async (token, password) => api.post("/api/v1/users/reset-password", { token, password });
export const verifyEmail = async (token) => api.post("/api/v1/users/verify-email", { token });
export const resendVerificationEmail = async (email) => api.post("/api/v1/users/resend-verification", { email });
export const changePassword = async (currentPassword, newPassword) => api.post("/api/v1/users/change-password", { currentPassword, newPassword });

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

export const updateProductStock = async (productId, stock) => {
  return await api.patch(`/api/v1/products/${productId}/stock`, { stock });
};

export const deleteProduct = async (productId) => {
  return await api.delete(`/api/v1/products/${productId}`);
};

export const getCart = async () => {
  return await api.get("/api/v1/cart");
};

export const addCartItem = async (productId) => {
  return await api.post("/api/v1/cart/items", { productId });
};

export const updateCartItem = async (productId, change) => {
  return await api.patch(`/api/v1/cart/items/${productId}`, { change });
};

export const removeCartItem = async (productId) => {
  return await api.delete(`/api/v1/cart/items/${productId}`);
};

export const clearCartApi = async () => {
  return await api.delete("/api/v1/cart");
};

export const getOrders = async () => {
  return await api.get("/api/v1/orders");
};

export const createOrder = async (items, idempotencyKey) => { 
  return await api.post( // things we are giving to api are items and idempotencyKey, but since we are taking items from cart on backend, we don't need to pass them explicitly, so items will be undefined
    "/api/v1/orders",
    { items },
    {
      headers: idempotencyKey
        ? {
            "Idempotency-Key": idempotencyKey
          }
        : {}
    }
  );
};

export const confirmPayment = async (paymentId) => {
  return await api.post(`/api/v1/payments/${paymentId}/confirm`);
};

export const createRazorpayOrder = async (paymentId) => {
  return await api.post(`/api/v1/payments/${paymentId}/razorpay-order`);
};

export const verifyRazorpayPayment = async (paymentId, razorpayPayment) => {
  return await api.post(
    `/api/v1/payments/${paymentId}/razorpay-verify`,
    razorpayPayment
  );
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
