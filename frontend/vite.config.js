import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration.
// - Enables the React plugin (JSX + Fast Refresh).
// - Proxies "/api" calls from the frontend dev server to the Express
//   backend so the frontend can call relative URLs like "/api/health"
//   without hardcoding "http://localhost:5000" everywhere.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
