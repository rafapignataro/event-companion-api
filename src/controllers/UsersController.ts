import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from '../useCases/users/authenticate-user-use-case';

import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';
import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';
import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';

export class UsersController {
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
}
