import { Request, Response, NextFunction } from 'express';

import { APIError } from '../helpers/Error';

import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';

import { EnsureUserAuthenticatedUseCase } from '../useCases/users/ensure-user-authenticated-user-case';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const jwtUserTokenProvider = new JwtUserTokenProvider();
  const ensureUserAuthenticatedUseCase = new EnsureUserAuthenticatedUseCase(
    jwtUserTokenProvider,
  );

  const bearerToken = request.headers.authorization;

  if (!bearerToken) {
    throw new APIError({
      code: 401,
      message: 'Not authenticated.',
    });
  }

  const [, token] = bearerToken.split(' ');

  await ensureUserAuthenticatedUseCase.execute({ token });

  return next();
}
