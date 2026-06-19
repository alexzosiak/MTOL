'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CountryCombobox } from '@/components/CountryCombobox';
import { ErrorMessage } from '@/components/ErrorMessage';

const fieldClass = 'grid gap-2 text-sm font-bold text-[#34405a]';
const inputClass =
    'w-full rounded-[11px] border border-[var(--border)] bg-[#fbfcff] px-3.5 py-[13px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow] duration-[160ms] focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]';
const actionsClass = 'col-span-full mt-2 flex justify-end gap-2.5';
const primaryButtonClass =
    'cursor-pointer rounded-[10px] border-0 bg-[var(--primary)] px-[18px] py-3 font-bold text-white transition-[background,opacity,transform] duration-[160ms] hover:-translate-y-px hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:hover:translate-y-0';
const secondaryButtonClass =
    'cursor-pointer rounded-[10px] border-0 bg-[#eef1f7] px-[18px] py-3 font-bold text-[#34405a] transition-[background,opacity,transform] duration-[160ms] hover:-translate-y-px';
const homeLinkClass =
    'absolute top-10 left-10 inline-flex items-center gap-2 rounded-[10px] border border-[rgba(49,87,213,0.18)] bg-[#f8faff] px-[11px] py-2 text-[13px] font-bold text-[var(--primary)] no-underline shadow-[0_10px_28px_rgba(42,58,92,0.08)] transition-[border-color,background,transform] duration-[160ms] hover:-translate-y-px hover:border-[rgba(49,87,213,0.35)] hover:bg-[#edf1ff] max-[620px]:bottom-5 max-[620px]:left-5';
const reviewItemClass =
    'rounded-[11px] border border-[var(--border)] bg-[#fbfcff] p-4';
const reviewLabelClass =
    'm-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]';
const reviewValueClass =
    'mt-1.5 mb-0 text-[15px] font-bold text-[var(--foreground)]';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    arrivalDate: string;
    departureDate: string;
    accommodationNotes: string;
};

