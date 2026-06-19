import { visitorRepository } from '@/repositories/visitor.repository';

type CreateVisitorInput = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    arrivalDate: string;
    departureDate: string;
    accommodationNotes?: string;
};

export const visitorService = {
    async createVisitor(data: CreateVisitorInput) {
        const email = data.email.trim().toLowerCase();

        const existingVisitor = await visitorRepository.findByEmail(email);

        if (existingVisitor) {
            throw new Error('A registration with this email already exists');
        }
        
        if (
            !data.firstName ||
            !data.lastName ||
            !email ||
            !data.company ||
            !data.country ||
            !data.arrivalDate ||
            !data.departureDate
        ) {
            throw new Error('Required fields are missing');
        }

        return visitorRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: email,
            company: data.company,
            country: data.country,
            arrivalDate: data.arrivalDate,
            departureDate: data.departureDate,
            accommodationNotes: data.accommodationNotes || null,
        });
    },

    async getVisitors() {
        return visitorRepository.findAll();
    },
};
