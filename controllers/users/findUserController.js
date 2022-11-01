const findModel = require("../../models/users/findUserModel");

const findUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await findModel.getUserId(id);
    if (getData.rowCount == 0) {
      return res.status(404).send("Data not found");
    } else {
      return res.send(getData.rows);
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const findByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const getData = await findModel.getUserEmail(email);
    if (getData.rowCount > 0) {
      return res.send(getData.rows);
    } else {
      return res.status(404).send("Email not found");
    }
  } catch (error) {
    return res.status(400).send("Internal server error");
  }
};

module.exports = { findUserId, findByEmail };
