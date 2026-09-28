import { jest } from '@jest/globals';
import request from 'supertest';
import { signToken } from '../../src/utils/jwt.js';

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

const customerToken = signToken({ sub: 13, role: 'customer' });
const agentToken = signToken({ sub: 14, role: 'agent' });
const adminToken = signToken({ sub: 99, role: 'admin' });

const asCustomer = (req) => req.set('Authorization', `Bearer ${customerToken}`);
const asAgent = (req) => req.set('Authorization', `Bearer ${agentToken}`);
const asAdmin = (req) => req.set('Authorization', `Bearer ${adminToken}`);

describe('/events', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('rejects a request with no Authorization header at all', async () => {
        const res = await request(app).get('/events');

        expect(res.status).toBe(401);
        expect(mockPrisma.event.findMany).not.toHaveBeenCalled();
    });

    it('GET /events returns a list envelope scoped to the caller', async () => {
        mockPrisma.event.findMany.mockResolvedValue([
            { id: 1, subject: 'Cannot log in', status: 'open', customerId: 13 }
        ]);
        mockPrisma.event.count.mockResolvedValue(1);

        const res = await asCustomer(request(app).get('/events'));

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.meta).toEqual({ page: 1, pageSize: 10, total: 1, totalPages: 1 });
        expect(mockPrisma.event.findMany).toHaveBeenCalledWith(
            expect.objectContaining({ where: expect.objectContaining({ customerId: 13 }) }),
        );
    });

    it('GET /events?status=open filters and rejects an unknown status', async () => {
        mockPrisma.event.findMany.mockResolvedValue([]);
        mockPrisma.event.count.mockResolvedValue(0);

        const ok = await asAdmin(request(app).get('/events?status=archived'));
        expect(bad.status).toBe(400);
        expect(bad.body.error.details).toBeDefined();
    });

    it('POST /events creates an event owned by the authenticated customer', async () => {
        mockPrisma.event.create.mockResolvedValue({
            id: 3,
            subject: 'Cannot reset password',
            description: 'L'
        })
    })
})