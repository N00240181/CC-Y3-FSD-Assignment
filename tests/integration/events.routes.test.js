import { jest } from '@jest/globals';
import request from 'supertest';
import { signToken } from '../../src/utils/jwt.js';

const mockPrisma = {
    ticket: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
    },
};

jest.unstable_mockModule('../../src/config/db.js', () => ({
    default: mockPrisma,
}));

const { default: app } = await import('../../src/app.js');

const 