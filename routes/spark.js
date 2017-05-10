const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Plan = require("../models").Plan;
const { updateStudent } = require("../routeHelper/index");

const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/", loggedOutOnly, function(req, res) {
  res.render("spark/login");
});

router.get("/login", loggedOutOnly, function(req, res) {
  res.render("spark/login");
});

router.get("/register", loggedOutOnly, function(req, res) {
  res.render("spark/register");
});

router.get("/editUser", loggedInOnly, function(req, res) {
  res.render("spark/editUser");
});

router.post("/editUser", loggedInOnly, (req, res, next) => {
  const userUpdate = updateStudent(req.body);
  const user = new User({
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

router.get("/showPlans", loggedInOnly, (req, res) => {
  Plan.find({})
    .then(plans => {
      res.render("showPlans", { plans });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

router.get("/plans", loggedInOnly, (req, res) => {
  res.render("plans");
});

router.get("/logout", loggedInOnly, (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
