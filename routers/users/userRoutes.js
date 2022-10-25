const Router = require("express").Router();
const controller = require("../../controllers/users/userController");

// Find all
Router.get("/users", controller.findAllUsers);

module.exports = Router;
