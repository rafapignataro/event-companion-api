import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { BrandsController } from '../controllers/BrandsController';

const brandsController = new BrandsController();

const brandRoutes = Router();

brandRoutes.post('/', brandsController.create);

brandRoutes.use(ensureAuthenticated);

brandRoutes.put('/:id', brandsController.update);

brandRoutes.get('/:id', brandsController.findById);

brandRoutes.get('/', brandsController.findAll);

export { brandRoutes };
