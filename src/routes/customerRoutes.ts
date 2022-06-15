import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CustomersController } from '../controllers/CustomersController';

const customersController = new CustomersController();

const customerRoutes = Router();

customerRoutes.post('/', customersController.create);

customerRoutes.use(ensureAuthenticated);

customerRoutes.put('/:id', customersController.update);

customerRoutes.get('/search', customersController.search);

customerRoutes.get('/:id', customersController.findById);

customerRoutes.get('/', customersController.findAll);


export { customerRoutes };
