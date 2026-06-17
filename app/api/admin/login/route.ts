import { cookies } from 'next/headers';
import { authService } from '@/services/auth.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const admin = await authService.login(body);

    const cookieStore = await cookies();

    cookieStore.set('admin_id', admin.id, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return Response.json({
      message: 'Login successful',
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Email and password are required') {
        return Response.json({ error: error.message }, { status: 400 });
      }

      if (error.message === 'Invalid credentials') {
        return Response.json({ error: error.message }, { status: 401 });
      }
    }

    console.error(error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}



// import { db } from '@/lib/database';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';

// export async function POST(request: Request) {
//     const body = await request.json();

//     const { email, password } = body;

//     if (!email || !password) {
//         return Response.json(
//             { error: 'Email and password are required' },
//             { status: 400 },
//         );
//     }

//     const result = await db.query(
//         `
//     SELECT id, email, password_hash, role
//     FROM admin_users
//     WHERE email = $1
//     `,
//         [email],
//     );

//     const admin = result.rows[0];

//     if (!admin) {
//         return Response.json({ error: 'Invalid credentials' }, { status: 401 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

//     if (!isPasswordValid) {
//         return Response.json({ error: 'Invalid credentials' }, { status: 401 });
//     }

//     const cookieStore = await cookies();

//     cookieStore.set('admin_id', admin.id, {
//         httpOnly: true,
//         path: '/',
//         maxAge: 60 * 60,
//     });

//     return Response.json({
//         message: 'Login successful',
//         email: admin.email,
//         role: admin.role,
//     });
// }
