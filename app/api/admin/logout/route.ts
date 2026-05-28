import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("admin_id");

  return Response.json({
    message: "Logout successful",
  });
}