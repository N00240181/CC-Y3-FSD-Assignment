import { EventEmitter } from 'node:events';

const domainEvents = new EventEmitter();
export default domainEvents;

export const EVENTS = {
    BOOKING_CREATED: 'booking.created',
    BOOKING_ASSIGNED: 'booking.assigned',
    BOOKING_COMMENTED: 'booking.commented',
    BOOKING_STATUS_CHANGED: 'booking.status_changed',
    BOOKING_SLA_BREACHED: 'booking.sla_breached',
    EVENT_CREATED: 'event.created',
    EVENT_ASSIGNED: 'event.assigned',
    EVENT_COMMENTED: 'event.commented',
    EVENT_STATUS_CHANGED: 'event.status_changed',
    EVENT_SLA_BREACHED: 'event.sla_breached',
    VENUE_CREATED: 'venue.created',
    VENUE_ASSIGNED: 'venue.assigned',
    VENUE_COMMENTED: 'venue.commented',
    VENUE_STATUS_CHANGED: 'venue.status_changed',
    VENUE_SLA_BREACHED: 'venue.sla_breached',
};