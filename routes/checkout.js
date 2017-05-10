const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Plan = require("../models").Plan;

const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/:id", loggedInOnly, function(req, res) {
  const planId = req.params.id;
  console.log(planId);
  Plan.findById(planId)
    .then(plan => {
      console.log(plan);
      res.render("checkout", { plan });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/plans");
    });
});

module.exports = router;
