'use client';

import { useState } from 'react';

const initialEmail = '';
const initialPassword = 'admin123';
const initialRole = 'VIEWER';

export function useAdminUserFormViewModel() {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);
    const [role, setRole] = useState(initialRole);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function resetForm() {
        setEmail(initialEmail);
        setPassword(initialPassword);
        setRole(initialRole);
        setError('');
    }

    async function createAdminUser() {
        if (isSubmitting) return false;

        setError('');
        setIsSubmitting(true);

        const res = await fetch('/api/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();
        setIsSubmitting(false);

        if (!res.ok) {
            setError(data.error || 'Something went wrong');
            return false;
        }

        resetForm();
        return true;
    }

    return {
        createAdminUser,
        email,
        error,
        isSubmitting,
        password,
        role,
        setEmail,
        setPassword,
        setRole,
    };
}
