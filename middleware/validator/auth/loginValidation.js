const User = require("../../../models/users/findUserModel");
const { check, validationResult } = require("express-validator");

const loginValidation = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is missing!")
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
  (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
      return res.send({ error: error[0].msg });
    }
    next();
  },
  //     .isLength({ min: 8 })
  //     .withMessage("Minimum password 8")
  //     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
  //     .withMessage(
  //       "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
  //     ),
];

module.exports = loginValidation;
