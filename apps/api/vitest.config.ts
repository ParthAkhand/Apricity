import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Tests run against the local dev SQLite file (DATABASE_URL in the root .env).
  test: { env: loadEnv("test", "../..", ""), fileParallelism: false },
});
