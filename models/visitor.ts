export type VisitorFormData = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    arrivalDate: string;
    departureDate: string;
    accommodationNotes: string;
};

export const initialVisitorFormData: VisitorFormData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    arrivalDate: '',
    departureDate: '',
    accommodationNotes: '',
};
