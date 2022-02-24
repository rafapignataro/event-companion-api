import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post('/authenticate', usersController.authenticate);

export { userRoutes };
