'use client';

import { useState } from 'react';
import {
    initialVisitorFormData,
    type VisitorFormData,
} from '@/models/visitor';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTodayInputValue() {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;

    return new Date(today.getTime() - timezoneOffset)
        .toISOString()
        .slice(0, 10);
}

export function useVisitorFormViewModel() {
    const todayInputValue = getTodayInputValue();
    const [formData, setFormData] = useState<VisitorFormData>(
        initialVisitorFormData,
    );
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryInputKey, setCountryInputKey] = useState(0);

    function updateField(field: keyof VisitorFormData, value: string) {
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

    function isStepOneValid() {
        return (
            formData.firstName.trim().length >= 2 &&
            formData.lastName.trim().length >= 2 &&
            emailRegex.test(formData.email.trim()) &&
            formData.company.trim().length >= 2 &&
            formData.country.trim().length >= 2
        );
    }

    function isStepTwoValid() {
        return (
            formData.arrivalDate >= todayInputValue &&
            formData.departureDate >= formData.arrivalDate
        );
    }

    function isFormValid() {
        return isStepOneValid() && isStepTwoValid();
    }

    function resetForm() {
        setFormData(initialVisitorFormData);
        setCountryInputKey((prev) => prev + 1);
        setError('');
    }

    async function submitVisitor() {
        if (!isFormValid() || isSubmitting) return false;

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
            return false;
        }

        return true;
    }

    return {
        countryInputKey,
        error,
        formData,
        isFormValid,
        isStepOneValid,
        isStepTwoValid,
        isSubmitting,
        resetForm,
        submitVisitor,
        todayInputValue,
        updateArrivalDate,
        updateField,
    };
}
