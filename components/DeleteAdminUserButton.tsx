"use client";

import styles from "./DeleteAdminUserButton.module.css";

export function DeleteAdminUserButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this visitor?");

if (!confirmed) {
  return;
}
    const res = await fetch(
      `/api/admin/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      window.location.reload();
    }
  }

  return (
    <button className={styles.button} onClick={handleDelete}>
      Delete
    </button>
  );
}
