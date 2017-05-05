const passport = require("passport");
const User = require("../../models").User;

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(require("./Facebook"));
  passport.use(require("./Local"));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  });
  return passport;
};
