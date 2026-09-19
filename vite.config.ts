import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Repository base for GitHub Pages hosting: /s.priya/
export default defineConfig({
  plugins: [react()],
  base: "/s.priya/",
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});