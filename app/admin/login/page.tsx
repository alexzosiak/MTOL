'use client';

import { useState } from 'react';

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
        <main>
            <h1>Admin Login</h1>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />

            <button onClick={handleLogin}>Login</button>
        </main>
    );
}
