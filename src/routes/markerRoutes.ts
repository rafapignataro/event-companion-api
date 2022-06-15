import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { MarkersController } from '../controllers/MarkersController';

const markersController = new MarkersController();

const markerRoutes = Router();

markerRoutes.use(ensureAuthenticated);

markerRoutes.post('/', markersController.create);

markerRoutes.put('/:id', markersController.update);

markerRoutes.delete('/:id', markersController.delete);

markerRoutes.get('/', markersController.findAll);

export { markerRoutes };
