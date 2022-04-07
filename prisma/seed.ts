/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const eventCategories = [
  { code: 'MUSIC', name: 'Music' },
  { code: 'GEEK', name: 'Geek' },
  { code: 'GAMES', name: 'Games' },
];

const locationCategories = [
  { code: 'ATTRACTION', name: 'Attraction' },
  { code: 'FOOD', name: 'Food' },
  { code: 'SHOPPING', name: 'Shopping' },
  { code: 'UTILITIES', name: 'Utilities' },
  { code: 'ATTENDANCE', name: 'Attendance' },
  { code: 'DRINKS', name: 'Drinks' },
];

const EVENT = {
  id: 1,
  name: 'Lollapalooza',
  email: 'superadmin@gmail.com',
  password: '123456',
};

const ADMIN = {
  id: 1,
  name: 'SUPER ADMIN',
  email: 'superadmin@gmail.com',
  password: '123456',
  eventId: EVENT.id,
};

async function seed() {
  await Promise.all(eventCategories.map(async (eventCategory) => prisma.eventCategory.upsert({
    where: { code: eventCategory.code },
    update: {},
    create: {
      code: eventCategory.code,
      name: eventCategory.name,
    },
  })));

  await Promise.all(locationCategories.map(
    async (locationCategory) => prisma.locationCategory.upsert({
      where: { code: locationCategory.code },
      update: {},
      create: {
        code: locationCategory.code,
        name: locationCategory.name,
      },
    }),
  ));

  await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: EVENT.name,
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      eventCategoryId: 1,
    },
  });

  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: ADMIN.name,
      email: ADMIN.email,
      password: await bcryptjs.hash(ADMIN.password, 16),
      admin: {
        connectOrCreate: {
          where: {
            userId: 1,
          },
          create: {
            eventId: ADMIN.eventId,
          },
        },
      },
    },
  });
}

seed()
  .catch(() => process.exit(1))
  .finally(async () => {
    await prisma.$disconnect();
  });
