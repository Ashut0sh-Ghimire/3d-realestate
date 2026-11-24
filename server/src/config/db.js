// The one PostgreSQL connection pool. Services import { query } from here.
import pg from "pg";
import { env } from "./env.js";

let pool;

function getPool() {
  if (!pool) {
    if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set (see server/.env.example)");
    pool = new pg.Pool({ connectionString: env.DATABASE_URL });
  }
  return pool;
}

export const query = (text, params) => getPool().query(text, params);
