const express = require("express");
const visitorController = require("../controllers/visitorController");

const visitorRouter = express.Router();

visitorRouter.get("/", visitorController.visitorMonitor);
visitorRouter.get("/total-visits", visitorController.getTotalVisits);
visitorRouter.get("/visitors-count", visitorController.getTotalVisitors);

module.exports = visitorRouter;
