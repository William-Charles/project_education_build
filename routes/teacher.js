const express = require("express");
const router = express.Router();
var AWS = require("aws-sdk");
const User = require("../models").User;
const Plan = require("../models").Plan;
const Course = require("../models").Course;
const { updateUserInfo, createChallenge } = require("../routeHelper/index");

const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/login", loggedOutOnly, function(req, res) {
  res.render("spark/login");
});

router.get("/profile", loggedInOnly, function(req, res, next) {
  User.findById(req.user.id)
    .then(user => {
      res.render("teacher/profile", { user });
    })
    .catch(next);
});

router.get("/dashboard", loggedInOnly, function(req, res, next) {
  Course.find({})
    .then(courses => {
      res.render("teacher/dashboard", { courses });
    })
    .catch(next);
});

router.get("/login", loggedOutOnly, function(req, res) {
  res.render("spark/login");
});

router.get("/register", loggedOutOnly, function(req, res) {
  res.render("spark/register");
});

router.get("/addCourse", loggedInOnly, function(req, res) {
  res.render("teacher/addCourse");
});

router.post("/addCourse", loggedInOnly, (req, res, next) => {
  const course = new Course(req.body);
  course
    .save()
    .then(course => {
      res.render("teacher/addChallenge", { course });
    })
    .catch(next);
});

router.get("/editCourse/:id", loggedInOnly, function(req, res, next) {
  Course.findById(req.params.id)
    .then(course => {
      res.render("teacher/editCourse", { course });
    })
    .catch(next);
});

router.get("/addChallenge/:id", loggedInOnly, function(req, res, next) {
  Course.findById(req.params.id)
    .then(course => {
      res.render("teacher/addChallenge", { course });
    })
    .catch(next);
});

router.post("/addChallenge/:id", loggedInOnly, (req, res, next) => {
  const challengeObj = createChallenge(req.body);
  Course.findByIdAndUpdate(req.params.id, {
    $push: { challenges: challengeObj }
  })
    .then(course => {
      res.redirect(`/teacher/editCourse/${course._id}`);
    })
    .catch(next);
});

router.get("/editUser", loggedInOnly, function(req, res) {
  res.render("teacher/editUser");
});

router.post("/editUser", loggedInOnly, (req, res, next) => {
  const userUpdate = updateUserInfo(req.body);
  User.findByIdAndUpdate(req.user.id, userUpdate)
    .then(user => {
      res.redirect("/teacher/profile");
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
