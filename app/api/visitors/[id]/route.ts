import { db } from "@/lib/database";
import { requireRole } from "@/lib/auth";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  await requireRole(["SUPER_ADMIN", "ADMIN"]);

  const { id } = await params;

  try {
    const result = await db.query(
      `
      DELETE FROM visitors
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { error: "Visitor not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Visitor deleted",
      id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteProps
) {
  await requireRole(["SUPER_ADMIN", "ADMIN"]);

  const { id } = await params;

  const body = await request.json();

  const {
    firstName,
    lastName,
    company,
    country,
    arrivalDate,
    departureDate,
    accommodationNotes,
  } = body;

  try {
    const result = await db.query(
      `
      UPDATE visitors
      SET
        first_name = $1,
        last_name = $2,
        company = $3,
        country = $4,
        arrival_date = $5,
        departure_date = $6,
        accommodation_notes = $7
      WHERE id = $8
      RETURNING *
      `,
      [
        firstName,
        lastName,
        company,
        country,
        arrivalDate,
        departureDate,
        accommodationNotes || null,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { error: "Visitor not found" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}