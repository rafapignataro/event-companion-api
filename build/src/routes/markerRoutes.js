"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markerRoutes = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const MarkersController_1 = require("../controllers/MarkersController");
const markersController = new MarkersController_1.MarkersController();
const markerRoutes = (0, express_1.Router)();
exports.markerRoutes = markerRoutes;
markerRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
markerRoutes.post('/', markersController.create);
markerRoutes.put('/:id', markersController.update);
markerRoutes.delete('/:id', markersController.delete);
markerRoutes.get('/', markersController.findAll);
