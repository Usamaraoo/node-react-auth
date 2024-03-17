const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const jwt = require("jsonwebtoken");

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
