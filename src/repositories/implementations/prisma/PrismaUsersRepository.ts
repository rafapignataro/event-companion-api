import { PrismaClient, User } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  UsersRepository, CreateUserDTO, UpdateUserDTO, UpdatePasswordDTO,
} from '../../UsersRepository';

export class PrismaUsersRepository implements UsersRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email,
      },
      include: {
        admin: true,
        brand: true,
        customer: true
      }
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();

    return users;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prismaClient.user.create({
      data,
    });

    return user;
  }

  public async update(id: number, data: UpdateUserDTO): Promise<User> {
    const user = await this.prismaClient.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  public async updatePassword(id: number, data: UpdatePasswordDTO): Promise<User> {
    const user = await this.prismaClient.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
