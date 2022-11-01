const Router = require("express").Router();
const controller = require("../../../controllers/users/auth/authController");
// validation
const registerValidate = require("../../../middleware/validator/auth/registerValidation");
const loginValidate = require("../../../middleware/validator/auth/loginValidation");

Router.post("/register", registerValidate, controller.register);
Router.post("/login", loginValidate, controller.login);

module.exports = Router;
