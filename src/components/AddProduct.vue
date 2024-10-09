<template>
  <div class="form-container">
    <h1>Add new Product</h1>
    <input type="text" placeholder="Enter Product Name" required />
    <input type="number" placeholder="Enter Product Price" required />
    <input type="text" placeholder="Enter Product Image URL" required />
    <button type="submit" @click="handleAddProduct">Add product</button>
  </div>
</template>

<script setup lang="ts">
const handleAddProduct = () => {
  console.log("Product Added");
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
