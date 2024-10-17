import axios from "axios";

const BASE_URL = "http://localhost:3000";

const productApiHandler = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const ENDPOINTS = {
  fetchProducts: "/products",
  addProduct: "/products",
};

export { productApiHandler, ENDPOINTS };
