"use client";

export function ChangeAdminRoleSelect({
  id,
  currentRole,
}: {
  id: string;
  currentRole: string;
}) {
  async function handleChange(role: string) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      window.location.reload();
    }
  }

  return (
    <select
      className="cursor-pointer rounded-lg border border-[var(--border)] bg-[#fbfcff] py-2 pr-7 pl-2.5 text-xs font-bold text-[#34405a] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(49,87,213,0.12)]"
      defaultValue={currentRole}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="VIEWER">VIEWER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
}
