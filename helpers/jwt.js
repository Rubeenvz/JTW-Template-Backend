const jwt = require("jsonwebtoken");

const generateJwt = (data) => {
  return new Promise((resolve, reject) => {
    const payload = {
      ...data,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt,
};
