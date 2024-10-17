import { defineStore } from "pinia";
import { productApiHandler, ENDPOINTS } from "@/api/index";
import { ref } from "vue";

interface Product {
  title: string;
  price: number;
  image: string;
}

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await productApiHandler.get(ENDPOINTS.fetchProducts);
      products.value = response.data;
    } catch (error: any) {
      console.error("Error fetching products:", error);
      error.value = "Failed to fetch products";
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await productApiHandler.post(
        ENDPOINTS.addProduct,
        product
      );
      products.value.push(response.data);
    } catch (error: any) {
      console.error("Error adding product:", error);
      error.value = "Failed to add product";
    }
  };

  return { products, loading, error, fetchProducts, addProduct };
});
