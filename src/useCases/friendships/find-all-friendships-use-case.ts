import { Friendship } from '@prisma/client';

import { FriendshipsRepository } from '../../repositories/friendships/FriendshipsRepository';

type FindFriendshipsRequest = {
  customerId: number;
}

export class FindFriendshipsUseCase {
  constructor(
    private friendshipsRepository: FriendshipsRepository,
  ) {}

  public async execute({ customerId }: FindFriendshipsRequest): Promise<Friendship[]> {
    const friendships = await this.friendshipsRepository.findAll({
      customerId,
    });

    return friendships;
  }
}
