import { jest } from '@jest/globals';
import request from 'supertest';

const mockPrisma = {
    event: {
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

describe('/events', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /events is public and returns a list envelope', async () => {
        mockPrisma.event.findMany.mockResolvedValue([
            { id: 1, bandId: 2, venueId: 3, date: '2026-10-01' }
        ]);
        mockPrisma.event.count.mockResolvedValue(1);

        const res = await request(app).get('/events');

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.meta).toEqual({ page: 1, pageSize: 20, total: 1, totalPages: 1 });
        expect(mockPrisma.event.findMany).toHaveBeenCalledWith(
            expect.objectContaining({ where: {}, include: { band: true, venue: true } }),
        );
    });

    it('GET /events/:id is public', async () => {
        mockPrisma.event.findFirst.mockResolvedValue({ id: 1, bandId: 2, venueId: 3 });

        const res = await request(app).get('/events/1');

        expect(res.status).toBe(200);
        expect(mockPrisma.event.findFirst).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { band: true, venue: true },
        });
    });

    it('POST /events still requires authentication', async () => {
        const res = await request(app).post('/events').send({
            bandId: 2,
            venueId: 3,
            date: '2026-10-01',
        });

        expect(res.status).toBe(401);
        expect(mockPrisma.event.create).not.toHaveBeenCalled();
    });
});