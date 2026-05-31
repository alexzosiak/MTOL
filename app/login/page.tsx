'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            window.location.href = '/admin';
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <p className={styles.eyebrow}>Visitor management</p>
                <h1>Admin Login</h1>
                <p className={styles.subtitle}>
                    Sign in to manage registrations and review statistics.
                </p>

                <label className={styles.field}>
                    <span>Email</span>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                    />
                </label>

                <label className={styles.field}>
                    <span>Password</span>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                    />
                </label>

                <button className={styles.button} onClick={handleLogin}>
                    Login
                </button>
            </section>
        </main>
    );
}
