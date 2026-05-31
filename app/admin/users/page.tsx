import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import { CreateAdminUserForm } from '@/components/CreateAdminUserForm';
import { DeleteAdminUserButton } from '@/components/DeleteAdminUserButton';
import { ChangeAdminRoleSelect } from '@/components/ChangeAdminRoleSelect';
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
                            <th>Actions</th>
                            <th>Change Role</th>
                            <th>Created at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.email}</td>
                                <td>
                                    <span className={styles.role}>
                                        {admin.role}
                                    </span>
                                </td>
                                <td>
                                    <DeleteAdminUserButton id={admin.id} />
                                </td>
                                <td>
                                    {admin.role === 'SUPER_ADMIN' ? (
                                        'SUPER_ADMIN'
                                    ) : (
                                        <ChangeAdminRoleSelect
                                            id={admin.id}
                                            currentRole={admin.role}
                                        />
                                    )}
                                </td>
                                <td>{String(admin.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateAdminUserForm />
        </main>
    );
}
