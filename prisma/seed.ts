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
  startDate: new Date('2021-06-01'),
  endDate: new Date('2021-06-30'),
  version: 1,
  eventCategoryId: 1
};

const USERS = [
  {
    id: 1,
    name: 'Lollapalooza',
    email: 'lollapalooza@gmail.com',
    password: '123456',
    eventId: EVENT.id,
    type: 'admin'
  },
  {
    id: 2,
    name: 'Budweiser',
    email: 'budweiser@gmail.com',
    password: '123456',
    eventId: EVENT.id,
    type: 'brand'
  },
  {
    id: 3,
    name: 'McDonalds',
    email: 'mcdonalds@gmail.com',
    password: '123456',
    eventId: EVENT.id,
    type: 'brand'
  }
]

const LOCATIONS = [
  // Attraction
  {
    id: 1,
    name: 'Palco Budweiser',
    description: 'Palco Budweiser',
    latitude: -23.700695,
    longitude: -46.697523,
    eventId: EVENT.id,
    locationCategoryId: 1
  },
  {
    id: 2,
    name: 'Palco Onix',
    description: 'Palco Onix',
    latitude: -23.698483,
    longitude: -46.696841,
    eventId: EVENT.id,
    locationCategoryId: 1
  },
  {
    id: 3,
    name: 'Palco Axe',
    description: 'Palco Axe',
    latitude: -23.697122,
    longitude: -46.697425,
    eventId: EVENT.id,
    locationCategoryId: 1
  },
  // Shopping
  {
    id: 4,
    name: 'Lolla Market',
    description: 'Compre produtos do Lollapalooza',
    latitude: -23.700561,
    longitude: -46.698774,
    eventId: EVENT.id,
    locationCategoryId: 3
  },
  {
    id: 5,
    name: 'Budweiser',
    description: 'Compre produtos Budweiser',
    latitude: -23.701864,
    longitude: -46.698758,
    eventId: EVENT.id,
    locationCategoryId: 3
  },
]

async function seed() {
  // Event Categories
  await Promise.all(eventCategories.map(async (eventCategory) => prisma.eventCategory.upsert({
    where: { code: eventCategory.code },
    update: {
      code: eventCategory.code,
      name: eventCategory.name,
    },
    create: {
      code: eventCategory.code,
      name: eventCategory.name,
    },
  })));

  // Location Categories
  await Promise.all(locationCategories.map(
    async (locationCategory) => prisma.locationCategory.upsert({
      where: { code: locationCategory.code },
      update: {
        code: locationCategory.code,
        name: locationCategory.name
      },
      create: {
        code: locationCategory.code,
        name: locationCategory.name,
      },
    }),
  ));

  // Events
  await prisma.event.upsert({
    where: { id: 1 },
    update: {
      name: EVENT.name,
      startDate: EVENT.startDate,
      endDate: EVENT.endDate,
      eventCategoryId: 1,
      version: EVENT.version
    },
    create: {
      name: EVENT.name,
      startDate: EVENT.startDate,
      endDate: EVENT.endDate,
      eventCategoryId: 1,
      version: EVENT.version
    },
  });

  const hashedPassword = await bcryptjs.hash('123456', 16);

  // Users
  await Promise.all(USERS.map(async user => {
    return prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        [user.type]: {
          connectOrCreate: {
            where: {
              userId: user.id,
            },
            create: {
              eventId: user.eventId,
            },
          },
        },
      },
    });
  }));

  // Locations
  await Promise.all(LOCATIONS.map(async location => {
    return prisma.location.upsert({
      where: {
        id: location.id,
      },
      update: {
        name: location.name,
        description: location.description,
        latitude: location.latitude,
        longitude: location.longitude,
        eventId: location.eventId,
        locationCategoryId: location.locationCategoryId,
      },
      create: {
        name: location.name,
        description: location.description,
        latitude: location.latitude,
        longitude: location.longitude,
        eventId: location.eventId,
        locationCategoryId: location.locationCategoryId,
      },
    });
  }));
}

seed()
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
