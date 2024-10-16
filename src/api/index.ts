import axios from "axios";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const ENDPOINTS = {
  fetchProducts: "/products",
  addProduct: "/products",
};

const ApiService = {
  fetchProducts: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.fetchProducts);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  addProduct: async (product: {
    title: string;
    price: number;
    image: string;
  }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.addProduct, product);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },
};

export { ApiService };
