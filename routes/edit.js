const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");
const User = require("../models").User;
const bcrypt = require("bcrypt");

router.get("/", loggedInOnly, function(req, res) {
  res.render("edit");
});

router.post("/", loggedInOnly, (req, res) => {
  const updateObject = buildUpdateObject(req.body, req.user);

  User.findByIdAndUpdate(req.user._id, updateObject)
    .then(user => {
      res.redirect("/vikings");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/vikings");
    });
});

module.exports = router;

function buildUpdateObject(body, user) {
  let obj = {
    $set: {
      fname: body.fname || user.fname,
      lname: body.lname || user.lname,
      picture: body.picture || user.picture,
      email: body.email || user.email
    }
  };
  if (body.password) {
    obj.$set.passwordHash = bcrypt.hashSync(body.password, 8);
  }
  console.log(obj);
  return obj;
}
