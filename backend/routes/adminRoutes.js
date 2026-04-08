const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();
let users = [
  { id: 1, username: "admin", password: "123", role: "admin" },
  { id: 2, username: "user", password: "123", role: "customer" },
];
router.get("/users", auth, role(["admin"]), (req, res) => {
  res.json(users);
});

router.post("/assign-role", auth, role(["admin"]), (req, res) => {
  const { userId, newRole } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).send("User not found");

  user.role = newRole;

  res.send("Role is now updated");
});

module.exports = router;