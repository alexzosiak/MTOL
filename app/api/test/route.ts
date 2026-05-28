import { db } from "@/lib/database";

export async function GET() {
  const result = await db.query(
    "SELECT email, role FROM admin_users"
  );

  return Response.json(result.rows);
}

