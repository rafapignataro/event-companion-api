import { Friendship } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';
import { FriendshipsRepository } from '../../repositories/friendships/FriendshipsRepository';

type CreateFriendshipRequest = {
  customerId: number;
  friendId: number;
  status: string;
}

export class CreateFriendshipUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private friendshipsRepository: FriendshipsRepository,
  ) {}

  public async execute({
    status,
    customerId,
    friendId,
  }: CreateFriendshipRequest): Promise<Friendship> {
    if (customerId === friendId) {
      throw new APIError({
        code: 500,
        message: 'A friendship must have different participants.',
      });
    }
    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists) {
      throw new APIError({
        code: 500,
        message: 'This customer does not exist.',
      });
    }

    const friendExists = await this.customersRepository.findById(friendId);

    if (!friendExists) {
      throw new APIError({
        code: 500,
        message: 'This friend does not exist.',
      });
    }

    const friendshipRelationExists = await this.friendshipsRepository.findRelation(
      customerId,
      friendId,
    );

    if (friendshipRelationExists) {
      throw new APIError({
        code: 500,
        message: 'This friendship relation already exists.',
      });
    }

    const friendship = await this.friendshipsRepository.create({
      status,
      customerId,
      friendId,
    });

    return friendship;
  }
}
