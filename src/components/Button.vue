<template>
  <button
    :class="buttonClass"
    :style="customStyles"
    :type="type"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Submit",
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  buttonClass: {
    type: String,
    default: "responsive_button",
  },
  customStyles: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
.responsive_button {
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color 0.3s;
}

.responsive_button:hover {
  background-color: var(--secondary-color);
}

@media (max-width: var(--max-width-sm)) {
  .responsive_button {
    font-size: var(--font-size-sm);
    padding: 8px 16px;
  }
}

@media (max-width: var(--max-width-lg)) {
  .responsive_button {
    font-size: var(--font-size-lg);
    padding: 12px 24px;
  }
}
</style>
