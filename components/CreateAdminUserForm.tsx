'use client';

import { useState } from 'react';
import styles from './CreateAdminUserForm.module.css';

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
        <section className={styles.card}>
            <h2>Create Admin User</h2>
            <p>Add a new administrator and choose their initial access level.</p>

            <div className={styles.form}>
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
                        placeholder="Password"
                        type="password"
                    />
                </label>

                <label className={styles.field}>
                    <span>Role</span>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="VIEWER">VIEWER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </label>

                <button className={styles.button} onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </section>
    );
}
