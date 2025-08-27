/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src//.test.{js,jsx,ts,tsx}",
        "src/**/.spec.{js,jsx,ts,tsx}",
        "src/index.{js,jsx,ts,tsx}",
        "src/setupTests.{js,ts}",
        "src/*.d.ts",
        "src/utils/countries.ts",
        "src/test-utils/**",
        "src/interfaces/**",
        "src/store/store.ts",
        "src/App.tsx",
        "src/main.tsx",
      ],
      thresholds: {
        statements: 1,
        branches: 1,
        functions: 1,
        lines: 1,
      },
    },
  },
});
