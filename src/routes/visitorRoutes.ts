import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { VisitorsController } from '../controllers/VisitorsController';

const visitorsController = new VisitorsController();

const visitorRoutes = Router();

visitorRoutes.use(ensureAuthenticated);

visitorRoutes.post('/', visitorsController.create);

visitorRoutes.get('/', visitorsController.findAll);

export { visitorRoutes };
