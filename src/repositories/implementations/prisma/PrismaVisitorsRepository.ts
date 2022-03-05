import { Visitor, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  VisitorsRepository, CreateVisitorDTO, UpdateVisitorDTO, QueryParamsDTO,
} from '../../VisitorsRepository';

export class PrismaVisitorsRepository implements VisitorsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Visitor> {
    const visitor = await this.prismaClient.visitor.findUnique({
      where: {
        id,
      },
    });

    return visitor;
  }

  public async findByCustomerAndEventId(customerId: number, eventId: number): Promise<Visitor> {
    const visitor = await this.prismaClient.visitor.findFirst({
      where: {
        customerId,
        eventId,
      },
    });

    return visitor;
  }

  public async findAll({ customerId }: QueryParamsDTO): Promise<Visitor[]> {
    const visitors = await this.prismaClient.visitor.findMany({
      where: {
        customerId,
      },
    });

    return visitors;
  }

  public async findAllByCustomerIdteste(id: number): Promise<Visitor[]> {
    const visitors = await this.prismaClient.visitor.findMany({
      where: {
        customerId: id,
      },
    });

    return visitors;
  }

  public async create(data: CreateVisitorDTO): Promise<Visitor> {
    const visitor = await this.prismaClient.visitor.create({
      data,
    });

    return visitor;
  }

  public async update(id: number, data: UpdateVisitorDTO): Promise<Visitor> {
    const visitor = await this.prismaClient.visitor.update({
      where: {
        id,
      },
      data,
    });

    return visitor;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.visitor.delete({
      where: {
        id,
      },
    });
  }
}
