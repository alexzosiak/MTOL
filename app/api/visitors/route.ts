import { visitorService } from '@/services/visitor.service';

const validationErrors = new Set([
    'Required fields are missing',
    'Email is required',
    'Invalid email address',
    'Arrival and departure dates are required',
    'Invalid travel date format',
    'Arrival date cannot be in the past',
    'Departure date cannot be before arrival date',
]);

function isValidationError(error: Error) {
    return (
        validationErrors.has(error.message) ||
        error.message.endsWith(' is required') ||
        error.message.includes(' must be at least ') ||
        error.message.includes(' must be less than ')
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const visitor = await visitorService.createVisitor(body);

        return Response.json(visitor);
    } catch (error) {
        if (error instanceof Error && isValidationError(error)) {
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
