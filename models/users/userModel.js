const db = require("../../config/db");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllUsers };
