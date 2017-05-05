const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  facebookId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.statics.findOrCreateFacebook = function(profile) {
  return User.findOne({
    facebookId: profile.id
  }).then(user => {
    if (user) {
      return user;
    } else {
      return new User({
        displayName: profile.displayName,
        facebookId: profile.id,
        email: profile.emails[0].value
      }).save();
    }
  });
};

UserSchema.methods.getAccounts = async function() {
  let accounts = [];
  accounts.push({
    name: "Facebook",
    authorized: this.facebookId
  });
  return accounts;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
