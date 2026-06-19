"use client";

import { useState } from "react";

const fieldClass = "grid gap-2 text-sm font-bold text-[#34405a]";
const inputClass =
  "w-full rounded-[9px] border border-[var(--border)] bg-[#fbfcff] px-[13px] py-3 text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]";

type Visitor = {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  country: string;
  arrival_date: string;
  departure_date: string;
  accommodation_notes: string | null;
};

export function EditVisitorForm({ visitor }: { visitor: Visitor }) {
  const [firstName, setFirstName] = useState(visitor.first_name);
  const [lastName, setLastName] = useState(visitor.last_name);
  const [company, setCompany] = useState(visitor.company);
  const [country, setCountry] = useState(visitor.country);
  const [arrivalDate, setArrivalDate] = useState(new Date(visitor.arrival_date).toISOString().slice(0, 10));
  const [departureDate, setDepartureDate] = useState(new Date(visitor.departure_date).toISOString().slice(0, 10));
  const [accommodationNotes, setAccommodationNotes] = useState(
    visitor.accommodation_notes || ""
  );

  async function handleSave() {
    const res = await fetch(`/api/visitors/${visitor.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        company,
        country,
        arrivalDate,
        departureDate,
        accommodationNotes,
      }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    }
  }

  return (
    <section className="mt-6 grid grid-cols-2 gap-[18px] rounded-[13px] border border-[var(--border)] bg-[var(--surface)] p-[22px] max-[560px]:grid-cols-1 max-[560px]:p-[18px]">
      <label className={fieldClass}>
        <span>First name</span>
        <input
          className={inputClass}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label className={fieldClass}>
        <span>Last name</span>
        <input
          className={inputClass}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label className={fieldClass}>
        <span>Company</span>
        <input
          className={inputClass}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

      <label className={fieldClass}>
        <span>Country</span>
        <input
          className={inputClass}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>

      <label className={fieldClass}>
        <span>Arrival date</span>
        <input
          className={inputClass}
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </label>

      <label className={fieldClass}>
        <span>Departure date</span>
        <input
          className={inputClass}
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </label>

      <label className={`${fieldClass} col-span-full`}>
        <span>Accommodation notes</span>
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          value={accommodationNotes}
          onChange={(e) => setAccommodationNotes(e.target.value)}
        />
      </label>

      <div className="col-span-full flex justify-end">
        <button
          className="cursor-pointer rounded-[9px] border-0 bg-[var(--primary)] px-[17px] py-3 font-bold text-white hover:bg-[var(--primary-dark)]"
          onClick={handleSave}
        >
          Save changes
        </button>
      </div>
    </section>
  );
}
