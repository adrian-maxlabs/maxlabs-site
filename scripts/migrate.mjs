import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const __dir = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dir, "..");

const { config } = await import("dotenv");
config({ path: join(rootDir, ".env.local") });

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;

if (!ACCESS_TOKEN || !PROJECT_REF) {
  console.error(
    "Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env.local. See .env.local.example.",
  );
  process.exit(1);
}

const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function execSQL(query) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${body}`);
  }

  if (!body) return [];
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

async function ensureMigrationsTable() {
  await execSQL(`
    CREATE TABLE IF NOT EXISTS public._schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getAppliedMigrations() {
  const rows = await execSQL(
    "SELECT filename FROM public._schema_migrations ORDER BY filename;",
  );
  if (!Array.isArray(rows)) return new Set();
  return new Set(rows.map((row) => row.filename));
}

async function recordMigration(filename) {
  await execSQL(
    `INSERT INTO public._schema_migrations (filename) VALUES ('${filename.replace(/'/g, "''")}');`,
  );
}

await ensureMigrationsTable();
const applied = await getAppliedMigrations();

const migrationsDir = join(rootDir, "supabase", "migrations");
const migrationFiles = (await readdir(migrationsDir))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (migrationFiles.length === 0) {
  console.log("No migration files found.");
  process.exit(0);
}

let ran = 0;

for (const file of migrationFiles) {
  if (applied.has(file)) {
    console.log(`Skipping ${file} (already applied)`);
    continue;
  }

  const sql = await readFile(join(migrationsDir, file), "utf8");
  process.stdout.write(`Applying ${file}... `);
  await execSQL(sql);
  await recordMigration(file);
  console.log("done");
  ran++;
}

if (ran === 0) {
  console.log("All migrations already applied.");
} else {
  console.log(`Applied ${ran} migration(s).`);
}
