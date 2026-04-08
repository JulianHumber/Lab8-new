const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("token");

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid now token");
  }
}

module.exports = auth;