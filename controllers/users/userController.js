const model = require("../../models/users/userModel");

const findAllUsers = async (req, res) => {
  try {
    const getData = await model.getAllUsers();
    res.send({ data: getData.rows, totalData: getData.rowCount });
  } catch (error) {
    res.status(500).send("Internal server error!!!");
  }
};

module.exports = { findAllUsers };
