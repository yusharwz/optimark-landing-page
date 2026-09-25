import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Local development keeps DATABASE_URL in .env.local (Next's convention);
// .env is a fallback. On the server the variable is already in the process
// environment, and dotenv never overrides an existing value.
config({ path: [".env.local", ".env"], quiet: true });

/**
 * Prisma CLI configuration (Prisma 7 moved the datasource URL here).
 *
 * `url` is read with a plain `process.env` lookup rather than Prisma's `env()`
 * helper, which throws when the variable is unset. `prisma generate` needs no
 * database, and it runs inside the Docker build where no DATABASE_URL exists —
 * the strict helper would fail that build. Commands that do need a database
 * (`migrate`, `studio`) fail loudly on their own if it is missing.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
