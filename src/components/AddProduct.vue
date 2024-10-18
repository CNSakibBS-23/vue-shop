<template>
  <div class="form-container">
    <h1>Add New Product</h1>
    <form @submit.prevent="handleAddProduct">
      <input
        type="text"
        v-model="productTitle"
        placeholder="Enter Product Name"
        required
      />
      <template v-if="errors.title">
        <p class="error">{{ errors.title }}</p>
      </template>

      <input
        type="number"
        v-model="productPrice"
        placeholder="Enter Product Price"
        required
      />
      <template v-if="errors.price">
        <p class="error">{{ errors.price }}</p>
      </template>
      <input
        type="text"
        v-model="productImage"
        placeholder="Enter Product Image URL"
        required
      />
      <template v-if="errors.image">
        <p class="error">{{ errors.image }}</p>
      </template>

      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(["product-added"]);

const productTitle = ref<string>("");
const productPrice = ref<number | null>(null);
const productImage = ref<string>("");

const errors = ref({
  title: "",
  price: "",
  image: "",
});

const toast = useToast();

const isAlphanumeric = (str: string): boolean => /^[a-zA-Z0-9 ]+$/.test(str);

const isValidUrl = (url: string): boolean =>
  /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(url);

const validateForm = (): boolean => {
  errors.value.title = "";
  errors.value.price = "";
  errors.value.image = "";

  let isValid = true;

  if (!isAlphanumeric(productTitle.value)) {
    errors.value.title = "Title can only contain letters, numbers, and spaces.";
    isValid = false;
  }

  if (
    productPrice.value === null ||
    productPrice.value <= 0 ||
    productPrice.value > 100
  ) {
    errors.value.price =
      "Price must be greater than 0 and less than or equal to $100.";
    isValid = false;
  }

  if (!isValidUrl(productImage.value)) {
    errors.value.image =
      "Please enter a valid image URL (starting with http:// or https://).";
    isValid = false;
  }

  return isValid;
};

const handleAddProduct = async (): Promise<void> => {
  if (validateForm()) {
    try {
      const response = await axios.post("http://localhost:3000/products", {
        title: productTitle.value,
        price: productPrice.value,
        image: productImage.value,
      });

      if (response.status === 201) {
        emit("product-added");
        toast.success("Product added successfully!");

        productTitle.value = "";
        productPrice.value = null;
        productImage.value = "";
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    }
  } else {
    toast.error("Please fix the errors before submitting.");
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
}
.form-container input {
  padding: 20px 30px;
  margin: 10px;
  border: 1px solid skyblue;
  border-radius: 10px;
}
.form-container button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  margin: 10px;
  color: white;
  background-color: var(--secondary-color);
  border: 1px solid skyblue;
  border-radius: 10px;
  outline: none;
}

.form-container button:hover {
  color: black;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9rem;
}
.form-container input:focus {
  outline: none;
  border: 1px solid blue;
  /* border-radius: 10px; */
}
</style>
