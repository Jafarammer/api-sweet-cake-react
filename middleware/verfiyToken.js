const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    const decoded = jwt.verify(
      token?.substring(7, token?.length),
      process.env.JWT_SECRET_KEY
    );
    if (decoded) {
      next();
    }
  } catch (error) {
    res.send({ error: "Token invalid!!!" });
  }
};

module.exports = { checkToken };
