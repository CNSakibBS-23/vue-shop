<template>
  <div class="cart">
    <h1 class="cart_title">Cart</h1>
    <template v-if="cartItems && cartItems.length === 0">
      <p>Cart is empty</p>
    </template>
    <template v-else>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Product Image" class="cart-item-image" />
          <div class="cart-item-details">
            <h2 class="cart-item-title">{{ item.title }}</h2>
            <p class="cart-item-quantity">Quantity: {{ item.quantity }}</p>
            <p class="cart-item-price">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
      <div class="cart-total">
        <h2>Total Price: ${{ totalPrice.toFixed(2) }}</h2>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, readonly } from "vue";
import { defineProps } from "vue";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const props = defineProps<{ cartItems?: CartItem[] }>();

const totalPrice = readonly(
  computed(() => {
    return (
      props.cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) ?? 0
    );
  })
);
</script>

<style scoped>
.cart_title {
  font: bold;
  color: green;
}
.cart {
  padding: 16px;
  max-width: 300px;
}

.cart-items {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-image {
  width: 50px;
  height: 50px;
  margin-right: 16px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-title {
  margin: 0;
  font-size: 16px;
}

.cart-item-quantity,
.cart-item-price {
  margin: 4px 0;
  font-size: 14px;
}

.cart-total {
  font-weight: bold;
  font-size: 18px;
}
</style>
