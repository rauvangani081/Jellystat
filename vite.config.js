import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "backend", "JS_");

  return {
    envPrefix: "JS_",
    base: env.JS_BASE_URL ?? "/",
    envDir: "backend",

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "axios", "react-toastify"],
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },

    server: {
      port: 3001,
      proxy: {
        "/api": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/proxy": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/stats": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/sync": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/auth": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/backup": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/logs": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/swagger": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/utils": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/webhooks": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/env.js": { target: "http://127.0.0.1:3000", changeOrigin: true },
        "/socket.io": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true,
          ws: true,
        },
      },
    },

    build: {
      target: "es2015",
      rollupOptions: {
        output: {
          // Keep bundling simple and robust: put all node_modules into one vendor chunk.
          // This prevents fragile multi-chunk ordering issues that can cause
          // runtime "Cannot access <X> before initialization" or undefined imports.
          manualChunks(id) {
            return id && id.includes && id.includes("node_modules") ? "vendor" : undefined;
          },
          chunkFileNames: "assets/[name]-[hash].js",
        },
      },
    },

    plugins: [react()],
  };
});
