'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CountryCombobox } from '@/components/CountryCombobox';
import { ErrorMessage } from '@/components/ErrorMessage';

const fieldClass = 'grid gap-2 text-sm font-bold text-[#c7d6e6]';
const inputClass =
    'w-full rounded-[11px] border border-[rgba(144,181,213,0.28)] bg-[rgba(5,16,31,0.74)] px-3.5 py-[13px] text-[#edf6ff] outline-none transition-[border-color,box-shadow,background] duration-[160ms] placeholder:text-[#6f849c] focus:border-[#7fb3e6] focus:bg-[rgba(7,24,45,0.92)] focus:shadow-[0_0_0_4px_rgba(91,142,199,0.18)]';
const actionsClass = 'col-span-full mt-2 flex justify-end gap-2.5';
const primaryButtonClass =
    'cursor-pointer rounded-[10px] border-0 bg-[#9ed8ff] px-[18px] py-3 font-bold text-[#06121f] transition-[background,opacity,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#c8eaff] disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:hover:translate-y-0';
const secondaryButtonClass =
    'cursor-pointer rounded-[10px] border border-[rgba(144,181,213,0.26)] bg-[rgba(144,181,213,0.12)] px-[18px] py-3 font-bold text-[#d9e8f7] transition-[background,opacity,transform] duration-[160ms] hover:-translate-y-px hover:bg-[rgba(144,181,213,0.2)]';
const homeLinkClass =
    'absolute top-10 left-10 z-10 inline-flex items-center gap-2 rounded-[10px] border border-[rgba(144,181,213,0.28)] bg-[rgba(5,15,29,0.78)] px-[11px] py-2 text-[13px] font-bold text-[#cfe8ff] no-underline shadow-[0_10px_34px_rgba(0,0,0,0.22)] backdrop-blur transition-[border-color,background,transform] duration-[160ms] hover:-translate-y-px hover:border-[rgba(158,216,255,0.48)] hover:bg-[rgba(9,29,54,0.88)] max-[620px]:top-5 max-[620px]:left-5';
const reviewItemClass =
    'rounded-[11px] border border-[rgba(144,181,213,0.24)] bg-[rgba(5,16,31,0.62)] p-4';
const reviewLabelClass =
    'm-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[#88a5bf]';
const reviewValueClass =
    'mt-1.5 mb-0 text-[15px] font-bold text-[#edf6ff]';

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
        <main className="register-camo-bg relative isolate grid min-h-screen place-items-center overflow-hidden px-5 py-10 text-[#e7edf2]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(151,199,187,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(151,199,187,0.13)_1px,transparent_1px)] bg-[length:64px_64px] opacity-[0.18] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(180deg,rgba(126,179,230,0.17),transparent)]" />
            <Link href="/" className={homeLinkClass}>
                <span aria-hidden="true">←</span>
                Back to home
            </Link>

            <div className="relative w-[min(100%,760px)] rounded-[22px] border border-[rgba(144,181,213,0.28)] bg-[rgba(5,16,31,0.82)] p-9 text-[#edf6ff] shadow-[0_28px_90px_rgba(0,0,0,0.46)] backdrop-blur-xl max-[620px]:px-5 max-[620px]:py-6">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-[#9ed8ff]">
                    Guest services
                </p>
                <div className="my-[10px] mb-[30px] flex justify-between gap-6 max-[620px]:grid">
                    <div>
                        <h1 className="m-0 text-[clamp(28px,5vw,38px)] tracking-[-0.04em]">
                            Visitor Registration
                        </h1>
                        <p className="mt-2 mb-0 leading-[1.6] text-[#a8bacb]">
                            Complete the details below before your arrival.
                        </p>
                    </div>
                    <div className="grid h-fit flex-none justify-items-end gap-2.5 max-[620px]:justify-items-start">
                        <p className="h-fit w-fit flex-none rounded-full border border-[rgba(158,216,255,0.32)] bg-[rgba(158,216,255,0.12)] px-3 py-2 text-[13px] font-bold text-[#bfe4ff]">
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
                            <p className="mt-2 mb-0 text-sm leading-[1.6] text-[#a8bacb]">
                                Please check the information below before
                                sending your registration.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <section className="rounded-[14px] border border-[rgba(144,181,213,0.24)] bg-[rgba(9,24,45,0.62)] p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[#9ed8ff]">
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

                            <section className="rounded-[14px] border border-[rgba(144,181,213,0.24)] bg-[rgba(9,24,45,0.62)] p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[#9ed8ff]">
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

                            <section className="rounded-[14px] border border-[rgba(144,181,213,0.24)] bg-[rgba(9,24,45,0.62)] p-4">
                                <h3 className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-[#9ed8ff]">
                                    Accommodation notes
                                </h3>
                                <p className="mt-3 mb-0 min-h-10 rounded-[11px] bg-[rgba(5,16,31,0.62)] p-4 text-sm leading-[1.7] text-[#d7e5f2]">
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
