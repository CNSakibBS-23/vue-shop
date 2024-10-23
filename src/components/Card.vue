<template>
  <div class="card">
    <img :src="product.image" alt="Product image" class="card-image" />
    <h2 class="card-title">{{ product.title }}</h2>
    <p class="card-price">${{ product.price }}</p>
    <Button label="Add to Cart" @click="addToCart" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Button from "./Button.vue";

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
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.card-price {
  font-size: var(--font-size-sm);
  color: #4a5568;
  margin-bottom: 16px;
}
@media (min-width: 0px) and (max-width: 768px) {
  .card {
    font-size: var(--font-size-base);
    max-width: 120px;
    padding: 10px;
    margin: 10px;
  }
  .card-image {
    width: 60%;
    height: 60%;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  .card-title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    margin-bottom: 4px;
    text-align: center;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card {
    font-size: var(--font-size-sm);
    max-width: 160px;
    padding: 12px;
    margin: 12px;
  }
  .card-image {
    width: 80%;
    height: 80%;
    border-radius: 8px;
    margin-bottom: 14px;
  }
  .card-title {
    font-size: var(--font-size-base);
    font-weight: 600;
    margin-bottom: 6px;
    text-align: center;
  }
}

@media (min-width: 1025px) {
  .card {
    font-size: var(--font-size-lg);
    max-width: 200px;
    padding: 15px;
    margin: 14px;
  }
  .card-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  .card-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
  }
}
</style>
