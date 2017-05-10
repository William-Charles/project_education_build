const express = require("express");
const router = express.Router();
const User = require("../models").User;
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

router.post("/register", loggedOutOnly, (req, res, next) => {
  const { fname, lname, picture, email, password, userType } = req.body;
  const user = new User({
    userType: userType,
    fname: fname,
    lname: lname,
    email: email,
    password: password
  });
  user
    .save()
    .then(user => {
      req.login(user, err => {
        if (err) throw err;
        res.redirect("/plans");
      });
    })
    .catch(next);
});

router.get("/plans", loggedInOnly, (req, res) => {
  res.render("plans");
});

router.get("/logout", loggedInOnly, (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
