'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CountryCombobox } from './CountryCombobox';
import { ErrorMessage } from './ErrorMessage';

const fieldClass = 'grid gap-[7px] text-[13px] font-bold text-[#34405a]';
const controlClass =
    'h-[42px] min-w-0 rounded-[9px] border border-[var(--border)] bg-[#fbfcff] px-3 text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]';
const textAreaClass = `${controlClass} h-auto min-h-24 py-3`;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    arrivalDate: '',
    departureDate: '',
    accommodationNotes: '',
};

function getTodayInputValue() {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;

    return new Date(today.getTime() - timezoneOffset)
        .toISOString()
        .slice(0, 10);
}

export function CreateVisitorForm() {
    const router = useRouter();
    const todayInputValue = getTodayInputValue();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [countryInputKey, setCountryInputKey] = useState(0);

    function updateField(field: keyof FormData, value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function updateArrivalDate(value: string) {
        setFormData((prev) => ({
            ...prev,
            arrivalDate: value,
            departureDate:
                prev.departureDate && prev.departureDate < value
                    ? ''
                    : prev.departureDate,
        }));
    }

    function isFormValid() {
        return (
            formData.firstName.trim().length >= 2 &&
            formData.lastName.trim().length >= 2 &&
            emailRegex.test(formData.email.trim()) &&
            formData.company.trim().length >= 2 &&
            formData.country.trim().length >= 2 &&
            formData.arrivalDate >= todayInputValue &&
            formData.departureDate >= formData.arrivalDate
        );
    }

    function resetForm() {
        setFormData(initialFormData);
        setCountryInputKey((prev) => prev + 1);
        setError('');
    }

    function closeForm() {
        if (isSubmitting) return;

        resetForm();
        setIsOpen(false);
    }

    async function handleSubmit() {
        if (!isFormValid() || isSubmitting) return;

        setError('');
        setIsSubmitting(true);

        const res = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setIsSubmitting(false);

        if (!res.ok) {
            setError(data.error || 'Something went wrong');
            return;
        }

        resetForm();
        setIsOpen(false);
        router.refresh();
    }

    return (
        <>
            <button
                className="mt-6 cursor-pointer rounded-[9px] border-0 bg-[var(--primary)] px-[17px] py-3 text-sm font-bold text-white hover:bg-[var(--primary-dark)]"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                Add visitor
            </button>

            {isOpen && (
                <div
                    aria-modal="true"
                    className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[rgba(8,13,26,0.58)] p-5 backdrop-blur-sm"
                    role="dialog"
                >
                    <section className="w-[min(100%,820px)] rounded-[13px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_28px_80px_rgba(20,30,55,0.28)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="m-0 text-lg tracking-[-0.03em]">
                                    Add Visitor
                                </h2>
                                <p className="mt-1.5 mb-0 text-sm leading-[1.5] text-[var(--muted)]">
                                    Create a visitor registration with the same
                                    rules as the public registration form.
                                </p>
                            </div>

                            <button
                                aria-label="Close"
                                className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-[9px] border border-[var(--border)] bg-[#fbfcff] text-lg font-bold text-[var(--muted)] hover:bg-[#eef1f7] hover:text-[var(--foreground)]"
                                onClick={closeForm}
                                type="button"
                            >
                                ×
                            </button>
                        </div>

                        {error && <ErrorMessage message={error} />}

                        <div className="mt-[18px] grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
                            <label className={fieldClass}>
                                <span>First name</span>
                                <input
                                    className={controlClass}
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        updateField(
                                            'firstName',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="First name"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Last name</span>
                                <input
                                    className={controlClass}
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        updateField('lastName', e.target.value)
                                    }
                                    placeholder="Last name"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Email</span>
                                <input
                                    className={controlClass}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        updateField('email', e.target.value)
                                    }
                                    placeholder="visitor@example.com"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Company</span>
                                <input
                                    className={controlClass}
                                    value={formData.company}
                                    onChange={(e) =>
                                        updateField('company', e.target.value)
                                    }
                                    placeholder="Company"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Country</span>
                                <CountryCombobox
                                    key={countryInputKey}
                                    className={controlClass}
                                    value={formData.country}
                                    onChange={(value) =>
                                        updateField('country', value)
                                    }
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Arrival date</span>
                                <input
                                    className={controlClass}
                                    type="date"
                                    min={todayInputValue}
                                    value={formData.arrivalDate}
                                    onChange={(e) =>
                                        updateArrivalDate(e.target.value)
                                    }
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Departure date</span>
                                <input
                                    className={controlClass}
                                    type="date"
                                    disabled={!formData.arrivalDate}
                                    min={
                                        formData.arrivalDate || todayInputValue
                                    }
                                    value={formData.departureDate}
                                    onChange={(e) =>
                                        updateField(
                                            'departureDate',
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>

                            <label className={`${fieldClass} col-span-full`}>
                                <span>Accommodation notes</span>
                                <textarea
                                    className={textAreaClass}
                                    value={formData.accommodationNotes}
                                    onChange={(e) =>
                                        updateField(
                                            'accommodationNotes',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Optional notes"
                                />
                            </label>

                            <div className="col-span-full flex justify-end gap-2.5">
                                <button
                                    className="h-[42px] cursor-pointer rounded-[9px] border border-[var(--border)] bg-[#eef1f7] px-[17px] font-bold text-[#34405a] hover:bg-[#e3e8f2]"
                                    onClick={closeForm}
                                    type="button"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="h-[42px] cursor-pointer rounded-[9px] border-0 bg-[var(--primary)] px-[17px] font-bold text-white hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={!isFormValid() || isSubmitting}
                                    onClick={handleSubmit}
                                    type="button"
                                >
                                    {isSubmitting
                                        ? 'Creating...'
                                        : 'Create visitor'}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
