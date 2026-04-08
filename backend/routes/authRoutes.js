const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [
  { id: 1, username: "admin", password: "123", role: "The admin" },
  { id: 2, username: "user", password: "123", role: "The customer" },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).send("The Invalid login");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    "secret",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;