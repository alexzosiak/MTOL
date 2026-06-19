import { requireRole } from '@/lib/auth';
import { adminService } from '@/services/admin.service';

export async function POST(request: Request) {
    await requireRole(['SUPER_ADMIN']);

    try {
        const body = await request.json();

        const admin = await adminService.createAdmin(body);

        return Response.json(admin);
        
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message === 'Email, password and role are required' ||
                error.message === 'Invalid role'
            ) {
                return Response.json({ error: error.message }, { status: 400 });
            }

            if (error.message === 'Admin with this email already exists') {
                return Response.json({ error: error.message }, { status: 409 });
            }
        }

        console.error(error);

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
