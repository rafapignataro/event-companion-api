import { User } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  UsersRepository, CreateUserDTO, UpdateUserDTO, UpdatePasswordDTO,
} from '../UsersRepository';

export class PrismaUsersRepository implements UsersRepository {
  public async findUserByID(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  public async findUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  public async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  public async updatePassword(id: number, data: UpdatePasswordDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  public async deleteUser(id: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
