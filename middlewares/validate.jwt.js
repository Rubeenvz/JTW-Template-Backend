const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJwt = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  const token = bearerToken;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await User.findOne({ _id: id });
    if (!userExists) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
    req.user = userExists;
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

module.exports = {
  validateJwt,
};
