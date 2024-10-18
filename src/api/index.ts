import axios from "axios";
import { useToast } from "vue-toastification";

const BASE_URL = "http://localhost:3000";

const productApiHandler = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

productApiHandler.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

productApiHandler.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const toast = useToast();
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Unauthorized access. Please log in.");
      } else if (error.response.status === 404) {
        toast.error("Resource not found.");
      } else {
        toast.error("An error occurred while processing your request.");
      }
    } else {
      toast.error("Network error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

const ENDPOINTS = {
  fetchProducts: "/products",
  addProduct: "/products",
  deleteProduct: (id: string) => `/products/${id}`,
};

export { productApiHandler, ENDPOINTS };
