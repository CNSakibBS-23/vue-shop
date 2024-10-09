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

      <div class="discountFeild-container">
        <input
          type="text"
          placeholder="Enter Coupon"
          id="coupon"
          v-model="coupon"
          :disabled="isCouponApplied"
        />
        <button
          type="submit"
          @click="handleAddCoupon"
          :disabled="isCouponApplied"
        >
          Apply
        </button>
      </div>

      <div class="cart-total">
        <h2>Total Price: ${{ discountedPrice.toFixed(2) }}</h2>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, readonly, ref } from "vue";
import { defineProps, watch } from "vue";
import { useToast } from "vue-toastification";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const props = defineProps<{ cartItems?: CartItem[] }>();

const coupon = ref("");
const discount = ref(0);
const isCouponApplied = ref(false);
const toast = useToast();

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

const discountedPrice = computed(() => {
  return totalPrice.value * (1 - discount.value);
});

const handleAddCoupon = () => {
  if (coupon.value === "SAKIB10") {
    discount.value = 0.1;
    isCouponApplied.value = true;
    coupon.value = "";
    toast.success("Coupon Added Sucessfully");
  } else {
    discount.value = 0;
    toast.error("Invalid Coupon");
  }
};

watch(coupon, (newCoupon) => {
  if (!newCoupon) {
    isCouponApplied.value = false;
  }
});
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
.discountFeild-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
}
.discountFeild-container input {
  padding: 8px 15px;
  outline: none;
  border: 1px solid tomato;
  border-radius: 10px;
  margin-right: 5px;
}
.discountFeild-container input::placeholder {
  font-style: italic;
  font-size: 1em;
  color: tomato;
  padding: 5px;
}
.discountFeild-container button {
  padding: 8px 15px;
  outline: none;
  border: 1px solid tomato;
  border-radius: 10px;
  margin-right: 5px;
  background-color: tomato;
  color: white;
  font-style: italic;
}
.discountFeild-container button:disabled {
  display: none;
}

.discountFeild-container button:hover {
  color: black;
  cursor: pointer;
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
