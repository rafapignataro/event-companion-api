import { Friendship, PrismaClient } from '@prisma/client';

import { PrismaTransactionClient } from '../../../infra/prisma';

import {
  FriendshipsRepository, CreateFriendshipDTO, UpdateFriendshipDTO, QueryParamsDTO,
} from '../FriendshipsRepository';

export class PrismaFriendshipsRepository implements FriendshipsRepository {
  constructor(private readonly prismaClient: PrismaClient | PrismaTransactionClient) {}

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
