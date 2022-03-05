import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { BrandsController } from '../controllers/BrandsController';

const brandsController = new BrandsController();

const brandRoutes = Router();

brandRoutes.use(ensureAuthenticated);

brandRoutes.post('/', brandsController.create);

brandRoutes.put('/:id', brandsController.update);

brandRoutes.get('/:id', brandsController.findById);

brandRoutes.get('/', brandsController.findAll);

export { brandRoutes };
