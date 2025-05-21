import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // 👈 forces Vite to use 127.0.0.1 instead of localhost
    port: 5173, // optional, defaults to 5173
  },
});
