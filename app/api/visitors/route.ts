import { visitorService } from '@/services/visitor.service';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const visitor = await visitorService.createVisitor(body);

        return Response.json(visitor);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === 'Required fields are missing'
        ) {
            return Response.json({ error: error.message }, { status: 400 });
        } else if (
            error instanceof Error &&
            error.message === 'A registration with this email already exists'
        ) {
            return Response.json({ error: error.message }, { status: 409 });
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
