import { PrismaClient } from '@prisma/client';

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
}

seed()
  .catch(() => process.exit(1))
  .finally(async () => {
    await prisma.$disconnect();
  });
