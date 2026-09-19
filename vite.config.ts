import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Relative base allows deployment to any path, subdomain, GitHub Pages, or local preview
export default defineConfig({
  plugins: [react()],
  base: "./",
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