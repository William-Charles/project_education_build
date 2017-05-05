const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");
const User = require("../models").User;

router.get("/", loggedInOnly, function(req, res, next) {
  const user = req.user;
  req.user
    .getAccounts()
    .then(accounts => {
      console.log("accounts", accounts);
      res.render("home", { accounts, user });
    })
    .catch(next);
});

router.get("/workout", loggedInOnly, function(req, res) {
  res.render("workout");
});

router.post("/workout", loggedInOnly, function(req, res) {
  const { push, pull, mile } = req.body;
  res.redirect("/vikings");
});

module.exports = router;
