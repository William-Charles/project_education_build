const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Plan = require("../models").Plan;
const Feature = require("../models").Feature;

const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/newPlans", loggedInOnly, function(req, res) {
  res.render("newPlans");
});
router.get("/addFeature", loggedInOnly, function(req, res) {
  res.render("addFeature");
});

router.post("/addFeature", loggedInOnly, function(req, res, next) {
  const { name, desc } = req.body;
  console.log(name);
  const feature = new Feature({
    name: name,
    desc: desc
  });
  feature
    .save()
    .then(feature => {
      res.redirect("showFeatures");
    })
    .catch(next);
});

router.get("/newPlan", loggedInOnly, function(req, res) {
  Feature.find({})
    .then(features => {
      console.log(features);
      res.render("newPlan", { features });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

router.post("/newPlan", loggedInOnly, function(req, res, next) {
  const features = req.body;
  console.log("these are the selected features");
  console.log(features);
});

router.get("/showFeatures", loggedInOnly, function(req, res) {
  Feature.find({})
    .then(features => {
      console.log(features);
      res.render("showFeatures", { features });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

module.exports = router;
