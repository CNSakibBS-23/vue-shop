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
import { ref, onMounted, defineEmits } from "vue";
import Card from "./Card.vue";

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
    const response = await fetch("/db.json");
    const data = await response.json();
    products.value = data.products;
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
</script>

<style scoped>
.product_title {
  font: bold;
  color: tomato;
}
.products {
  padding: 16px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
