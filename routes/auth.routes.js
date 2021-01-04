const { validateJwt } = require("../middlewares/validate.jwt");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/login", controller.login);

router.get("/me", validateJwt, controller.getCurrentUser);

module.exports = router;
