<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="form-style">
    <h1>Validation Form</h1>
    <label for="email">Email</label>
    <Field class="input-style" name="email" type="email" />
    <ErrorMessage class="error-style" name="email" />
    <label for="password">Password</label>
    <Field class="input-style" name="password" type="password" />
    <ErrorMessage class="error-style" name="password" />
    <button class="form_button">Submit</button>
  </Form>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
function onSubmit(values) {
  console.log(JSON.stringify(values, null, 2));
}
</script>

<style scoped>
.form-style {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.input-style {
  padding: 10px;
  border: 1px solid skyblue;
  border-radius: 5px;
  outline: none;
}
.form_button {
  padding: 8px 10px;
  background-color: skyblue;
  outline: none;
  border: none;
  border-radius: 10px;
  color: white;
}
.form_button:hover {
  color: black;
  cursor: pointer;
}
.error-style {
  color: red;
}
</style>
