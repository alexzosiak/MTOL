'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CountryCombobox } from './CountryCombobox';
import { ErrorMessage } from './ErrorMessage';
import { useVisitorFormViewModel } from '@/view-models/visitor-form.view-model';

const fieldClass = 'grid gap-[7px] text-[13px] font-bold text-[#34405a]';
const controlClass =
    'h-[42px] min-w-0 rounded-[9px] border border-[var(--border)] bg-[#fbfcff] px-3 text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]';
const textAreaClass = `${controlClass} h-auto min-h-24 py-3`;

export function CreateVisitorForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const visitorForm = useVisitorFormViewModel();

    function closeForm() {
        if (visitorForm.isSubmitting) return;

        visitorForm.resetForm();
        setIsOpen(false);
    }

    async function handleSubmit() {
        const wasCreated = await visitorForm.submitVisitor();
        if (!wasCreated) return;

        visitorForm.resetForm();
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

                        {visitorForm.error && (
                            <ErrorMessage message={visitorForm.error} />
                        )}

                        <div className="mt-[18px] grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
                            <label className={fieldClass}>
                                <span>First name</span>
                                <input
                                    className={controlClass}
                                    value={visitorForm.formData.firstName}
                                    onChange={(e) =>
                                        visitorForm.updateField(
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
                                    value={visitorForm.formData.lastName}
                                    onChange={(e) =>
                                        visitorForm.updateField(
                                            'lastName',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Last name"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Email</span>
                                <input
                                    className={controlClass}
                                    type="email"
                                    value={visitorForm.formData.email}
                                    onChange={(e) =>
                                        visitorForm.updateField(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="visitor@example.com"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Company</span>
                                <input
                                    className={controlClass}
                                    value={visitorForm.formData.company}
                                    onChange={(e) =>
                                        visitorForm.updateField(
                                            'company',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Company"
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Country</span>
                                <CountryCombobox
                                    key={visitorForm.countryInputKey}
                                    className={controlClass}
                                    value={visitorForm.formData.country}
                                    onChange={(value) =>
                                        visitorForm.updateField(
                                            'country',
                                            value,
                                        )
                                    }
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Arrival date</span>
                                <input
                                    className={controlClass}
                                    type="date"
                                    min={visitorForm.todayInputValue}
                                    value={visitorForm.formData.arrivalDate}
                                    onChange={(e) =>
                                        visitorForm.updateArrivalDate(
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>

                            <label className={fieldClass}>
                                <span>Departure date</span>
                                <input
                                    className={controlClass}
                                    type="date"
                                    disabled={
                                        !visitorForm.formData.arrivalDate
                                    }
                                    min={
                                        visitorForm.formData.arrivalDate ||
                                        visitorForm.todayInputValue
                                    }
                                    value={visitorForm.formData.departureDate}
                                    onChange={(e) =>
                                        visitorForm.updateField(
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
                                    value={
                                        visitorForm.formData.accommodationNotes
                                    }
                                    onChange={(e) =>
                                        visitorForm.updateField(
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
                                    disabled={
                                        !visitorForm.isFormValid() ||
                                        visitorForm.isSubmitting
                                    }
                                    onClick={handleSubmit}
                                    type="button"
                                >
                                    {visitorForm.isSubmitting
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
