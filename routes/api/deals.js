const express = require("express");

const ctrl = require("../../controllers/deals");

const router = express.Router();
// const { validation, isValidId, authenticate } = require("../../middlewares");
// const { schemas } = require("../../models/deal");

// const { deals: ctrl } = require("../../controllers");

router.get("/", ctrl.getAllDeals);
// router.get("/:id",  isValidId, ctrl.getById);

module.exports = router;
