import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import { DeleteVisitorButton } from '@/components/DeleteVisitorButton';
import Link from 'next/link';
import styles from './page.module.css';

type AdminPageProps = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'VIEWER']);

    const params = await searchParams;
    const search = params.search || '';

    const result = await db.query(
        `
    SELECT
      id,
      first_name,
      last_name,
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
        <main className={styles.page}>
            <div className={styles.headingRow}>
                <div>
                    <p className={styles.eyebrow}>Directory</p>
                    <h1>Admin Visitors</h1>
                </div>
                <Link
                    className={styles.statisticsLink}
                    href="/admin/statistics"
                >
                    View statistics
                </Link>
            </div>

            <form className={styles.searchForm}>
                <input
                    name="search"
                    placeholder="Search by full name"
                    defaultValue={search}
                />

                <button type="submit">Search</button>
            </form>

            <div className={styles.tableWrap}>
                <table>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Submitted at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {visitors.map((visitor) => (
                            <tr key={visitor.id}>
                                <td>
                                    {visitor.first_name} {visitor.last_name}
                                </td>
                                <td>{visitor.country}</td>
                                <td>{visitor.company}</td>
                                <td>{String(visitor.created_at)}</td>
                                <td>
                                    <Link
                                        className={styles.editLink}
                                        href={`/admin/visitors/${visitor.id}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <span className={styles.actionSeparator}>|</span>
                                    <DeleteVisitorButton id={visitor.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
