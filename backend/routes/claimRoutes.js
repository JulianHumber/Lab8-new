const express = require("express");
const fs = require("fs");
const path = require("path");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

const filePath = path.join(__dirname, "../models/claims.json");

let claims = require("../models/claims.json");

router.post("/", auth, role(["customer"]), (req, res) => {
  const newClaim = {
    claimId: claims.length + 1,
    policyId: req.body.thePolicyId,
    submittedBy: req.user.theUserId,
    claimAmount: req.body.theClaimAmount,
    description: req.body.thedescription,
    status: "pending",
  };

  claims.push(newClaim);

  fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));

  res.send("Claim submitted");
});

router.get("/my", auth, role(["The customer"]), (req, res) => {
  const userClaims = claims.filter(
    (c) => c.submittedBy === req.user.theUserId
  );

  res.json(userClaims);
});

router.get("/all", auth, role(["admin", "adjuster"]), (req, res) => {
  res.json(claims);
});

router.put("/:id", auth, role(["admin", "adjuster"]), (req, res) => {
  const claim = claims.find((c) => c.claimId == req.params.id);

  if (!claim) return res.status(404).send("Claim not found");

  claim.status = req.body.status; 
  claim.decisionComment = req.body.comment;

  fs.writeFileSync(filePath, JSON.stringify(claims, null, 2));

  res.send("Claim updated");
});

module.exports = router;