const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/", loggedOutOnly, function(req, res) {
  res.redirect("/vikings");
});

router.get("/login", loggedOutOnly, function(req, res) {
  res.render("login");
});

router.get("/register", loggedOutOnly, function(req, res) {
  res.render("register");
});

router.use("/logout", loggedInOnly, function(req, res) {
  res.redirect("/login");
});

module.exports = router;
