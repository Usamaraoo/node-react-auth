const jwt = require("jsonwebtoken");
require("dotenv/config");

function createJwt(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2m" });
}

module.exports = createJwt;
