'use client';

import { useState } from 'react';

const fieldClass = 'grid gap-[7px] text-[13px] font-bold text-[#34405a]';
const controlClass =
    'h-[42px] min-w-0 rounded-[9px] border border-[var(--border)] bg-[#fbfcff] px-3 text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]';

export function CreateAdminUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('admin123');
    const [role, setRole] = useState('VIEWER');

    async function handleSubmit() {
        const res = await fetch('/api/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            window.location.reload();
        }
    }

    return (
        <section className="mt-6 rounded-[13px] border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="m-0 text-lg tracking-[-0.03em]">
                Create Admin User
            </h2>
            <p className="mt-1.5 mb-0 text-sm leading-[1.5] text-[var(--muted)]">
                Add a new administrator and choose their initial access level.
            </p>

            <div className="mt-[18px] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(130px,0.6fr)_auto] items-end gap-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
                <label className={fieldClass}>
                    <span>Email</span>
                    <input
                        className={controlClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                    />
                </label>

                <label className={fieldClass}>
                    <span>Password</span>
                    <input
                        className={controlClass}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                    />
                </label>

                <label className={fieldClass}>
                    <span>Role</span>
                    <select
                        className={controlClass}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="VIEWER">VIEWER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </label>

                <button
                    className="h-[42px] cursor-pointer rounded-[9px] border-0 bg-[var(--primary)] px-[17px] font-bold text-white hover:bg-[var(--primary-dark)]"
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </div>
        </section>
    );
}
