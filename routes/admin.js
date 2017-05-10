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
      res.render("newPlan", { features });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

router.post("/newPlan", loggedInOnly, function(req, res, next) {
  const features = req.body;
  let feat_builder = {};
  feat_builder.features = [];
  console.log(features);

  for (let key in features) {
    if (key === "name") {
      feat_builder.name = features[key];
    } else if (key === "price") {
      feat_builder.price = features[key];
    } else if (features[key] === "0") {
      feat_builder.features.push({ featureName: key, included: "unchecked" });
    } else {
      feat_builder.features.push({ featureName: key, included: "check" });
    }
  }

  const plan = new Plan(feat_builder);
  plan
    .save()
    .then(feature => {
      res.redirect("/showPlans");
    })
    .catch(next);
});

router.get("/showFeatures", loggedInOnly, function(req, res) {
  Feature.find({})
    .then(features => {
      res.render("showFeatures", { features });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

module.exports = router;
