// Runs every .sql file in db/migrations in name order. Usage: npm run db:migrate -w server
// Never edit a migration someone already ran. Add a new file (002_..., 003_...) instead.
import { readdir, readFile } from "node:fs/promises";
import pg from "pg";

const dir = new URL("./migrations/", import.meta.url);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
await client.query(
  "CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, ran_at TIMESTAMPTZ DEFAULT now())",
);
const done = new Set(
  (await client.query("SELECT name FROM schema_migrations")).rows.map((r) => r.name),
);

for (const file of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) {
  if (done.has(file)) continue;
  console.log("running", file);
  await client.query("BEGIN");
  await client.query(await readFile(new URL(file, dir), "utf8"));
  await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
  await client.query("COMMIT");
}
await client.end();
console.log("migrations up to date");
