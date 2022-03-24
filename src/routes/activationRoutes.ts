import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { ActivationsController } from '../controllers/ActivationsController';

const activationsController = new ActivationsController();

const activationRoutes = Router();

activationRoutes.use(ensureAuthenticated);

activationRoutes.post('/', activationsController.create);

activationRoutes.put('/:id', activationsController.update);

activationRoutes.delete('/:id', activationsController.delete);

activationRoutes.get('/', activationsController.findAll);

export { activationRoutes };
