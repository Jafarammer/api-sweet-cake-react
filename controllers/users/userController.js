const bcrypt = require("bcrypt");
const model = require("../../models/users/userModel");
const findModel = require("../../models/users/findUserModel");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUsers();
    return res.send(getData.rows);
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      photoProfile,
    } = req.body;
    const searchEmail = await findModel.getUserEmail(email);
    const getEmail = searchEmail.rows;

    // encrypt password
    const saltPass = bcrypt.genSaltSync(15);
    const hashPass = bcrypt.hashSync(password, saltPass);

    if (getEmail.length != 0) {
      return res.status(400).send("Email already exist!!!");
    } else {
      const getData = await model.addUser({
        name,
        email,
        phoneNumber,
        password: hashPass,
        photoProfile,
      });
      if (getData) {
        return res.status(200).send("Create user successfully");
      } else {
        return res.status(400).send("Failed to create user");
      }
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

module.exports = { getUsers, createUser };
