import { db } from '@/lib/database';
import { requireRole } from '@/lib/auth';

type RouteProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function DELETE(request: Request, { params }: RouteProps) {
    const currentAdmin = await requireRole(['SUPER_ADMIN']);

    const { id } = await params;

    if (currentAdmin.id === id) {
        return Response.json(
            { error: 'You cannot delete yourself' },
            { status: 400 },
        );
    }

    try {
        const result = await db.query(
            `
      DELETE FROM admin_users
      WHERE id = $1
      RETURNING id
      `,
            [id],
        );

        if (result.rowCount === 0) {
            return Response.json(
                { error: 'Admin user not found' },
                { status: 404 },
            );
        }

        return Response.json({
            message: 'Admin user deleted',
            id,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
export async function PATCH(request: Request, { params }: RouteProps) {
    const currentAdmin = await requireRole(['SUPER_ADMIN']);

    const { id } = await params;
    const body = await request.json();

    const { role } = body;

    if (currentAdmin.id === id) {
        return Response.json(
            { error: 'You cannot change your own role' },
            { status: 400 },
        );
    }

    if (!['ADMIN', 'VIEWER'].includes(role)) {
        return Response.json({ error: 'Invalid role' }, { status: 400 });
    }

    try {
        const result = await db.query(
            `
      UPDATE admin_users
      SET role = $1
      WHERE id = $2
      RETURNING id, email, role, created_at
      `,
            [role, id],
        );

        if (result.rowCount === 0) {
            return Response.json(
                { error: 'Admin user not found' },
                { status: 404 },
            );
        }

        return Response.json(result.rows[0]);
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
