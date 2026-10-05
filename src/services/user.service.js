import prisma from '../config/db.js';
import { hashPassword } from '../utils/password.js';

const PUBLIC_FIELDS = { id: true, username: true, email: true, type: true };

export const findUserByEmail = async (email) => prisma.customer.findUnique({ where: { email } });

export const findUserById = async (id) =>
    prisma.customer.findUnique({ where: { id }, select: PUBLIC_FIELDS });

export const createCustomer = async ({ username, email, password }) => {
    const hashedPassword = await hashPassword(password);

    return prisma.customer.create({
        data: { username, email, password: hashedPassword, type: 'customer' },
        select: PUBLIC_FIELDS,
    })
}