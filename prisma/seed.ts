import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const eventCategories = [
  { code: 'MUSIC', name: 'Music' },
  { code: 'GEEK', name: 'Geek' },
  { code: 'GAMES', name: 'Games' },
];

const locationCategories = [
  { code: 'ATTRACTION', name: 'Attraction', description: '' },
  { code: 'FOOD', name: 'Food', description: '' },
  { code: 'SHOPPING', name: 'Shopping', description: '' },
  { code: 'UTILITIES', name: 'Utilities', description: '' },
  { code: 'ATTENDANCE', name: 'Attendance', description: '' },
  { code: 'DRINKS', name: 'Drinks', description: '' },
];

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
        description: locationCategory.description,
      },
    }),
  ));
}

seed()
  .catch((e) => process.exit(1))
  .finally(async () => {
    await prisma.$disconnect();
  });
