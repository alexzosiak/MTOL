'use client';

import { useState } from 'react';
import Link from 'next/link';

const homeLinkClass =
    'absolute top-10 left-10 inline-flex items-center gap-2 rounded-[10px] border border-[rgba(49,87,213,0.18)] bg-[#f8faff] px-[11px] py-2 text-[13px] font-bold text-[var(--primary)] no-underline shadow-[0_10px_28px_rgba(42,58,92,0.08)] transition-[border-color,background,transform] duration-[160ms] hover:-translate-y-px hover:border-[rgba(49,87,213,0.35)] hover:bg-[#edf1ff] max-[620px]:bottom-5 max-[620px]:left-5';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        console.log(data);

        if (!res.ok) {
            setError('Invalid email or password');
            return;
        }
        if (res.ok) {
            window.location.href = '/admin';
        } 
    }

    return (
        <main className="relative grid min-h-screen place-items-center bg-[linear-gradient(135deg,rgba(49,87,213,0.15),transparent_48%),var(--background)] p-6">
            <Link href="/" className={homeLinkClass}>
                <span aria-hidden="true">←</span>
                Back to home
            </Link>

            <form onSubmit={handleLogin}
            className="grid w-[min(100%,420px)] gap-[18px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[34px] shadow-[var(--shadow)]">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                    Visitor management
                </p>
                <h1 className="m-0 text-[32px] tracking-[-0.04em]">
                    Admin Login
                </h1>
                <p className="m-0 text-sm leading-[1.6] text-[var(--muted)]">
                    Sign in to manage registrations and review statistics.
                </p>

                <label className="grid gap-2 text-sm font-bold text-[#34405a]">
                    <span>Email</span>
                    <input
                        className="rounded-[10px] border border-[var(--border)] px-3.5 py-[13px] outline-none transition-[border-color,box-shadow] duration-[160ms] focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                    />
                </label>

                <label className="grid gap-2 text-sm font-bold text-[#34405a]">
                    <span>Password</span>
                    <input
                        className="rounded-[10px] border border-[var(--border)] px-3.5 py-[13px] outline-none transition-[border-color,box-shadow] duration-[160ms] focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(49,87,213,0.12)]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                    />
                </label>
                {error && (
                    <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}
                <button
                    className="cursor-pointer rounded-[10px] border-0 bg-[var(--primary)] px-[18px] py-[13px] font-bold text-white transition-[background,transform] duration-[160ms] hover:-translate-y-px hover:bg-[var(--primary-dark)]"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </main>
    );
}
