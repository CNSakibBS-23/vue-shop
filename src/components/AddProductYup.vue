<template>
  <div class="form-container">
    <h1>Add New Product</h1>
    <Form
      @submit="handleAddProduct"
      :validation-schema="productSchema"
      v-slot="{ errors }"
      class="form_style"
    >
      <Field
        type="text"
        name="title"
        placeholder="Enter product title"
        class="input_style"
      />
      <span class="error">{{ errors.title }}</span>

      <Field
        type="number"
        name="price"
        placeholder="Enter product price"
        class="input_style"
      />
      <span class="error">{{ errors.price }}</span>

      <Field
        type="text"
        name="image"
        placeholder="Enter product image URL"
        class="input_style"
      />
      <span class="error">{{ errors.image }}</span>

      <button type="submit">Add Product</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { object, string, number } from "yup";

import { useToast } from "vue-toastification";
import { useProductStore } from "@/stores/productStore";

const emit = defineEmits(["product-added"]);
const toast = useToast();
const productStore = useProductStore();

const productSchema = object({
  title: string()
    .required("Title is required")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Title can only contain letters, numbers, and spaces"
    ),
  price: number()
    .required("Price is required")
    .min(1, "Price must be greater than 0")
    .max(100, "Price must be less than or equal to $100"),
  image: string()
    .required("Image URL is required")
    .url("Please enter a valid image URL (starting with http:// or https://)"),
});

const handleAddProduct = async (
  values: any,
  { resetForm }: any
): Promise<void> => {
  try {
    await productStore.addProduct({
      title: values.title,
      price: values.price,
      image: values.image,
    });

    emit("product-added");
    toast.success("Product added successfully!");
    resetForm();
  } catch (error) {
    toast.error("An error occurred while adding the product.");
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-container h1 {
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.form-container label {
  font-weight: bold;
  margin-top: 10px;
}

.form-container input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid skyblue;
  border-radius: 5px;
}

.form-container button {
  padding: 10px 30px;
  margin-top: 20px;
  color: white;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

.form-container button:hover {
  background-color: deepskyblue;
  cursor: pointer;
}

.form_style {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.input_style {
  padding: 10px;
  border: 1px solid skyblue;
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}

.form-container input:focus {
  outline: none;
  border: 1px solid blue;
}
</style>
