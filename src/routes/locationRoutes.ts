import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { LocationsController } from '../controllers/LocationsController';

const locationsController = new LocationsController();

const locationRoutes = Router();

locationRoutes.use(ensureAuthenticated);

locationRoutes.post('/', locationsController.create);

locationRoutes.put('/:id', locationsController.update);

locationRoutes.delete('/:id', locationsController.delete);

locationRoutes.get('/', locationsController.findAll);

export { locationRoutes };
