import { Friendship, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  FriendshipsRepository, CreateFriendshipDTO, UpdateFriendshipDTO, QueryParamsDTO,
} from '../FriendshipsRepository';

export class PrismaFriendshipsRepository implements FriendshipsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Friendship> {
    const friendship = await this.prismaClient.friendship.findUnique({
      where: {
        id,
      },
    });

    return friendship;
  }

  public async findRelation(customerId: number, friendId: number): Promise<Friendship> {
    const friendship = await this.prismaClient.friendship.findFirst({
      where: {
        customerId,
        friendId,
      },
    });

    return friendship;
  }

  public async findAll({ customerId }: QueryParamsDTO): Promise<Friendship[]> {
    const friendships = await this.prismaClient.friendship.findMany({
      where: {
        customerId,
      },
    });

    return friendships;
  }

  public async findAllByCustomerId(id: number): Promise<Friendship[]> {
    const friendships = await this.prismaClient.friendship.findMany({
      where: {
        customerId: id,
      },
    });

    return friendships;
  }

  public async create(data: CreateFriendshipDTO): Promise<Friendship> {
    const friendship = await this.prismaClient.friendship.create({
      data,
    });

    return friendship;
  }

  public async update(id: number, data: UpdateFriendshipDTO): Promise<Friendship> {
    const friendship = await this.prismaClient.friendship.update({
      where: {
        id,
      },
      data,
    });

    return friendship;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.friendship.delete({
      where: {
        id,
      },
    });
  }
}
