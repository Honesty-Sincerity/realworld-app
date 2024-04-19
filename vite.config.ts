import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    server: {
      port: 4000,
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@utils": "/src/utils",
      },
    },
  };
});
