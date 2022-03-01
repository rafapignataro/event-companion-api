import { Friendship, PrismaClient } from '@prisma/client';

import {
  FriendshipsRepository, CreateFriendshipDTO, UpdateFriendshipDTO,
} from '../FriendshipsRepository';

export class PrismaFriendshipsRepository implements FriendshipsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async findById(id: number): Promise<Friendship> {
    const friendship = await this.prismaClient.friendship.findUnique({
      where: {
        id,
      },
    });

    return friendship;
  }

  public async findAll(): Promise<Friendship[]> {
    const friendships = await this.prismaClient.friendship.findMany();

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
