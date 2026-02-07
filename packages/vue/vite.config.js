import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "M3eVue",
      fileName: "m3e-vue",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@m3e/css"],
    },
  },
});
