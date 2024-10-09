<script setup lang="ts">
import { ref } from "vue";
import Products from "./components/Products.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import AddProduct from "./components/AddProduct.vue";
import { useToast } from "vue-toastification";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const cartItems = ref<CartItem[]>([]);
const toast = useToast();

const addToCart = (product: Product) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    toast.success("Product added to cart");
    cartItems.value.push({ ...product, quantity: 1 });
  }
};
</script>

<template>
  <h1 class="title">Vue-Shop</h1>
  <div class="container">
    <Products @add-to-cart="addToCart" />
    <ShoppingCart :cartItems="cartItems" />
    <AddProduct />
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font: bold;
  color: red;
}
.container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.container > * {
  flex-basis: 45%;
}
</style>
