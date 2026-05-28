import Link from "next/link";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();

  return (
    <div>
      <aside>
        <h2>Admin Panel</h2>

        <nav>
          <Link href="/admin">Visitors</Link>
          <br />

          {admin.role === "SUPER_ADMIN" && (
            <>
              <Link href="/admin/users">Admin Users</Link>
              <br />
            </>
          )}
        </nav>

        <form action="/api/admin/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </aside>

      <section>{children}</section>
    </div>
  );
}