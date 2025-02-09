import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { coverageConfigDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["./build/**", ...coverageConfigDefaults.exclude],
    },
  },
  build: {
    outDir: "build",
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
