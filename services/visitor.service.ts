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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateTextField(value: string, fieldName: string) {
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
        throw new Error(`${fieldName} is required`);
    }

    if (trimmedValue.length < 2) {
        throw new Error(`${fieldName} must be at least 2 characters`);
    }

    if (trimmedValue.length > 50) {
        throw new Error(`${fieldName} must be less than 50 characters`);
    }

    return trimmedValue;
}

export const visitorService = {
    async createVisitor(data: CreateVisitorInput) {
        const firstName = validateTextField(data.firstName, 'First name');
        const lastName = validateTextField(data.lastName, 'Last name');
        const company = validateTextField(data.company, 'Company');
        const country = validateTextField(data.country, 'Country');
        const email = data.email.trim().toLowerCase();

        const existingVisitor = await visitorRepository.findByEmail(email);

        if (existingVisitor) {
            throw new Error('A registration with this email already exists');
        }

        if (!email) {
            throw new Error('Email is required');
        }

        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address');
        }

        if (!data.arrivalDate || !data.departureDate) {
            throw new Error('Arrival and departure dates are required');
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
            firstName: firstName,
            lastName: lastName,
            email: email,
            company: company,
            country: country,
            arrivalDate: data.arrivalDate,
            departureDate: data.departureDate,
            accommodationNotes: data.accommodationNotes?.trim() || null,
        });
    },

    async getVisitors() {
        return visitorRepository.findAll();
    },
};
