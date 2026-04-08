const express = require("express");
const fs = require("fs");
const path = require("path");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

const filePath = path.join(__dirname, "../models/reductions.json");
let reductions = require("../models/reductions.json");

router.post("/", auth, role(["customer"]), (req, res) => {
  const newReduction = {
    reductionId: reductions.length + 1,
    policyId: req.body.thePolicyId,
    requestedBy: req.user.theUserId,
    currentCoverage: req.body.theCurrentCoverage,
    requestedCoverage: req.body.theRequestedCoverage,
    reason: req.body.theReason,
    status: "pending",
  };

  reductions.push(newReduction);
  fs.writeFileSync(filePath, JSON.stringify(reductions, null, 2));

  res.send("Reduction request submitted");
});

router.get("/my", auth, role(["customer"]), (req, res) => {
  const myReductions = reductions.filter(
    (r) => r.requestedBy === req.user.userId
  );
  res.json(myReductions);
});

router.put("/:id", auth, role(["admin", "underwriter"]), (req, res) => {
  const reduction = reductions.find((r) => r.reductionId == req.params.id);

  if (!reduction) return res.status(404).send("Not found");

  reduction.status = req.body.theStatus;
  reduction.reviewComment = req.body.theComment;

  fs.writeFileSync(filePath, JSON.stringify(reductions, null, 2));

  res.send("Reduction reviewed");
});

module.exports = router;