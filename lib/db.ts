import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Shared Prisma client for server code (route handlers, server actions,
 * server components). `server-only` makes any accidental import from a client
 * component a build error instead of a leaked connection string.
 *
 * Connection is lazy: nothing touches the database until the first query, so
 * importing this module during `next build` — which runs without a database —
 * is safe. Only code that actually queries at build time would fail, and no
 * page does yet (see server/blog/queries.ts).
 *
 * The instance is cached on `globalThis`. In production that is simply the one
 * shared client; in development it matters, because hot reload re-runs this
 * module and a fresh client per reload would exhaust Postgres connections
 * within minutes.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
  }
  // When connection string specifies a schema (e.g. optimark_landing), ensure
  // PostgreSQL search_path matches so enum comparisons (BlogPostStatus, Locale)
  // resolve in the same schema without type mismatch.
  const schemaMatch = connectionString.match(/[?&]schema=([^&]+)/);
  if (schemaMatch && !connectionString.includes("search_path")) {
    const schema = schemaMatch[1];
    const separator = connectionString.includes("?") ? "&" : "?";
    connectionString += `${separator}options=-csearch_path%3D${schema},public`;
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

/**
 * Created on first property access rather than at import time, so a missing
 * DATABASE_URL surfaces as a clear error at the first query instead of
 * crashing every module that merely imports `db`.
 */
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = (globalForPrisma.prisma ??= createClient());
    const value = Reflect.get(client, property, client);
    // Bind methods ($transaction, $disconnect, …) to the real client so `this`
    // inside them is never the proxy.
    return typeof value === "function" ? value.bind(client) : value;
  },
});
