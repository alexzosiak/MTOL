import { getAdminSession } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();

  return (
    <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)] max-[760px]:grid-cols-1">
      <aside className="flex flex-col bg-[#18223a] px-[22px] py-[30px] text-[#dfe6ff] max-[760px]:p-5">
        <p className="m-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[#91a8ff]">
          Workspace
        </p>
        <h2 className="mb-1 mt-2 text-2xl tracking-[-0.04em] text-white">
          Admin Panel
        </h2>
        <p className="m-0 overflow-hidden text-ellipsis text-[13px] text-[#aeb9d7]">
          {admin.email}
        </p>

        <AdminNav role={admin.role} />

        <form
          className="mt-auto max-[760px]:mt-[18px]"
          action="/api/admin/logout"
          method="POST"
        >
          <button
            className="w-full cursor-pointer rounded-[9px] border border-[rgba(255,255,255,0.18)] bg-transparent px-3 py-[11px] font-bold text-[#e6ebff] hover:bg-[rgba(255,255,255,0.08)]"
            type="submit"
          >
            Logout
          </button>
        </form>
      </aside>

      <section className="min-w-0 p-[38px] max-[760px]:px-[18px] max-[760px]:py-6">
        {children}
      </section>
    </div>
  );
}
