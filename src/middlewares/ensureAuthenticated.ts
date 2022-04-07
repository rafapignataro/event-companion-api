import { Request, Response, NextFunction } from 'express';

import { APIError } from '../helpers/Error';

import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';

import { EnsureAuthenticatedUseCase } from '../useCases/authentication/ensure-authenticated-user-case';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const jwtUserTokenProvider = new JwtUserTokenProvider();
  const ensureAuthenticatedUseCase = new EnsureAuthenticatedUseCase(
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

  await ensureAuthenticatedUseCase.execute({ token });

  const payload = jwtUserTokenProvider.decode(token);

  request.user = {
    id: payload.id,
    email: payload.email,
    name: payload.name,
    role: payload.name,
  };

  return next();
}
