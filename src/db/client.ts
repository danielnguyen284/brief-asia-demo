import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

/**
 * Shared Postgres client. Long-lived in production, single connection in dev.
 *
 * Apps that need the DB should import from `@briefasia/db/client`:
 *
 *   import { db } from "@briefasia/db/client";
 *   const articles = await db.query.articles.findMany({ limit: 10 });
 *
 * The connection URL comes from `DATABASE_URL`. In Next.js + Vercel the
 * environment is set per deploy; in local dev it lives in `.env.local`.
 */

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example → .env.local and run `pnpm db:up`."
  );
}

// Reuse the connection across HMR reloads in dev.
declare global {
  // eslint-disable-next-line no-var
  var __briefAsiaPgClient: ReturnType<typeof postgres> | undefined;
}

const client =
  globalThis.__briefAsiaPgClient ??
  postgres(databaseUrl, {
    // Edge runtimes / Vercel functions: keep the pool small.
    max: process.env.NODE_ENV === "production" ? 5 : 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__briefAsiaPgClient = client;
}

export const db = drizzle(client, { schema });
export type DB = typeof db;
