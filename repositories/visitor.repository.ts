import { db } from '@/lib/database';

type CreateVisitorData = {
  firstName: string;
  lastName: string;
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
        company,
        country,
        arrival_date,
        departure_date,
        accommodation_notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        data.firstName,
        data.lastName,
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
};