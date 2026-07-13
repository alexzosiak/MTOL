import { db } from '@/lib/database';

type CreateVisitorData = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    arrivalDate: string;
    departureDate: string;
    accommodationNotes: string | null;
};

export const visitorRepository = {
    async create(data: CreateVisitorData) {
        const result = await db.query(
            `
      INSERT INTO visitors (
        first_name,
        last_name,
        email,
        company,
        country,
        arrival_date,
        departure_date,
        accommodation_notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.company,
                data.country,
                data.arrivalDate,
                data.departureDate,
                data.accommodationNotes,
            ],
        );

        return result.rows[0];
    },

    async findAll() {
        const result = await db.query(
            `
      SELECT
        id,
        first_name,
        last_name,
        email,
        company,
        country,
        arrival_date,
        departure_date,
        accommodation_notes,
        created_at
      FROM visitors
      ORDER BY created_at DESC
      `,
        );

        return result.rows;
    },

    async searchByFullName(search: string) {
        const result = await db.query(
            `
      SELECT
        id,
        first_name,
        last_name,
        email,
        company,
        country,
        created_at
      FROM visitors
      WHERE CONCAT(first_name, ' ', last_name) ILIKE $1
      ORDER BY created_at DESC
      `,
            [`%${search}%`],
        );

        return result.rows;
    },

    async countAll() {
        const result = await db.query(`
      SELECT COUNT(*)::int AS total
      FROM visitors
      `);

        return result.rows[0].total;
    },

    async countCreatedInLastDay() {
        const result = await db.query(`
      SELECT COUNT(*)::int AS today
      FROM visitors
      WHERE created_at >= NOW() - INTERVAL '1 day'
      `);

        return result.rows[0].today;
    },

    async countByCountry() {
        const result = await db.query(`
      SELECT country, COUNT(*)::int AS count
      FROM visitors
      GROUP BY country
      ORDER BY count DESC
      `);

        return result.rows;
    },

    async findByEmail(email: string) {
        const result = await db.query(
            `
    SELECT id
    FROM visitors
    WHERE email = $1
    `,
            [email],
        );

        return result.rows[0];
    },
};
