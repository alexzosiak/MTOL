"use client";

import { useState } from "react";

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
    <main>
      <h1>Visitor Registration</h1>

      <p>Step {step} of 3</p>

      {step === 1 && (
        <section>
          <input
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />

          <input
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />

          <input
            placeholder="Company"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
          />

          <input
            placeholder="Country"
            value={formData.country}
            onChange={(e) => updateField("country", e.target.value)}
          />

          <button disabled={!isStepOneValid()} onClick={nextStep}>
            Next
          </button>
        </section>
      )}

      {step === 2 && (
        <section>
          <input
            type="date"
            value={formData.arrivalDate}
            onChange={(e) => updateField("arrivalDate", e.target.value)}
          />

          <input
            type="date"
            value={formData.departureDate}
            onChange={(e) => updateField("departureDate", e.target.value)}
          />

          <textarea
            placeholder="Accommodation notes"
            value={formData.accommodationNotes}
            onChange={(e) =>
              updateField("accommodationNotes", e.target.value)
            }
          />

          <button onClick={backStep}>Back</button>

          <button disabled={!isStepTwoValid()} onClick={nextStep}>
            Next
          </button>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2>Review</h2>

          <pre>{JSON.stringify(formData, null, 2)}</pre>

          <button onClick={backStep}>Back</button>
          <button onClick={submitForm}>Approve and submit</button>
        </section>
      )}
    </main>
  );
}