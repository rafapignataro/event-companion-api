import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post('/authenticate', usersController.authenticate);

userRoutes.use(ensureAuthenticated);

userRoutes.post('/', usersController.createUser);

userRoutes.put('/:id/password', usersController.updateUserPassword);

userRoutes.put('/:id', usersController.updateUser);

userRoutes.get('/:id', usersController.findUserById);

userRoutes.get('/', usersController.findAllUsers);

export { userRoutes };
