import "dotenv/config";
import fs from "node:fs/promises";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();

  const sql = await fs.readFile(
    "database/seeds/001_super_admin.sql",
    "utf-8"
  );

  await client.query(sql);

  console.log("Seed completed successfully");
} catch (error) {
  console.error("Seed failed:", error);
  process.exit(1);
} finally {
  await client.end();
}