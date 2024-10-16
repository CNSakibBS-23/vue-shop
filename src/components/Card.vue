<template>
  <div class="card">
    <img :src="product.image" alt="Product image" class="card-image" />
    <h2 class="card-title">{{ product.title }}</h2>
    <p class="card-price">${{ product.price }}</p>
    <button class="card-button" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

const addToCart = () => {
  emit("add-to-cart", props.product);
};
</script>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.card-price {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 16px;
}

.card-button {
  background-color: #4299e1;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.card-button:hover {
  background-color: #3182ce;
}
</style>