export default function Home() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        country: '',
        arrivalDate: '',
        departureDate: '',
        accommodationNotes: '',
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
        const res = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error);
            return;
        }

        const data = await res.json();
        if (res.ok) {
            setIsSubmitted(true);
        }
        console.log(data);
    }

    if (isSubmitted) {
        return (
            <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_78%_28%,rgba(114,181,163,0.12),transparent_28%),#071013] p-7 text-[#e7edf2]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(151,199,187,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(151,199,187,0.14)_1px,transparent_1px)] bg-[length:64px_64px] opacity-[0.36] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
                <section className="relative w-[min(100%,660px)] border border-[rgba(183,211,204,0.3)] bg-[rgba(8,21,23,0.92)] p-[clamp(28px,6vw,58px)] shadow-[0_22px_70px_rgba(0,0,0,0.28)] before:absolute before:left-[-1px] before:top-[-1px] before:h-[18px] before:w-[18px] before:border-l-2 before:border-t-2 before:border-[#b0e2d2] before:content-[''] after:absolute after:bottom-[-1px] after:right-[-1px] after:h-[18px] after:w-[18px] after:border-b-2 after:border-r-2 after:border-[#b0e2d2] after:content-['']">
                    <p className="m-0 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a8d6c8] [font-family:var(--font-geist-mono),monospace]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#8de1ba] shadow-[0_0_16px_#8de1ba]" />
                        Transmission confirmed
                    </p>
                    <p className="mt-[38px] text-[10px] font-bold uppercase tracking-[0.16em] text-[#738b87] [font-family:var(--font-geist-mono),monospace]">
                        REG / LDN / 2026
                    </p>

                    <h1 className="mt-3 max-w-[520px] text-[clamp(42px,8vw,72px)] uppercase leading-[0.96] tracking-[-0.075em] text-[#f1f5f3]">
                        Registration submitted
                    </h1>
                    <p className="mt-[22px] max-w-[510px] text-[15px] leading-[1.75] text-[#a9bab7]">
                        Thank you. Your registration has been successfully sent.
                        Event access details will be provided separately.
                    </p>

                    <Link
                        className="mt-8 inline-flex items-center gap-[22px] bg-[#b0e2d2] px-[18px] py-[15px] text-xs font-bold uppercase tracking-[0.12em] text-[#081310] no-underline transition-colors duration-[180ms] hover:bg-[#dcfff3] [font-family:var(--font-geist-mono),monospace]"
                        href="/"
                    >
                        Back to event page
                        <span aria-hidden="true">→</span>
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="relative grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(49,87,213,0.16),transparent_34%),var(--background)] px-5 py-10">
            <Link href="/" className={homeLinkClass}>
                <span aria-hidden="true">←</span>
                Back to home
            </Link>

            <div className="w-[min(100%,760px)] rounded-[22px] border border-[rgba(223,229,239,0.9)] bg-[var(--surface)] p-9 shadow-[var(--shadow)] max-[620px]:px-5 max-[620px]:py-6">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                    Guest services
                </p>
                <div className="my-[10px] mb-[30px] flex justify-between gap-6 max-[620px]:grid">
                    <div>
                        <h1 className="m-0 text-[clamp(28px,5vw,38px)] tracking-[-0.04em]">
                            Visitor Registration
                        </h1>
                        <p className="mt-2 mb-0 leading-[1.6] text-[var(--muted)]">
                            Complete the details below before your arrival.
                        </p>
                    </div>
                    <div className="grid h-fit flex-none justify-items-end gap-2.5 max-[620px]:justify-items-start">
                        <p className="h-fit w-fit flex-none rounded-full bg-[#edf1ff] px-3 py-2 text-[13px] font-bold text-[var(--primary)]">
                            Step {step} of 3
                        </p>
                    </div>
                </div>

                {step === 1 && (
                    <section className="grid grid-cols-2 gap-[18px] max-[620px]:grid-cols-1">
                        <label className={fieldClass}>
                            <span>First name</span>
                            <input
                                className={inputClass}
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={(e) =>
                                    updateField('firstName', e.target.value)
                                }
                            />
                        </label>

                        <label className={fieldClass}>
                            <span>Last name</span>
                            <input
                                className={inputClass}
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={(e) =>
                                    updateField('lastName', e.target.value)
                                }
                            />
                        </label>

                        <label className={fieldClass}>
                            <span>Email</span>

                            <input
                                type="email"
                                className={inputClass}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) =>
                                    updateField('email', e.target.value)
                                }
                                required
                            />
                        </label>

                        <label className={fieldClass}>
                            <span>Company</span>
                            <input
                                className={inputClass}
                                placeholder="Enter your company"
                                value={formData.company}
                                onChange={(e) =>
                                    updateField('company', e.target.value)
                                }
                            />
                        </label>

                        <label className={fieldClass}>
                            <span>Country</span>
                            <CountryCombobox
                                className={inputClass}
                                value={formData.country}
                                onChange={(value) =>
                                    updateField('country', value)
                                }
                            />
                        </label>

                        <div className={actionsClass}>
                            <button
                                className={primaryButtonClass}
                                disabled={!isStepOneValid()}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section className="grid grid-cols-2 gap-[18px] max-[620px]:grid-cols-1">
                        <label className={fieldClass}>
                            <span>Arrival date</span>
                            <input
                                className={inputClass}
                                type="date"
                                value={formData.arrivalDate}
                                onChange={(e) =>
                                    updateField('arrivalDate', e.target.value)
                                }
                            />
                        </label>

                        <label className={fieldClass}>
                            <span>Departure date</span>
                            <input
                                className={inputClass}
                                type="date"
                                value={formData.departureDate}
                                onChange={(e) =>
                                    updateField('departureDate', e.target.value)
                                }
                            />
                        </label>

                        <label className={`${fieldClass} col-span-full`}>
                            <span>Accommodation notes</span>
                            <textarea
                                className={`${inputClass} min-h-28 resize-y`}
                                placeholder="Add any useful notes"
                                value={formData.accommodationNotes}
                                onChange={(e) =>
                                    updateField(
                                        'accommodationNotes',
                                        e.target.value,
                                    )
                                }
                            />
                        </label>

                        <div className={actionsClass}>
                            <button
                                className={secondaryButtonClass}
                                onClick={backStep}
                            >
                                Back
                            </button>

                            <button
                                className={primaryButtonClass}
                                disabled={!isStepTwoValid()}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <div className="mb-5">
                            <h2 className="m-0 text-2xl tracking-[-0.04em]">
                                Review your details
                            </h2>
                            <p className="mt-2 mb-0 text-sm leading-[1.6] text-[var(--muted)]">
                                Please check the information below before
                                sending your registration.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <section className="rounded-[14px] border border-[var(--border)] bg-white p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                                    Guest
                                </h3>
                                <div className="mt-3 grid grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Full name
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.firstName}{' '}
                                            {formData.lastName}
                                        </p>
                                    </div>
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Company
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.company}
                                        </p>
                                    </div>
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Email
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.email}
                                        </p>
                                    </div>
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Country
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.country}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-[14px] border border-[var(--border)] bg-white p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                                    Travel
                                </h3>
                                <div className="mt-3 grid grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Arrival
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.arrivalDate}
                                        </p>
                                    </div>
                                    <div className={reviewItemClass}>
                                        <p className={reviewLabelClass}>
                                            Departure
                                        </p>
                                        <p className={reviewValueClass}>
                                            {formData.departureDate}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-[14px] border border-[var(--border)] bg-white p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                                    Accommodation notes
                                </h3>
                                <p className="mt-3 mb-0 min-h-10 rounded-[11px] bg-[#fbfcff] p-4 text-sm leading-[1.7] text-[#34405a]">
                                    {formData.accommodationNotes ||
                                        'No notes added.'}
                                </p>
                            </section>
                        </div>

                        <div className={actionsClass}>
                            <button
                                className={secondaryButtonClass}
                                onClick={backStep}
                            >
                                Back
                            </button>
                            <ErrorMessage message={error} />
                            <button
                                className={primaryButtonClass}
                                onClick={submitForm}
                            >
                                Approve and submit
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
