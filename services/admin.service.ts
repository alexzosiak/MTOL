import bcrypt from 'bcryptjs';
import { adminRepository } from '@/repositories/admin.repository';

type CreateAdminInput = {
    email: string;
    password: string;
    role: string;
};

const allowedRoles = ['ADMIN', 'VIEWER'];

export const adminService = {
    

    async createAdmin(data: CreateAdminInput) {

        const email = data.email?.trim().toLowerCase();
        const existingAdmin = await adminRepository.findByEmail(email);

        if (existingAdmin) {
            throw new Error("Admin with this email already exists");
        }

        if (!data.email || !data.password || !data.role) {
            throw new Error('Email, password and role are required');
        }

        if (!allowedRoles.includes(data.role)) {
            throw new Error('Invalid role');
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        return adminRepository.create({
            email: email,
            passwordHash,
            role: data.role,
        });
    },

    async deleteAdmin(id: string, currentAdminId: string) {
        if (currentAdminId === id) {
            throw new Error('You cannot delete yourself');
        }

        const deletedAdmin = await adminRepository.deleteById(id);

        if (!deletedAdmin) {
            throw new Error('Admin user not found');
        }

        return deletedAdmin;
    },

    async updateAdminRole(id: string, role: string, currentAdminId: string) {
        if (currentAdminId === id) {
            throw new Error('You cannot change your own role');
        }

        if (!allowedRoles.includes(role)) {
            throw new Error('Invalid role');
        }

        const updatedAdmin = await adminRepository.updateRole(id, role);

        if (!updatedAdmin) {
            throw new Error('Admin user not found');
        }

        return updatedAdmin;
    },
};
