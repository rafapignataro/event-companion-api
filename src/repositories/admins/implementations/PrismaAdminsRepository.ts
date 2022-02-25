import { Admin } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  AdminsRepository, CreateAdminDTO, UpdateAdminDTO,
} from '../AdminsRepository';

export class PrismaAdminsRepository implements AdminsRepository {
  public async findById(id: number): Promise<Admin> {
    const admin = await prisma.admin.findUnique({
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
    const admins = await prisma.admin.findMany({
      include: {
        User: true,
      },
    });

    return admins;
  }

  public async create(data: CreateAdminDTO): Promise<Admin> {
    const admin = await prisma.admin.create({
      data,
    });

    return admin;
  }

  public async update(id: number, data: UpdateAdminDTO): Promise<Admin> {
    const admin = await prisma.admin.update({
      where: {
        id,
      },
      data,
    });

    return admin;
  }

  public async delete(id: number): Promise<void> {
    await prisma.admin.delete({
      where: {
        id,
      },
    });
  }
}
