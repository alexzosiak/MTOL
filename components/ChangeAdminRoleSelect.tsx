"use client";

import styles from "./ChangeAdminRoleSelect.module.css";

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
      className={styles.select}
      defaultValue={currentRole}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="VIEWER">VIEWER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
}
