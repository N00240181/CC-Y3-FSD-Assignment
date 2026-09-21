import prisma from '../src/config/db.js';
import { hashPassword } from '../src/utils/password.js';

const DEV_PASSWORD = 'password123';

async function main() {
    await prisma.booking.deleteMany();
    await prisma.member.deleteMany();
    
    await prisma.band.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.venue.deleteMany();

    const hashedPassword = await hashPassword(DEV_PASSWORD);

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

    const [venue1] = await Promise.all([
        prisma.venue.create({
            data: {
                name: 'Aviva Stadium',
                location: 'Dublin',
                capacity: 80000,
            },
        }),
    ]);

    const [booking1] = await Promise.all([
        prisma.booking.create({
            data: {
                bandId: band1.id,
                customerId: customer1.id,
                venueId: venue1.id,
                price: 125,
                date: new Date('2026-10-01'),
                bookingTime: new Date('2026-07-12T12:00:00'),
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