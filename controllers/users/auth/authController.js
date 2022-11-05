const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const model = require("../../../models/users/userModel");
const findModel = require("../../../models/users/findUserModel");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;
    const searchEmail = await findModel.getUserEmail(email);
    const getEmail = searchEmail.rows;

    // encrypt password
    const saltPass = bcrypt.genSaltSync(15);
    const hashPass = bcrypt.hashSync(password, saltPass);
    if (getEmail.length != 0) {
      return res.send({ error: "Email already exists!!!" });
    } else {
      const getData = await model.addUser({
        name,
        email,
        phoneNumber,
        password: hashPass,
      });
      if (getData) {
        return res.send({ message: "Register Successfully" });
      } else {
        return res.send("Registration failed!");
      }
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const searchEmail = await findModel.getUserEmail(email);
    if (searchEmail?.rowCount) {
      const checkPassword = bcrypt.compareSync(
        password,
        searchEmail?.rows[0]?.password
      );
      if (checkPassword) {
        const token = jwt.sign(
          searchEmail?.rows[0],
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "30m",
          }
        );
        return res.status(200).send({
          user: { ...searchEmail?.rows[0], ...{ password: null } },
          token,
          message: "Login success",
        });
      } else {
        return res.status(400).send({ error: "Password wrong" });
      }
    } else {
      return res.status(400).send({
        error: "User not found, please enter a valid email!!!",
      });
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

module.exports = { register, login };
