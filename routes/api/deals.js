const express = require("express");

const ctrl = require("../../controllers/deals");

const router = express.Router();
const { validation } = require("../../middlewares");
const { addSchema } = require("../../models/deal");

router.get("/", ctrl.getAllDeals);
router.post("/", validation(addSchema), ctrl.addDeal);

module.exports = router;
