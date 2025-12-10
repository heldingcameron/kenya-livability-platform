import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from parent directory
config({ path: resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@livability.ke' },
        update: {},
        create: {
            email: 'admin@livability.ke',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log('✓ Created admin user:', admin.email);

    // Create test user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@livability.ke' },
        update: {},
        create: {
            email: 'user@livability.ke',
            password: userPassword,
            role: 'USER',
        },
    });
    console.log('✓ Created test user:', user.email);

    // Create sample buildings in Nairobi
    const buildings = [
        {
            id: 'westlands-square',
            name: 'Westlands Square',
            latitude: -1.2676,
            longitude: 36.8078,
            neighbourhood: 'Westlands',
        },
        {
            id: 'kilimani-plaza',
            name: 'Kilimani Plaza',
            latitude: -1.2921,
            longitude: 36.7856,
            neighbourhood: 'Kilimani',
        },
        {
            id: 'upperhill-towers',
            name: 'Upperhill Towers',
            latitude: -1.2864,
            longitude: 36.8172,
            neighbourhood: 'Upper Hill',
        },
        {
            id: 'parklands-heights',
            name: 'Parklands Heights',
            latitude: -1.2627,
            longitude: 36.8234,
            neighbourhood: 'Parklands',
        },
        {
            id: 'lavington-gardens',
            name: 'Lavington Gardens',
            latitude: -1.2789,
            longitude: 36.7645,
            neighbourhood: 'Lavington',
        },
    ];

    for (const buildingData of buildings) {
        const building = await prisma.building.upsert({
            where: { id: buildingData.id },
            update: {},
            create: buildingData,
        });
        console.log('✓ Created building:', building.name);

        // Create sample reports for each building
        const utilities = ['POWER', 'WATER', 'INTERNET'] as const;
        const statuses = ['STABLE', 'FLICKERING', 'OUTAGE'] as const;

        for (const utility of utilities) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            await prisma.report.create({
                data: {
                    utilityType: utility,
                    status: randomStatus,
                    userId: user.id,
                    buildingId: building.id,
                },
            });
        }
    }

    console.log('✓ Created sample reports');
    console.log('🌱 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
