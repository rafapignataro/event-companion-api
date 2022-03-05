import { Request, Response } from 'express';

import { PrismaFriendshipsRepository } from '../repositories/implementations/prisma/PrismaFriendshipsRepository';
import { PrismaCustomersRepository } from '../repositories/implementations/prisma/PrismaCustomersRepository';

import { CreateFriendshipUseCase } from '../useCases/friendships/create-friendship-use-case';
import { UpdateFriendshipUseCase } from '../useCases/friendships/update-friendship-use-case';
import { FindFriendshipsUseCase } from '../useCases/friendships/find-all-friendships-use-case';

export class FriendshipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const prismaFriendshipsRepository = new PrismaFriendshipsRepository();

    const createFriendshipUseCase = new CreateFriendshipUseCase(
      prismaCustomersRepository,
      prismaFriendshipsRepository,
    );

    const { customerId, friendId, status } = request.body;

    const friendship = await createFriendshipUseCase.execute({ customerId, friendId, status });

    return response.json(friendship);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const prismaFriendshipsRepository = new PrismaFriendshipsRepository();

    const updateFriendshipUseCase = new UpdateFriendshipUseCase(
      prismaCustomersRepository,
      prismaFriendshipsRepository,
    );

    const { customerId, friendId, status } = request.body;

    await updateFriendshipUseCase.execute({ customerId, friendId, status });

    return response.json();
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaFriendshipsRepository = new PrismaFriendshipsRepository();

    const findFriendshipsUseCase = new FindFriendshipsUseCase(
      prismaFriendshipsRepository,
    );

    const { customerId } = request.query;

    const users = await findFriendshipsUseCase.execute({
      customerId: customerId ? Number(customerId) : undefined,
    });

    return response.json(users);
  }
}
