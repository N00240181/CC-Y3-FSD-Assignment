import { EventEmitter } from 'node:events';

const domainEvents = new EventEmitter();
export default domainEvents;

export const EVENTS = {
    BOOKING_CREATED: 'booking.created',
    BOOKING_ASSIGNED: 'booking.assigned',
    BOOKING_COMMENTED: 'booking.commented',
    BOOKING_STATUS_CHANGED: 'booking.status_changed',
    BOOKING_SLA_BREACHED: 'booking.sla_breached',
};