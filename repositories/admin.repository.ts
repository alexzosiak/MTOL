import { db } from '@/lib/database';

export const adminRepository = {
  async findByEmail(email: string) {
    const result = await db.query(
      `
      SELECT id, email, password_hash, role
      FROM admin_users
      WHERE email = $1
      `,
      [email],
    );

    return result.rows[0];
  },

  async create(data: {
    email: string;
    passwordHash: string;
    role: string;
  }) {
    const result = await db.query(
      `
      INSERT INTO admin_users (
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at
      `,
      [data.email, data.passwordHash, data.role],
    );

    return result.rows[0];
  },

  async deleteById(id: string) {
    const result = await db.query(
      `
      DELETE FROM admin_users
      WHERE id = $1
      RETURNING id
      `,
      [id],
    );

    return result.rows[0];
  },

  async updateRole(id: string, role: string) {
    const result = await db.query(
      `
      UPDATE admin_users
      SET role = $1
      WHERE id = $2
      RETURNING id, email, role, created_at
      `,
      [role, id],
    );

    return result.rows[0];
  },
};