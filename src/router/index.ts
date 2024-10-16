import AddProduct from "@/components/AddProduct.vue";
import Products from "@/components/Products.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import ValidationForm from "@/components/ValidationForm.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: Products },
  { path: "/cart", component: ShoppingCart },
  { path: "/addProduct", component: AddProduct },
  { path: "/validationForm", component: ValidationForm },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
