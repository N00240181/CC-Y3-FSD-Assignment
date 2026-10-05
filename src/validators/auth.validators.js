import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().trim().min(1, 'Name is required').max(100),
    lastName: z.string().trim().min(1, 'Name is required').max(100),
    age: z.bigint().min(1, 'Age is required').max(120),
    username: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8, 'Password should be at least 8 characters'),
})

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(1, 'Password is required'),
})