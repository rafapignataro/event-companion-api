import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';

import { APIError } from './helpers/Error';

import { routes } from './routes';

const server = express();

server.use(express.json());

server.use(routes);

server.use((error: APIError, _: Request, response: Response, next: NextFunction) => {
  return response.status(error.code).json({
    status: 'Error',
    code: error.code,
    message: error.message || 'Unexpected error',
  });
});

server.listen(process.env.PORT || 3000);
