import { db } from "@/lib/database";
import { requireRole } from "@/lib/auth";

export default async function AdminUsersPage() {
  await requireRole(["SUPER_ADMIN"]);

  const result = await db.query(`
    SELECT id, email, role, created_at
    FROM admin_users
    ORDER BY created_at DESC
  `);

  const admins = result.rows;

  

  return (
    <main>
      <h1>Admin Users</h1>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Created at</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>{String(admin.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}