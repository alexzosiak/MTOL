import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';
import { EditVisitorForm } from "@/components/EditVisitorForm";
import Link from "next/link";
import styles from "./page.module.css";

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
            <main className={styles.page}>
                <p className={styles.eyebrow}>Visitor details</p>
                <h1>Visitor not found</h1>
                <Link className={styles.backLink} href="/admin">
                    Back to visitors
                </Link>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <p className={styles.eyebrow}>Visitor details</p>
            <div className={styles.headingRow}>
                <h1>Edit Visitor</h1>
                <Link className={styles.backLink} href="/admin">
                    Back to visitors
                </Link>
            </div>

            <EditVisitorForm visitor={visitor} />
        </main>
    );
}
