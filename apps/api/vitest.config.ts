import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Tests run against the dev Postgres from docker compose (DATABASE_URL in the root .env).
  test: { env: loadEnv("test", "../..", ""), fileParallelism: false },
});
