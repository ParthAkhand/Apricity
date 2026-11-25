import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Tests run against the local dev Postgres (DATABASE_URL in the root .env).
  test: { env: loadEnv("test", "../..", ""), fileParallelism: false },
});
