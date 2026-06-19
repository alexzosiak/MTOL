"use client";

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
    <button
      className="cursor-pointer rounded-lg border border-[#f0c9ce] bg-[#fff8f8] px-2.5 py-[7px] text-xs font-bold text-[#b42334] hover:border-[#e7aeb6] hover:bg-[#fff0f1]"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
