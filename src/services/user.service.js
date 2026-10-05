import prisma from '../config/db.js';
import { hashPassword } from '../utils/password.js';

const PUBLIC_FIELDS = { id: true, name: true, email: true, role: true, createdAt: true };

export const findUserByEmail = async (email) => prisma.user.findUnique({ where: { email } });

export const findUserById = async (id) =>
    prisma.user.findUnique({ where: { id }, select: PUBLIC_FIELDS });

export const createCustomer = async ({ name, email, password }) => {
    const hashedPassword = await hashPassword(password);

    return prisma.user.create({
        data: { name, email, password: hashedPassword, role: 'customer' },
        select: PUBLIC_FIELDS,
    })
}