import bcrypt from 'bcryptjs';
import { adminRepository } from '@/repositories/admin.repository';

type LoginInput = {
  email?: string;
  password?: string;
};

export const authService = {
  async login(data: LoginInput) {
    if (!data.email || !data.password) {
      throw new Error('Email and password are required');
    }

    const admin = await adminRepository.findByEmail(data.email);

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      admin.password_hash,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  },
};