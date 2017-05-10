const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Plan = require("../models").Plan;

const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/:id", loggedInOnly, function(req, res) {
  const planId = res.params.id;
  Plan.find({ planId: planId })
    .then(plan => {
      res.render("checkout", plan);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/plans");
    });
});

module.exports = router;
