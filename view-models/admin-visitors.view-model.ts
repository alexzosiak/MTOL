import { visitorRepository } from '@/repositories/visitor.repository';
import { formatDateTime } from './date-format.view-model';

type AdminVisitorRow = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    company: string;
    created_at: Date | string;
};

export async function getAdminVisitorsViewModel(search: string) {
    const visitors = (await visitorRepository.searchByFullName(
        search,
    )) as AdminVisitorRow[];

    return visitors.map((visitor) => ({
        ...visitor,
        submittedAt: formatDateTime(visitor.created_at),
    }));
}
