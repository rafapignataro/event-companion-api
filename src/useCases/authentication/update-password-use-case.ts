import { User } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { HashProvider } from '../../providers/hashProvider/HashProvider';
import { UsersRepository } from '../../repositories/users/UsersRepository';

type UpdatePasswordRequest = {
  userId: number;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeated: string;
}

export class UpdatePasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    userId, oldPassword, newPassword, newPasswordRepeated,
  }: UpdatePasswordRequest): Promise<void> {
    if (!userId || !oldPassword || !newPassword || !newPasswordRepeated) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    const isPasswordCorrect = await this.hashProvider.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      throw new APIError({
        code: 500,
        message: 'The old password is not correct.',
      });
    }

    if (newPassword !== newPasswordRepeated) {
      throw new APIError({
        code: 500,
        message: 'The new passwords are not equal.',
      });
    }

    if (newPassword.length < 6) {
      throw new APIError({
        code: 500,
        message: 'The password must have more than 6 letters.',
      });
    }

    const passwordHash = await this.hashProvider.create(newPassword);

    await this.usersRepository.updatePassword(userId, {
      password: passwordHash,
    });
  }
}
