import { Friendship } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/CustomersRepository';
import { FriendshipsRepository } from '../../repositories/FriendshipsRepository';

type CreateFriendshipRequest = {
  customerId: number;
  friendId: number;
  status: 'NOT_ACCEPTED' | 'ACCEPTED' | 'REFUSED';
}

export class CreateFriendshipUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private friendshipsRepository: FriendshipsRepository,
  ) { }

  public async execute({
    customerId,
    friendId,
    status,
  }: CreateFriendshipRequest): Promise<Friendship> {
    if (!customerId || !friendId || !status) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    if (customerId === friendId) {
      throw new APIError({
        code: 500,
        message: 'A friendship must have different participants.',
      });
    }

    if (status !== 'NOT_ACCEPTED' && status !== 'ACCEPTED' && status !== 'REFUSED') {
      throw new APIError({
        code: 500,
        message: 'This status does not exist.',
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

    if (!friendshipRelationExists) {
      const friendship = await this.friendshipsRepository.create({
        status,
        customerId,
        friendId,
      });

      return friendship;
    }

    if (friendshipRelationExists.status === 'REFUSED') {
      await this.friendshipsRepository.delete(friendshipRelationExists.id);

      const friendship = await this.friendshipsRepository.create({
        status,
        customerId,
        friendId,
      });

      return friendship;
    }

    if (friendshipRelationExists.status === 'ACCEPTED') {
      throw new APIError({
        code: 500,
        message: 'You already have a friendship this this person.',
      });
    }

    if (friendshipRelationExists) {
      throw new APIError({
        code: 500,
        message: 'You have already sent a request to this person.',
      });
    }
  }
}
