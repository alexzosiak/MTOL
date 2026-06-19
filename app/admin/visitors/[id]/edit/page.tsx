import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import { EditVisitorForm } from "@/components/EditVisitorForm";
import Link from "next/link";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditVisitorPage({ params }: PageProps) {
    await requireRole(['SUPER_ADMIN', 'ADMIN']);

    const { id } = await params;

    const result = await db.query(
        `
    SELECT *
    FROM visitors
    WHERE id = $1
    `,
        [id],
    );

    const visitor = result.rows[0];

    if (!visitor) {
        return (
            <main>
                <p className="mb-[7px] mt-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Visitor details
                </p>
                <h1 className="m-0 tracking-[-0.04em]">Visitor not found</h1>
                <Link
                    className="mt-[18px] inline-block text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)] hover:underline"
                    href="/admin"
                >
                    Back to visitors
                </Link>
            </main>
        );
    }

    return (
        <main>
            <p className="mb-[7px] mt-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                Visitor details
            </p>
            <div className="flex items-center justify-between gap-[18px]">
                <h1 className="m-0 tracking-[-0.04em]">Edit Visitor</h1>
                <Link
                    className="inline-block text-sm font-bold text-[var(--primary)] no-underline hover:text-[var(--primary-dark)] hover:underline"
                    href="/admin"
                >
                    Back to visitors
                </Link>
            </div>

            <EditVisitorForm visitor={visitor} />
        </main>
    );
}
