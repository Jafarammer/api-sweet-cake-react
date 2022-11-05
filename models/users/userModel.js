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

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users(name,email,phone_number,password,photo_profile) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        props.name,
        props.email,
        props.phoneNumber,
        props.password,
        props.photoProfile,
      ],
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

const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4, photo_profile = $5 WHERE id = $6",
      [
        props.name,
        props.email,
        props.phoneNumber,
        props.password,
        props.photoProfile,
        props.id,
      ],
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

module.exports = { getAllUsers, addUser, editUser };
