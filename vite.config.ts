import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");

  return {
    plugins: [react(), nodePolyfills(), reactRefresh()],
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
        "@features": "/src/features",
        "@machines": "/src/machines",
        "@models": "/src/models",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/setup-tests.ts",
      exclude: ["node_modules", "cypress", "dist"],
    },
  };
});
