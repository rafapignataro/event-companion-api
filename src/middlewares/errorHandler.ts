import { Request, Response, NextFunction } from 'express';

import { APIError } from '../helpers/Error';

export async function errorHandler(
  error: APIError,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return response.status(error.code || 500).json({
    status: 'Error',
    code: error.code,
    message: error.message || 'Unexpected error',
  });
}
