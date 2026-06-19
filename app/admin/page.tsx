import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import { DeleteVisitorButton } from '@/components/DeleteVisitorButton';
import Link from 'next/link';

const tableCellClass =
    'whitespace-nowrap border-b border-[var(--border)] px-4 py-[15px] text-sm';
const tableHeadClass =
    'whitespace-nowrap border-b border-[var(--border)] bg-[#f9fbfe] px-4 py-[15px] text-left text-xs uppercase tracking-[0.07em] text-[var(--muted)]';

type AdminPageProps = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
    const admin = await requireRole(['SUPER_ADMIN', 'ADMIN', 'VIEWER']);

    const params = await searchParams;
    const search = params.search || '';

    const result = await db.query(
        `
    SELECT
      id,
      first_name,
      last_name,
      email,
      company,
      country,
      created_at
    FROM visitors
    WHERE CONCAT(first_name, ' ', last_name) ILIKE $1
    ORDER BY created_at DESC
    `,
        [`%${search}%`],
    );

    const visitors = result.rows;

    return (
        <main>
            <div className="flex items-center justify-between gap-5">
                <div>
                    <p className="mb-[7px] mt-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                        Directory
                    </p>
                    <h1 className="m-0 tracking-[-0.04em]">Admin Visitors</h1>
                </div>
                <Link
                    className="rounded-[9px] bg-[var(--primary)] px-3.5 py-[11px] text-sm font-bold text-white no-underline hover:bg-[var(--primary-dark)]"
                    href="/admin/statistics"
                >
                    View statistics
                </Link>
            </div>

            <form className="my-7 mb-5 flex max-w-[560px] gap-[9px]">
                

                <input
                    className="min-w-0 flex-1 rounded-[9px] border border-[var(--border)] px-[13px] py-3 outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]"
                    name="search"
                    placeholder="Search by full name"
                    defaultValue={search}
                />

                <button
                    className="cursor-pointer rounded-[9px] border-0 bg-[var(--primary)] px-[17px] text-sm font-bold text-white hover:bg-[var(--primary-dark)]"
                    type="submit"
                >
                    Search
                </button>
            </form>

            <div className="overflow-x-auto rounded-[13px] border border-[var(--border)] bg-[var(--surface)]">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th className={tableHeadClass}>Full name</th>
                            <th className={tableHeadClass}>Email</th>
                            <th className={tableHeadClass}>Country</th>
                            <th className={tableHeadClass}>Company</th>
                            <th className={tableHeadClass}>Submitted at</th>
                            {admin.role !== 'VIEWER' && (
                                <th className={tableHeadClass}>Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {visitors.map((visitor) => (
                            <tr
                                className="[&:last-child>td]:border-b-0"
                                key={visitor.id}
                            >
                                <td className={tableCellClass}>
                                    {visitor.first_name} {visitor.last_name}
                                </td>
                                <td className={tableCellClass}>
                                    {visitor.email}
                                </td>
                                <td className={tableCellClass}>
                                    {visitor.country}
                                </td>
                                <td className={tableCellClass}>
                                    {visitor.company}
                                </td>
                                <td className={tableCellClass}>
                                    {String(visitor.created_at)}
                                </td>

                                {admin.role !== 'VIEWER' && (
                                    <td className={tableCellClass}>
                                        <a
                                            className="text-[13px] font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)] hover:underline"
                                            href={`/admin/visitors/${visitor.id}/edit`}
                                        >
                                            Edit
                                        </a>

                                        <span className="mx-2 text-[var(--border)]">
                                            |
                                        </span>

                                        <DeleteVisitorButton id={visitor.id} />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
