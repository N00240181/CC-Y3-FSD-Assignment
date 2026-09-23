import { TicketCategory } from '@prisma/client';
import prisma from '../src/config/db.js';
import { hashPassword } from '../src/utils/password.js';

const DEV_PASSWORD = 'password123';

async function main() {
    await prisma.booking.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
    await prisma.member.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.venue.deleteMany();
    await prisma.band.deleteMany();

    const hashedPassword = await hashPassword(DEV_PASSWORD);

    console.log("deleted old content");

    const [band1, band2] = await Promise.all([
        prisma.band.create({
            data: {
                name: 'Metallica',
                memberCount: 20,
            },
        }),
        prisma.band.create({
            data: {
                name: 'Linkin Park',
                memberCount: 6,
            },
        }),
    ]);

    console.log("created bands");

    const [member1, member2] = await Promise.all([
        prisma.member.create({
            data: {
                bandId: band1.id,
                name: 'Mike Shinoda',
            },
        }),
        prisma.member.create({
            data: {
                bandId: band2.id,
                name: 'Lars',
            },
        }),
    ]);

    console.log("created members");
    
    const [customer1, customer2] = await Promise.all([
        prisma.customer.create({
            data: {
                firstName: 'Eric',
                lastName: 'Cartman',
                age: 25,
                email: 'intheghetto@gmail.com',
            },
        }),
        prisma.customer.create({
            data: {
                firstName: 'Joshua',
                lastName: 'Block',
                age: 23,
                email: 'worldoftshirts@gmail.com',
            },
        }),
    ]);

    console.log("created customers");
    
    const [venue1] = await Promise.all([
        prisma.venue.create({
            data: {
                name: 'Aviva Stadium',
                location: 'Dublin',
                capacity: 80000,
            },
        }),
    ]);

    console.log("created venues");
    
    const [event1] = await Promise.all([
        prisma.event.create({
            data: {
                bandId: band1.id,
                venueId: venue1.id,
                date: new Date('2026-10-01'),
            },
        }),
    ]);

    console.log("created tickets");
    
    const [ticket1] = await Promise.all([
        prisma.ticket.create({
            data: {
                eventId: event1.id,
                category: TicketCategory.standing,
                price: 80
            }
        })
    ])

    console.log("created bookings");
    
    const [booking1] = await Promise.all([
        prisma.booking.create({
            data: {
                ticketId: ticket1.id,
                customerId: customer1.id,
                bookingTime: new Date('2026-05-10 12:00:00'),
            },
        }),
    ]);
}

main()
    .catch((err) => {
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });