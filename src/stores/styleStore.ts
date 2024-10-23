import { defineStore } from "pinia";
import { ref } from "vue";
import { productApiHandler, ENDPOINTS } from "@/api/index";

export const useStyleStore = defineStore("styleStore", () => {
  const primaryColor = ref<string>("#3498db");
  const secondaryColor = ref<string>("#afcfa8");
  const fontSizeBase = ref<string>("14px");
  const fontSizeLg = ref<string>("16px");
  const fontSizeSm = ref<string>("12px");

  const updateCSSVariables = () => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", primaryColor.value);
    root.style.setProperty("--secondary-color", secondaryColor.value);
    root.style.setProperty("--font-size-base", fontSizeBase.value);
    root.style.setProperty("--font-size-lg", fontSizeLg.value);
    root.style.setProperty("--font-size-sm", fontSizeSm.value);
  };

  const fetchStyles = async () => {
    try {
      const response = await productApiHandler.get(ENDPOINTS.fetchStyles);
      const data = response.data[0];
      console.log(data);

      primaryColor.value = data.primaryColor || primaryColor.value;
      secondaryColor.value = data.secondaryColor || secondaryColor.value;
      fontSizeBase.value = data.fontSizeBase || fontSizeBase.value;
      fontSizeLg.value = data.fontSizeLg || fontSizeLg.value;
      fontSizeSm.value = data.fontSizeSm || fontSizeSm.value;

      updateCSSVariables();
    } catch (error) {
      console.error("Error fetching styles:", error);
    }
  };

  return { primaryColor, fontSizeBase, fontSizeLg, fontSizeSm, fetchStyles };
});
