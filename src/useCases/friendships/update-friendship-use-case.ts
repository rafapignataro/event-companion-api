import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';
import { FriendshipsRepository } from '../../repositories/friendships/FriendshipsRepository';

type UpdateFriendshipRequest = {
  customerId: number;
  friendId: number;
  status: 'NOT_ACCEPTED' | 'ACCEPTED' | 'REFUSED';
}

export class UpdateFriendshipUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private friendshipsRepository: FriendshipsRepository,
  ) {}

  public async execute({
    customerId,
    friendId,
    status,
  }: UpdateFriendshipRequest): Promise<void> {
    if (!customerId || !friendId || !status) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
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
      throw new APIError({
        code: 500,
        message: 'This friendship relation does not exist.',
      });
    }

    await this.friendshipsRepository.update(friendshipRelationExists.id, {
      status,
    });
  }
}
