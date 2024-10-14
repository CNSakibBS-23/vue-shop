<template>
  <div class="form-container">
    <h1>Add new Product</h1>
    <input type="number" v-model="productId" placeholder="Enter Product id" required />
    <input type="text" v-model="productTitle" placeholder="Enter Product Name" required />
    <input type="number" v-model="productPrice" placeholder="Enter Product Price" required />
    <input type="text" v-model="productImage" placeholder="Enter Product Image URL" required />
    <button type="button" @click="handleAddProduct">Add product</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const productId = ref<number | null>(null);
const productTitle = ref<string>('');
const productPrice = ref<number | null>(null);
const productImage = ref<string>('');
const toast =useToast();
const handleAddProduct = async () => {
  try {
    const addProduct = await axios.post("http://localhost:3000/products", {
      id: productId.value,
      title: productTitle.value,
      price: productPrice.value,
      image: productImage.value,
    });

    if(addProduct.status == 201){
      toast.success("Product Added");
      productId.value = null;
      productTitle.value = '';
      productPrice.value = null;
      productImage.value = '';
    }
  } catch (error) {
    toast.error("Error adding product");
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
  border: 1px dotted skyblue;
}
.form-container input {
  padding: 20px 30px;
  margin: 10px;
  border: 1px solid skyblue;
  border-radius: 10px;
}
.form-container button {
  padding: 10px 30px;
  margin: 10px;
  color: white;
  background-color: skyblue;
  border: 1px solid skyblue;
  border-radius: 10px;
  outline: none;
}

.form-container button:hover {
  color: black;
  cursor: pointer;
}
.form-container input:focus {
  outline: none;
  border: 1px solid blue;
  /* border-radius: 10px; */
}
</style>
