"use client";

import { useState } from "react";
import styles from "./EditVisitorForm.module.css";

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
    <section className={styles.form}>
      <label className={styles.field}>
        <span>First name</span>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span>Last name</span>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span>Company</span>
        <input value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>

      <label className={styles.field}>
        <span>Country</span>
        <input value={country} onChange={(e) => setCountry(e.target.value)} />
      </label>

      <label className={styles.field}>
        <span>Arrival date</span>
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span>Departure date</span>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </label>

      <label className={`${styles.field} ${styles.fullWidth}`}>
        <span>Accommodation notes</span>
        <textarea
          value={accommodationNotes}
          onChange={(e) => setAccommodationNotes(e.target.value)}
        />
      </label>

      <div className={styles.actions}>
        <button onClick={handleSave}>Save changes</button>
      </div>
    </section>
  );
}
