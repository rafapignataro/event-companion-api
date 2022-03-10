import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler';

import { routes } from './routes';

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

server.use(errorHandler);

server.listen(process.env.PORT || 3000);
