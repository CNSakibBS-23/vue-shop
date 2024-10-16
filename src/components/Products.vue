<template>
  <div class="products">
    <h1 class="product_title">Our Products</h1>
    <div class="cards-container">
      <Card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from "vue";
import Card from "./Card.vue";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const products = ref<Product[]>([]);
const emit = defineEmits(["add-to-cart"]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const addToCart = (product: Product) => {
  emit("add-to-cart", product);
};

onMounted(() => {
  fetchProducts();
});
defineExpose({
  fetchProducts,
});

watch(products, (newProducts, oldProducts) => {
  console.log("Products updated:", newProducts);
});
</script>

<style scoped>
.product_title {
  font: bold;
  color: tomato;
}
.products {
  padding: 10px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
