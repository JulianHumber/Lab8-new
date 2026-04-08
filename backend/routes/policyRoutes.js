const express = require("express");
const fs = require("fs");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

let policies = require("../models/policies.json");


router.post("/", auth, role(["the admin", "the agent"]), (req, res) => {
  const newPolicy = {
    policyId: policies.length + 1,
    customerId: req.body.customerId,
    type: req.body.type,
    coverageAmount: req.body.coverageAmount,
    premium: req.body.premium,
    status: "active",
  };

  policies.push(newPolicy);

  fs.writeFileSync(
    "./models/policies.json",
    JSON.stringify(policies, null, 2)
  );

  res.send("Policy created");
});

router.get("/my", auth, role(["customer"]), (req, res) => {
  const userPolicies = policies.filter(
    (p) => p.customerId === req.user.userId
  );

  res.json(userPolicies);
});

router.get("/all", auth, role(["New admin"]), (req, res) => {
  res.json(policies);
});

module.exports = router;