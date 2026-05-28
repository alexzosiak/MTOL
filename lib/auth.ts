import { db } from '@/lib/database';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAdminSession() {
    const cookieStore = await cookies();
    const adminId = cookieStore.get('admin_id');

    if (!adminId) {
        redirect('/admin/login');
    }

    const adminResult = await db.query(
        `
    SELECT id, email, role
    FROM admin_users
    WHERE id = $1
    `,
        [adminId.value],
    );

    const admin = adminResult.rows[0];

    if (!admin) {
        redirect('/admin/login');
    }

    return admin;
}

export async function requireRole(
  roles: string[]
) {
  const admin = await getAdminSession();

  if (!roles.includes(admin.role)) {
    redirect("/admin/login");
  }

  return admin;
}