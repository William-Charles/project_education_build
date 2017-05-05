const express = require("express");
const router = express.Router();
const { loggedOutOnly } = require("../services/session");

module.exports = passport => {
  router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: "email"
    })
  );

  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/vikings",
      failureRedirect: "/login"
    })
  );

  router.post(
    "/login",
    loggedOutOnly,
    passport.authenticate("local", {
      successRedirect: "/vikings",
      failureRedirect: "/login"
    })
  );
  return router;
};
