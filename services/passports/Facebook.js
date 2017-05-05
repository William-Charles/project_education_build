const User = require("../../models").User;

const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ||
      "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "displayName", "emails"],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findOrCreateFacebook(profile)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  }
);
