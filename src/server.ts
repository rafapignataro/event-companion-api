import 'express-async-errors';

import express from 'express';

import { errorHandler } from './middlewares/errorHandler';

import { routes } from './routes';

const server = express();

server.use(express.json());

server.use(routes);

server.use(errorHandler);

server.listen(process.env.PORT || 3000);
