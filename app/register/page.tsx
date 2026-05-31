"use client";

import { useState } from "react";
import styles from "./page.module.css";

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  accommodationNotes: string;
};

export default function Home() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    arrivalDate: "",
    departureDate: "",
    accommodationNotes: "",
  });

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function isStepOneValid() {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.company &&
      formData.country
    );
  }

  function isStepTwoValid() {
    return formData.arrivalDate && formData.departureDate;
  }

  function nextStep() {
    if (step === 1 && !isStepOneValid()) return;
    if (step === 2 && !isStepTwoValid()) return;

    setStep((prev) => prev + 1);
  }

  function backStep() {
    setStep((prev) => prev - 1);
  }

  async function submitForm() {
    const res = await fetch("/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Guest services</p>
        <div className={styles.headingRow}>
          <div>
            <h1 className={styles.title}>Visitor Registration</h1>
            <p className={styles.subtitle}>
              Complete the details below before your arrival.
            </p>
          </div>
          <p className={styles.step}>Step {step} of 3</p>
        </div>

        {step === 1 && (
          <section className={styles.form}>
            <label className={styles.field}>
              <span>First name</span>
              <input
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Last name</span>
              <input
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Company</span>
              <input
                placeholder="Enter your company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Country</span>
              <input
                placeholder="Enter your country"
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </label>

            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                disabled={!isStepOneValid()}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className={styles.form}>
            <label className={styles.field}>
              <span>Arrival date</span>
              <input
                type="date"
                value={formData.arrivalDate}
                onChange={(e) => updateField("arrivalDate", e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Departure date</span>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => updateField("departureDate", e.target.value)}
              />
            </label>

            <label className={`${styles.field} ${styles.fullWidth}`}>
              <span>Accommodation notes</span>
              <textarea
                placeholder="Add any useful notes"
                value={formData.accommodationNotes}
                onChange={(e) =>
                  updateField("accommodationNotes", e.target.value)
                }
              />
            </label>

            <div className={styles.actions}>
              <button className={styles.secondaryButton} onClick={backStep}>
                Back
              </button>

              <button
                className={styles.primaryButton}
                disabled={!isStepTwoValid()}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className={styles.review}>
            <h2>Review your details</h2>

            <pre>{JSON.stringify(formData, null, 2)}</pre>

            <div className={styles.actions}>
              <button className={styles.secondaryButton} onClick={backStep}>
                Back
              </button>
              <button className={styles.primaryButton} onClick={submitForm}>
                Approve and submit
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
