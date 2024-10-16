<script setup lang="ts">
import { ref } from "vue";
import Products from "./components/Products.vue";
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
const productsRef = ref<InstanceType<typeof Products> | null>(null);
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
const refreshProducts = () => {
  productsRef.value?.fetchProducts();
};
</script>

<template>
  <h1 class="title">Vue-Shop</h1>
  <nav>
    <ul>
      <li><router-link to="/">Products | </router-link></li>
      <li><router-link to="/cart">Shopping Cart | </router-link></li>
      <li><router-link to="/addProduct">Add Product | </router-link></li>
      <li>
        <router-link to="/validationForm">Validation Form | </router-link>
      </li>
      <li><router-link to="/addProductYup">Add Product Yup</router-link></li>
    </ul>
  </nav>
  <div class="container">
    <router-view
      :cartItems="cartItems"
      @add-to-cart="addToCart"
      @product-added="refreshProducts"
    />
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
nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
}

nav ul li {
  cursor: pointer;
}

nav ul li a {
  text-decoration: none;
  color: black;
  font-weight: normal;
}
nav ul li a.router-link-exact-active {
  color: red;
  font-weight: bold;
}

nav ul li a:hover {
  color: blue;
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
