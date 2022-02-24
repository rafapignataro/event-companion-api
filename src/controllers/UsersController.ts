import { Request, Response } from 'express';

import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';
import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';

import { AuthenticateUserUseCase } from '../useCases/users/authenticate-user-use-case';
import { CreateUserUseCase } from '../useCases/users/create-user-use-case';
import { UpdateUserUseCase } from '../useCases/users/update-user-use-case';
import { FindAllUsersUseCase } from '../useCases/users/find-all-users-use-case';
import { FindUserByIdUseCase } from '../useCases/users/find-user-by-id-use-case';
import { UpdateUserPasswordUseCase } from '../useCases/users/update-user-password-use-case';

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

  public async createUser(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const createUserUseCase = new CreateUserUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );

    const { email, name, password } = request.body;

    const user = await createUserUseCase.execute({ email, name, password });

    return response.json(user);
  }

  public async updateUser(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();

    const updateUserUseCase = new UpdateUserUseCase(
      prismaUsersRepository,
    );

    const { id } = request.params;
    const { email, name } = request.body;

    await updateUserUseCase.execute({ id: Number(id), email, name });

    return response.json();
  }

  public async updateUserPassword(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const updateUserUseCase = new UpdateUserPasswordUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );

    const { id } = request.params;
    const { oldPassword, newPassword, newPasswordRepeated } = request.body;

    await updateUserUseCase.execute({
      id: Number(id), oldPassword, newPassword, newPasswordRepeated,
    });

    return response.json();
  }

  public async findUserById(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();

    const findUserByIdUseCase = new FindUserByIdUseCase(
      prismaUsersRepository,
    );

    const { id } = request.params;

    const user = await findUserByIdUseCase.execute({ id: Number(id) });

    return response.json(user);
  }

  public async findAllUsers(request: Request, response: Response): Promise<Response> {
    const prismaUsersRepository = new PrismaUsersRepository();

    const findAllUsersUseCase = new FindAllUsersUseCase(
      prismaUsersRepository,
    );

    const users = await findAllUsersUseCase.execute();

    return response.json(users);
  }
}
