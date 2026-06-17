import { requireRole } from '@/lib/auth';
import { adminService } from '@/services/admin.service';

export async function POST(request: Request) {
  await requireRole(['SUPER_ADMIN']);

  try {
    const body = await request.json();

    const admin = await adminService.createAdmin(body);

    return Response.json(admin);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === 'Email, password and role are required' ||
        error.message === 'Invalid role'
      ) {
        return Response.json({ error: error.message }, { status: 400 });
      }
    }

    console.error(error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}



// import { db } from "@/lib/database";
// import { requireRole } from "@/lib/auth";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   const admin = await requireRole(["SUPER_ADMIN"]);

//   const body = await request.json();

//   const { email, password, role } = body;

//   if (!email || !password || !role) {
//     return Response.json(
//       { error: "Email, password and role are required" },
//       { status: 400 }
//     );
//   }

//   if (!["ADMIN", "VIEWER"].includes(role)) {
//     return Response.json(
//       { error: "Invalid role" },
//       { status: 400 }
//     );
//   }

//   const passwordHash = await bcrypt.hash(password, 10);

//   try {
//     const result = await db.query(
//       `
//       INSERT INTO admin_users (
//         id,
//         email,
//         password_hash,
//         role
//       )
//       VALUES (
//         gen_random_uuid(),
//         $1, $2, $3
//       )
//       RETURNING id, email, role, created_at
//       `,
//       [email, passwordHash, role]
//     );

//     return Response.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }