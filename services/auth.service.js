const SERVICE_STATUS = require("../constants/status/serviceStatus");
const { generateJwt } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const login = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };

  const { email, password } = credentials;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists || !bcrypt.compareSync(password, userExists.password)) {
      return responseObj;
    }
    const token = await generateJwt({
      id: userExists._id,
    });

    responseObj.status = SERVICE_STATUS.SUCCESSFUL;
    responseObj.data = {
      token: token,
      user: userExists,
    };
  } catch (err) {
    console.log("Something went wrong: Service: authenticate user:", err);
  }
  return responseObj;
};

const getCurrentUser = async (data) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  try {
    const user = await User.findOne(data);
    if (!user) {
      return responseObj;
    }
    responseObj.status = SERVICE_STATUS.SUCCESSFUL;
    responseObj.data = {
      user,
    };
  } catch (err) {
    console.log("Something went wrong: Service: get current user:", err);
  }
  return responseObj;
};

module.exports = {
  login,
  getCurrentUser,
};
