import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
    css: true,
    globals: true,
  },
});