import { jest } from '@jest/globals';
import request from 'supertest';

const mockPrisma = {
    venue: {
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

describe('/venues', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /venues is public and returns a list envelope', async () => {
        mockPrisma.venue.findMany.mockResolvedValue([
            { id: 7, name: 'Aviva Stadium', location: 'Dublin', capacity: 80 }
        ]);
        mockPrisma.venue.count.mockResolvedValue(1);

        const res = await request(app).get('/venues');

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.meta).toEqual({ page: 1, pageSize: 20, total: 1, totalPages: 1 });
        expect(mockPrisma.venue.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {},
                orderBy: { id: 'asc' },
                skip: 0,
                take: 20,
            }),
        );
    });

    it('GET /venues/:id is public', async () => {
        mockPrisma.venue.findFirst.mockResolvedValue({ id: 1, name: 'Aviva Stadium', location: 'Dublin', capacity: 80000 });

        const res = await request(app).get('/venues/1');

        expect(res.status).toBe(200);
        expect(mockPrisma.venue.findFirst).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });

    it('POST /venues still requires authentication', async () => {
        const res = await request(app).post('/venues').send({
            name: 'Aviva Stadium',
            location: 'Dublin',
            capacity: 80000,
        });

        expect(res.status).toBe(401);
        expect(mockPrisma.venue.create).not.toHaveBeenCalled();
    });
});