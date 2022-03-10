import { Request, Response } from 'express';

import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';
import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/implementations/prisma/PrismaUsersRepository';

import { AuthenticateUserUseCase } from '../useCases/authentication/authenticate-user-use-case';
import { UpdatePasswordUseCase } from '../useCases/authentication/update-password-use-case';

export class AuthenticationController {
  public async authenticate(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();
    const jwtUserTokenProvider = new JwtUserTokenProvider();
    const bcryptHashProvider = new BCryptHashProvider();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository,
      jwtUserTokenProvider,
      bcryptHashProvider,
    );

    const { email, password } = request.body;

    const { token, user } = await authenticateUserUseCase.execute({ email, password });

    return response.json({ token, user });
  }

  public async updatePassword(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const updatePasswordUseCase = new UpdatePasswordUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );

    const { userId } = request.params;
    const { oldPassword, newPassword, newPasswordRepeated } = request.body;

    await updatePasswordUseCase.execute({
      userId: Number(userId), oldPassword, newPassword, newPasswordRepeated,
    });

    return response.json();
  }

  public async status(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
