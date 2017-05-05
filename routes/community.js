const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");
const User = require("../models").User;

router.get("/", loggedInOnly, function(req, res, next) {
  User.find()
    .then(users => {
      let pullRankings = pullKings(users.slice());
      let pushRankings = pushKings(users.slice());
      let runRankings = runKings(users.slice());
      res.render("community", { pullRankings, pushRankings, runRankings });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/vikings");
    });
});

module.exports = router;

function pullKings(users) {
  users.sort(function(userA, userB) {
    return userB.bestPull - userA.bestPull;
  });
  return users;
}
function pushKings(users) {
  users.sort(function(userA, userB) {
    return userB.bestPush - userA.bestPush;
  });
  return users;
}
function runKings(users) {
  users.sort(function(userA, userB) {
    return (
      userA.bestMin + userA.bestSec / 60 - (userB.bestMin + userB.bestSec / 60)
    );
  });

  return users.map(user => {
    if (user.bestMin === 99999) {
      user.bestMin = 0;
    }
    return user;
  });
}
