import { requireRole } from '@/lib/auth';
import { CreateAdminUserForm } from '@/components/CreateAdminUserForm';
import { DeleteAdminUserButton } from '@/components/DeleteAdminUserButton';
import { ChangeAdminRoleSelect } from '@/components/ChangeAdminRoleSelect';
import { getAdminUsersViewModel } from '@/view-models/admin-users.view-model';

const tableCellClass =
    'whitespace-nowrap border-b border-[var(--border)] px-4 py-[15px] text-sm';
const tableHeadClass =
    'whitespace-nowrap border-b border-[var(--border)] bg-[#f9fbfe] px-4 py-[15px] text-left text-xs uppercase tracking-[0.07em] text-[var(--muted)]';

export default async function AdminUsersPage() {
    await requireRole(['SUPER_ADMIN']);

    const admins = await getAdminUsersViewModel();

    return (
        <main>
            <p className="mb-[7px] mt-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                Access control
            </p>
            <h1 className="m-0 tracking-[-0.04em]">Admin Users</h1>

            <div className="mt-7 overflow-x-auto rounded-[13px] border border-[var(--border)] bg-[var(--surface)]">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th className={tableHeadClass}>Email</th>
                            <th className={tableHeadClass}>Role</th>
                            <th className={tableHeadClass}>Actions</th>
                            <th className={tableHeadClass}>Change Role</th>
                            <th className={tableHeadClass}>Created at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((admin) => (
                            <tr
                                className="[&:last-child>td]:border-b-0"
                                key={admin.id}
                            >
                                <td className={tableCellClass}>
                                    {admin.email}
                                </td>
                                <td className={tableCellClass}>
                                    <span className="inline-block rounded-full bg-[#edf1ff] px-2 py-[5px] text-[11px] font-bold text-[var(--primary)]">
                                        {admin.role}
                                    </span>
                                </td>
                                <td className={tableCellClass}>
                                    <DeleteAdminUserButton id={admin.id} />
                                </td>
                                <td className={tableCellClass}>
                                    {admin.role === 'SUPER_ADMIN' ? (
                                        'SUPER_ADMIN'
                                    ) : (
                                        <ChangeAdminRoleSelect
                                            id={admin.id}
                                            currentRole={admin.role}
                                        />
                                    )}
                                </td>
                                <td className={tableCellClass}>
                                    {admin.createdAt}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateAdminUserForm />
        </main>
    );
}
