"use client";

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
    <button
      className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-bold text-[#b42334] hover:text-[#851b29] hover:underline"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
