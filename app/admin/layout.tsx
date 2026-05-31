import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <p className={styles.eyebrow}>Workspace</p>
        <h2>Admin Panel</h2>
        <p className={styles.adminEmail}>{admin.email}</p>

        <nav className={styles.nav}>
          <Link href="/admin">Visitors</Link>
          <Link href="/admin/statistics">Statistics</Link>

          {admin.role === "SUPER_ADMIN" && (
            <Link href="/admin/users">Admin Users</Link>
          )}
        </nav>

        <form
          className={styles.logoutForm}
          action="/api/admin/logout"
          method="POST"
        >
          <button type="submit">Logout</button>
        </form>
      </aside>

      <section className={styles.content}>{children}</section>
    </div>
  );
}
