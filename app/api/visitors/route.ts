// import { db } from '@/lib/database';

// export async function POST(request: Request) {
//     const body = await request.json();

//     const {
//         firstName,
//         lastName,
//         company,
//         country,
//         arrivalDate,
//         departureDate,
//         accommodationNotes,
//     } = body;

//     if (
//         !firstName ||
//         !lastName ||
//         !company ||
//         !country ||
//         !arrivalDate ||
//         !departureDate
//     ) {
//         return Response.json(
//             { error: 'Required fields are missing' },
//             { status: 400 },
//         );
//     }

//     try {
//         const result = await db.query(
//             `
//     INSERT INTO visitors (
//       id,
//       first_name,
//       last_name,
//       company,
//       country,
//       arrival_date,
//       departure_date,
//       accommodation_notes
//     )
//     VALUES (
//       gen_random_uuid(),
//       $1, $2, $3, $4, $5, $6, $7
//     )
//     RETURNING *
//     `,
//             [
//                 firstName,
//                 lastName,
//                 company,
//                 country,
//                 arrivalDate,
//                 departureDate,
//                 accommodationNotes || null,
//             ],
//         );

//         return Response.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);

//         return Response.json(
//             { error: 'Internal server error' },
//             { status: 500 },
//         );
//     }
// }

// export async function GET() {
//   try {
//     const result = await db.query(
//       `
//       SELECT
//         id,
//         first_name,
//         last_name,
//         company,
//         country,
//         arrival_date,
//         departure_date,
//         accommodation_notes,
//         created_at
//       FROM visitors
//       ORDER BY created_at DESC
//       `
//     );

//     return Response.json(result.rows);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { visitorService } from '@/services/visitor.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const visitor = await visitorService.createVisitor(body);

    return Response.json(visitor);
  } catch (error) {
    if (error instanceof Error && error.message === 'Required fields are missing') {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error(error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const visitors = await visitorService.getVisitors();

    return Response.json(visitors);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}