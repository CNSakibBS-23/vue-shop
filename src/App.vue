<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useToast } from "vue-toastification";
import { useStyleStore } from "./stores/styleStore";

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
const isExpandable = ref<boolean>(false);
const showMenu = ref<boolean>(false);
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

const toggleMenu = () => {
  isExpandable.value = !isExpandable.value;
};

const updateMenuDisplay = () => {
  showMenu.value = window.innerWidth > 768;
  if (showMenu.value) {
    isExpandable.value = false;
  }
};

const styleStore = useStyleStore();

onMounted(() => {
  styleStore.fetchStyles();
});

onMounted(() => {
  updateMenuDisplay();
  window.addEventListener("resize", updateMenuDisplay);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMenuDisplay);
});
</script>

<template>
  <h1 class="title">Vue-Shop</h1>
  <nav>
    <i
      v-if="!showMenu"
      class="pi pi-bars"
      @click="toggleMenu"
      style="font-size: 24px; cursor: pointer"
    ></i>

    <ul v-if="showMenu || isExpandable">
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
    <router-view :cartItems="cartItems" @add-to-cart="addToCart" />
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font: bold;
  color: var(--primary-color);
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

nav ul {
  list-style: none;
  display: flex;
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
  color: var(--secondary-color);
  font-weight: bold;
}

nav ul li a:hover {
  color: blue;
}

@media screen and (max-width: 768px) {
  nav ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
