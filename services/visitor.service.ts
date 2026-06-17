import { visitorRepository } from '@/repositories/visitor.repository';

type CreateVisitorInput = {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  accommodationNotes?: string;
};

export const visitorService = {
  async createVisitor(data: CreateVisitorInput) {
    if (
      !data.firstName ||
      !data.lastName ||
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