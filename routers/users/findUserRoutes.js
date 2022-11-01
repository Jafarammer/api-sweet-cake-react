const Router = require("express").Router();
const {
  findByEmail,
  findUserId,
} = require("../../controllers/users/findUserController");

Router.get("/users/id/:id", findUserId);
Router.get("/users/email", findByEmail);

module.exports = Router;
