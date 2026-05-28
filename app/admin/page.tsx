import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';

type AdminPageProps = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
    await requireRole(["SUPER_ADMIN", "ADMIN"]);

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
        <main>
            <h1>Admin Visitors</h1>

            <form>
                <input
                    name="search"
                    placeholder="Search by full name"
                    defaultValue={search}
                />

                <button type="submit">Search</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Submitted at</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            <form action="/api/admin/logout" method="POST">
            <button type="submit">Logout</button>
            </form>
        </main>
    );
}
