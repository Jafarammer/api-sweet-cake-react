const db = require("../../config/db");

const getUserId = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = { getUserId, getUserEmail };
