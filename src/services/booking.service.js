import prisma from "../config/db.js";
import domainEvents, { EVENTS } from '../events/emitter.js';

const userSummary = { select: { id: true, name: true, email: true } };

const scopeForViewer = (viewer) => {
    if (viewer.role === 'customer') return { customerId: viewer.id };
    if (viewer.role === 'agent') {
        return { OR: [{ assignedAgentId: viewer.id }, { assignedAgentId: null }] };
    }
    return {};
}