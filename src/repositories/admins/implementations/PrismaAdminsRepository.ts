import { Admin, PrismaClient } from '@prisma/client';

import {
  AdminsRepository, CreateAdminDTO, UpdateAdminDTO,
} from '../AdminsRepository';

export class PrismaAdminsRepository implements AdminsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async findById(id: number): Promise<Admin> {
    const admin = await this.prismaClient.admin.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });

    return admin;
  }

  public async findAll(): Promise<Admin[]> {
    const admins = await this.prismaClient.admin.findMany({
      include: {
        User: true,
      },
    });

    return admins;
  }

  public async create(data: CreateAdminDTO): Promise<Admin> {
    const admin = await this.prismaClient.admin.create({
      data,
    });

    return admin;
  }

  public async update(id: number, data: UpdateAdminDTO): Promise<Admin> {
    const admin = await this.prismaClient.admin.update({
      where: {
        id,
      },
      data,
    });

    return admin;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.admin.delete({
      where: {
        id,
      },
    });
  }
}
