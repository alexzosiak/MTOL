import { adminRepository } from '@/repositories/admin.repository';
import { formatDateTime } from './date-format.view-model';

type AdminUserRow = {
    id: string;
    email: string;
    role: string;
    created_at: Date | string;
};

export async function getAdminUsersViewModel() {
    const admins = (await adminRepository.findAll()) as AdminUserRow[];

    return admins.map((admin) => ({
        ...admin,
        createdAt: formatDateTime(admin.created_at),
    }));
}
