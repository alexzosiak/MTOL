"use client";

import styles from "./DeleteVisitorButton.module.css";

export function DeleteVisitorButton({ id }: { id: string }) {
  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this visitor?");
    if (!confirmed) {
        return;
    }
    await fetch(`/api/visitors/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }


  return (
    <button className={styles.button} onClick={handleDelete}>
      Delete
    </button>
  );
}
