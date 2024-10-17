<template>
  <div class="products">
    <h1 class="product_title">Our Products</h1>
    <div class="cards-container">
      <Card
        v-for="product in productStore.products"
        :key="product.title"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits } from "vue";
import Card from "./Card.vue";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const emit = defineEmits(["add-to-cart"]);

const fetchProducts = async () => {
  await productStore.fetchProducts();
};

const addToCart = (product: any) => {
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
  padding: 10px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
