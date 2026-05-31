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

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HTTP ${response.status}: ${body}`);
  }
}

const migrationsDir = join(rootDir, "supabase", "migrations");
const migrationFiles = (await readdir(migrationsDir))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (migrationFiles.length === 0) {
  console.log("No migration files found.");
  process.exit(0);
}

for (const file of migrationFiles) {
  const sql = await readFile(join(migrationsDir, file), "utf8");
  process.stdout.write(`Applying ${file}... `);
  await execSQL(sql);
  console.log("done");
}

console.log("All migrations applied.");
