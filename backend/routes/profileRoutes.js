const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();
let users = [
  {
    id: 1,
    username: "admin",
    password: "123",
    role: "admin",
    firstName: "Admin",
    lastName: "User",
    email: "theadmin@test.com",
    phone: "123456789",
    city: "Toronto",
    country: "Canada",
  },
  {
    id: 2,
    username: "user",
    password: "123",
    role: "customer",
    firstName: "Jake",
    lastName: "Rose",
    email: "theuser@test.com",
    phone: "987654321",
    city: "Toronto",
    country: "Canada",
  },
];

router.get("/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
  res.json(user);
});

router.put("/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);

  if (!user) return res.status(404).send("The User is not found");

  const { firstName, lastName, email, phone, city, country } = req.body;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (city) user.city = city;
  if (country) user.country = country;

  res.send("Profile is now updated");
});

router.get("/all", auth, role(["admin"]), (req, res) => {
  res.json(users);
});

router.get("/:id", auth, role(["admin"]), (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  
  if (!user) return res.status(404).send("The User is not found");

  res.json(user);
});

module.exports = router;