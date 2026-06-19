import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Client } = pg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(
            'DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD must be set',
        );
    }

    await client.connect();

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await client.query(
        `
    INSERT INTO admin_users (
      id,
      email,
      password_hash,
      role
    )
    VALUES (
      gen_random_uuid(),
      $1,
      $2,
      'SUPER_ADMIN'
    )
    ON CONFLICT (email) DO UPDATE
    SET
      password_hash = EXCLUDED.password_hash,
      role = EXCLUDED.role
    `,
        [adminEmail, passwordHash],
    );

    console.log('Seed completed successfully');
} catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
} finally {
    await client.end();
}
