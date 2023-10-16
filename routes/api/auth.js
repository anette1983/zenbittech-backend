const express = require("express");
const ctrl = require("../../controllers/auth");

const { validation, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();
router.get("/", ctrl.getAllUsers);
router.post("/register", validation(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", validation(schemas.emailSchema), ctrl.resendVerifyEmail);
router.post("/login", validation(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
