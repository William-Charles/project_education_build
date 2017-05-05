const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");
const { pullKings, pushKings, runKings } = require("../routeHelper/index");
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
