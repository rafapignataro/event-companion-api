import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { AuthenticationController } from '../controllers/AuthenticationController';

const authenticationController = new AuthenticationController();

const authenticationRoutes = Router();

authenticationRoutes.post('/authenticate', authenticationController.authenticate);

authenticationRoutes.use(ensureAuthenticated);

authenticationRoutes.put('/password/:userId', authenticationController.updatePassword);

export { authenticationRoutes };
