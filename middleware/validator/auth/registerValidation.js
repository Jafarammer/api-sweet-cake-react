const { check, validationResult } = require("express-validator");

const registerValidation = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is missing!")
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid"),
  check("phone_number")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is missing!")
    .isLength({ min: 12, max: 13 })
    .withMessage("Phone number not valid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8 })
    .withMessage("Minimum password 8")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password should not be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match with password");
      }
      return true;
    }),
  (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
      return res.send({ error: error[0].msg });
    }
    next();
  },
];

module.exports = registerValidation;
