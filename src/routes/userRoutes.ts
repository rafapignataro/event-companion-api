import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post('/authenticate', usersController.authenticate);

userRoutes.use(ensureAuthenticated);

userRoutes.post('/', usersController.create);

userRoutes.put('/:id/password', usersController.updatePassword);

userRoutes.put('/:id', usersController.update);

userRoutes.get('/:id', usersController.findById);

userRoutes.get('/', usersController.findAll);

export { userRoutes };
