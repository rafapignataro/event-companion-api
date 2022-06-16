"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorRoutes = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const VisitorsController_1 = require("../controllers/VisitorsController");
const visitorsController = new VisitorsController_1.VisitorsController();
const visitorRoutes = (0, express_1.Router)();
exports.visitorRoutes = visitorRoutes;
visitorRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
visitorRoutes.post('/', visitorsController.create);
visitorRoutes.get('/', visitorsController.findAll);
