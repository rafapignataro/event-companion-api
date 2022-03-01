import { PrismaClient } from '@prisma/client';

type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

const prisma = new PrismaClient();

export { prisma, PrismaTransactionClient };
