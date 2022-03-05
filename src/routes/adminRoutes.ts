import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { AdminsController } from '../controllers/AdminsController';

const adminsController = new AdminsController();

const adminRoutes = Router();

adminRoutes.use(ensureAuthenticated);

adminRoutes.post('/', adminsController.create);

adminRoutes.put('/:id', adminsController.update);

adminRoutes.get('/:id', adminsController.findById);

adminRoutes.get('/', adminsController.findAll);

export { adminRoutes };
