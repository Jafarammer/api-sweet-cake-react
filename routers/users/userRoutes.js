const Router = require("express").Router();
const controller = require("../../controllers/users/userController");
// validation
const registerValidate = require("../../middleware/validator/auth/registerValidation");
const validateToken = require("../../middleware/verfiyToken");

// Find all
Router.get("/users", validateToken.checkToken, controller.getUsers);
// Create user
Router.post(
  "/users/add",
  registerValidate,
  validateToken.checkToken,
  controller.createUser
);

module.exports = Router;
