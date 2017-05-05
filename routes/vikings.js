const express = require("express");
const router = express.Router();
const { loggedInOnly, loggedOutOnly } = require("../services/session");

router.get("/", loggedInOnly, function(req, res, next) {
  req.user
    .getAccounts()
    .then(accounts => {
      res.render("home", {
        accounts
      });
    })
    .catch(next);
});

module.exports = router;
