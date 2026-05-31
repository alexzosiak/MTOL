import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import styles from './page.module.css';

export default async function AdminUsersPage() {
    await requireRole(['SUPER_ADMIN']);

    const result = await db.query(`
    SELECT id, email, role, created_at
    FROM admin_users
    ORDER BY created_at DESC
  `);

    const admins = result.rows;

    return (
        <main className={styles.page}>
            <p className={styles.eyebrow}>Access control</p>
            <h1>Admin Users</h1>

            <div className={styles.tableWrap}>
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
                                <td>
                                    <span className={styles.role}>{admin.role}</span>
                                </td>
                                <td>{String(admin.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
