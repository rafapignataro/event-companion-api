import { Activation, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  ActivationsRepository, CreateActivationDTO, UpdateActivationDTO, QueryParamsDTO,
} from '../../ActivationsRepository';

export class PrismaActivationsRepository implements ActivationsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Activation> {
    const activation = await this.prismaClient.activation.findUnique({
      where: {
        id,
      },
    });

    return activation;
  }

  public async findAll({ locationId }: QueryParamsDTO): Promise<Activation[]> {
    const activations = await this.prismaClient.activation.findMany({
      where: { locationId },
    });

    return activations;
  }

  public async create(data: CreateActivationDTO): Promise<Activation> {
    const activation = await this.prismaClient.activation.create({
      data,
    });

    return activation;
  }

  public async update(id: number, data: UpdateActivationDTO): Promise<Activation> {
    const activation = await this.prismaClient.activation.update({
      where: {
        id,
      },
      data,
    });

    return activation;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.activation.delete({
      where: {
        id,
      },
    });
  }
}
