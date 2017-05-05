const express = require("express");
const router = express.Router();

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
  return router;
};
