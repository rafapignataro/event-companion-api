import { Friendship } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  FriendshipsRepository, CreateFriendshipDTO, UpdateFriendshipDTO,
} from '../FriendshipsRepository';

export class PrismaFriendshipsRepository implements FriendshipsRepository {
  public async findById(id: number): Promise<Friendship> {
    const friendship = await prisma.friendship.findUnique({
      where: {
        id,
      },
    });

    return friendship;
  }

  public async findAll(): Promise<Friendship[]> {
    const friendships = await prisma.friendship.findMany();

    return friendships;
  }

  public async create(data: CreateFriendshipDTO): Promise<Friendship> {
    const friendship = await prisma.friendship.create({
      data,
    });

    return friendship;
  }

  public async update(id: number, data: UpdateFriendshipDTO): Promise<Friendship> {
    const friendship = await prisma.friendship.update({
      where: {
        id,
      },
      data,
    });

    return friendship;
  }

  public async delete(id: number): Promise<void> {
    await prisma.friendship.delete({
      where: {
        id,
      },
    });
  }
}
