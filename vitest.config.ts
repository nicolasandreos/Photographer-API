import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["./src/tests/integration/global-setup.ts"],
    setupFiles: ["./src/tests/integration/setup.ts"],
    fileParallelism: false,
  },
});
