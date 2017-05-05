const User = require("../../models").User;

const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy({ usernameField: "email" }, function(
  email,
  password,
  done
) {
  User.findOne({ email }, function(err, user) {
    if (err) return done(err);
    if (!user || !user.validPassword(password))
      return done(null, false, { message: "Invalid email/password" });
    return done(null, user);
  });
});
